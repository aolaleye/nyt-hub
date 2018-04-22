//dependencies
var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");
var exphbs = require("express-handlebars");

//require models
var db = require("./models");

var PORT = process.env.PORT || 8080;

//initialize express
var app = express();

//middleware
app.use(logger("dev"));
app.use(
    bodyParser.urlencoded({
        extended: false
    })
);
app.use(express.static("public"));

//handlebars engine
app.engine(
    "handlebars",
    exphbs({
        defaultLayout: "main"
    })
);
app.set("view engine", "handlebars");

//set mongoose to leverage built in promises and connect to mongodb
mongoose.Promise = Promise;

//if deployed, use the deployed database. otherwise use the local database
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/NYTHub";
mongoose.connect(MONGODB_URI);
mongoose.set("debug", true);

//routes
var routes = require("./router/routes.js");
app.use("/", routes);

// start the server
app.listen(PORT, function () {
    console.log("App running on port " + PORT + "!");
});