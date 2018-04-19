# NYT Hub
__This web appplication utilizes MongoDB to allow users to view and leave comments on the latest news articles from the New York Times.__

### Overview
* Whenever a user visits NYT Hub, the user can click 'Get New Articles' and the app will scrape the latest stories from the New York Times and display them for the user. 

* Each scraped article is saved to the application database. 

* The app scrape and displays the following information for each article:
    * __Headline__ - _the title of the article_
    * __Summary__ - _a short summary of the article_
    * __URL__ - _the url to the original article_

* Users are also able to leave comments on the articles displayed and revisit them later. 
    * The comments are saved to the database and associated with their articles. 
    * Users are able to delete comments left on articles. 
    * All stored comments are visible to every user.

> __NOTE__: Whenever a user saves an article, the app ensures that the selected article isn't already represented the database before saving it so there are no duplicates.

#### _This application utilizes the following npm packages:_
* express 
* express-handlebars
* mongoose
* body-parser
* request







