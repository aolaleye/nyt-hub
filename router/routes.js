//dependencies
var db = require("../models"); // require all the models files
var express = require("express"); // require the express module
var request = require("request");
var cheerio = require("cheerio");

var router = express.Router();

//route to the homepage
router.get("/", function(req, res) {

  db.Article.find({})
    .then(function(data) {
      res.render("index", {
        results: data
      });
    })
    .catch(function(err) {
      res.json(err);
    });

});

//route for scraping new articles
router.get("/scrape", function(req, res) {
  request("http://www.nytimes.com", function(error, response, html) {
    // Load the HTML into cheerio and save it to a variable
    // '$' becomes a shorthand for cheerio's selector commands, much like jQuery's '$'
    var $ = cheerio.load(html);

    // Select each element in the HTML body from which you want information.
    // NOTE: Cheerio selectors function similarly to jQuery's selectors,
    // but be sure to visit the package's npm page to see how it works
    $("div.collection article").each(function(i, element) {

        var result = {};

        result.title = $(element).find("h2.story-heading").text();
        result.byline = $(element).find("p.byline").text();
        result.date = $(element).find("p.byline time").attr("datetime");
        result.summary = $(element).find("p.summary").text();
        result.link = $(element).find("h2.story-heading").children().attr("href");

      // Create a new Article using the `result` object built from scraping
      db.Article.create(result)
        .then(function(dbArticle) {
          // View the added result in the console
          console.log(dbArticle);
        })
        .catch(function(err) {
          // If an error occurred, send it to the client
          return res.json(err);
        });
    });
    // If we were able to successfully scrape and save an Article, send a message to the client
    // res.send("Scrape Complete");
  });
  res.redirect("/");
});

//route to delete a note
router.post("/note/:id", function(req, res) {
  db.Note.findByIdAndRemove(req.params.id, function(data) {
    console.log("Deleted document: " + data);
    res.redirect("/saved");
  });
});

////route for grabbing a specific article and populating a note
router.get("/article/:id", function(req, res) {
  db.Article.findOne({
    _id: req.params.id
  })
    .populate("note")
    .then(function(result) {
      res.json(result);
    })
    .catch(function(err) {
      res.json(err);
    });
});

//route to save a new note
router.post("/article/:id", function(req, res) {
  db.Note.create(req.body)
    .then(function(result) {
      return db.Article.findOneAndUpdate(
        {
          _id: req.params.id
        },
        {
          note: result._id
        },
        {
          new: true
        }
      );
    })
    .then(function(result2) {
      res.json(result2);
    })
    .catch(function(err) {
      res.json(err);
    });
});

//route to the saved articles page
router.get("/saved", function(req, res) {
  db.Article.find({
    isSaved: true
  })
    .then(function(data) {
      res.render("saved", {
        results: data
      });
    })
    .catch(function(err) {
      res.json(err);
    });
});

//route to save a currently unsaved article, or visa versa
router.post("/saved/:id", function(req, res) {
  db.Article.findById(req.params.id, function(err, data) {
    if (err) {
      return err;
    }
    if (data.saved) {
      db.Article.findByIdAndUpdate(
        req.params.id,
        {
          $set: {
            isSaved: false
          }
        },
        {
          new: true
        },
        function(data) {
          res.redirect("/saved");
        }
      );
    } else {
      db.Article.findByIdAndUpdate(
        req.params.id,
        {
          $set: {
            isSaved: true
          }
        },
        {
          new: true
        },
        function(data) {
          res.redirect("/");
        }
      );
    }
  });
});

module.exports = router; //Export router