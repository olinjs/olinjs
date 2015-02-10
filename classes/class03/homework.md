# Homework 3
In this homework you will build your first Express application, create some dynamic Handlebars templates, and store and load information in a MongoDB database using Mongoose.
## Assignment
Create an Express application that has the following routes:
* GET `/cats/new` => Creates a new cat record. A cat should have a random age, a name, and a list of colors.
  * These should be generated upon creation, not hardcoded.
  * Optional: Display a verification that a new cat was created, perhaps by stating the details of the new cat.
* GET `/cats` = > Shows a sorted list of cats by age. This should display their names, colors and age.
  * The display doesn't have to be pretty as long as its clear. Feel free to explore some HTML formatting, but we will cover it more next time.
* GET `/cats/bycolor/:color` => Shows a sorted list of cats by age that have a specific color, where `:color` is a parameter, such as "orange", or "grey" that specifies the color. See [the Express API Docs](http://expressjs.com/4x/api.html#req.params) for a hint on how to parse the URL easily.
* GET `/cats/delete/old` => Deletes the record of the oldest cat (send it to a nice farm in the country). The cat should not longer appear on any lists
  * Optional: Display a verification that a cat was deleted, perhaps by stating which cat was deleted.
* Deploy this to Heroku (see [Additional Information](#additional-information))

In this assignment we are doing something very bad. GET should be a [safe method](http://en.wikipedia.org/wiki/Hypertext_Transfer_Protocol#Safe_methods) that is guaranteed to not modify or delete data. We should be using a DELETE or POST request when we intend to modify the server's data. Check out this [video](https://www.youtube.com/watch?v=cIliEo0zOwg) for an example of why this is important.

We are using GET requests in this horrible way because without writing a front end, sending other types of requests becomes much more difficult. We'll get there soon though.
## Submission
Fill out [this survey](http://goo.gl/forms/pzXSFUl10f) to turn in this assignment.
Also remember to read through the next [class](../class4) and come prepared with an understanding of:
* What some of the differences are between client side javascript and the Node javascript you've been using
* What HTML forms look like and what in what method their information is sent to the server


## Additional Information
This homework will require deploying to Heroku. We talked about it briefly in class but now its time to set it up.
First you'll need an account which you can create at https://www.heroku.com/.

* To setup your local computer, install the [Heroku Toolbelt](https://toolbelt.heroku.com/debian).
* Work through the [Node.js guide](https://devcenter.heroku.com/articles/getting-started-with-nodejs#introduction) to practice deploying a sample application.
  * Note: Running `heroku create` will add a new remote (`heroku`) to the git repo you are within when you run the command.
    In this case, you are inside the Olinjs repository which we will use for multiple Heroku deployments.
    In order to run multiple deployments from within one git repository we are going to do something a bit strange:
    create new git repositories within the Olinjs repo. Within the folder in which you created your homework application,
    run `git init`. Then when you run `heroku create` your internal git repo will only have one remote server.
    To update your heroku instance, run `git push heroku master`.
    To push your code to Github, change directory out of your homework folder, then add the changed files, and commit.
    Run the `heroku create` command as `heroku create --ssh-git` if you use ssh to connect to github.
* In order to use MongoDB in Heroku we will use a third-party addon called MongoLab.
  You will need to create an account at http://mongolab.com, create a new database (Single Node, free tier), and create a user for that database.

When you have finished creating the database and user you will be presented with a URI that looks something like the following:
```
mongodb://<dbuser>:<dbpassword>@ds031631.mongolab.com:31631/olinjs
```
Where `<dbuser>` and `<dbpassword>` are the user and password you created for your database user account,
NOT your MongoLab username and password.

In order to seamlessly transition between localhost and heroku, while also keeping the URI outside of our public git repo we will use environment variables.

Inside your Node app, we'll set the URI variable to be the environment variable, if it exists, or the localhost link, if not.
```javascript
var mongoURI = process.env.MONGOURI || "mongodb://localhost/test";
mongoose.connect(mongoURI);
```
Once you've retrieved your MongoLab URI, you can set your Heroku instance to connect to that database by setting the environment variable:
```sh
$ heroku config:set MONGOURI=mongodb://<dbuser>:<dbpassword>@ds031631.mongolab.com:31631/olinjs
Adding config vars and restarting heroku_app1234... done, v12
MONGOURI: mongodb://<dbuser>:<dbpassword>@ds031631.mongolab.com:31631/olinjs
```
You can run `heroku config` to list all set variables and their values.

You will want to do a similar setup for the port number that the application runs on.
Locally we use port 3000, as it tends to be a standard for Node development.
However, Heroku may not use the same port number.
They configure the port number through an environment variable, so we will do the same thing.
Within `app.js`, add this line:
```javascript
var PORT = process.env.PORT || 3000;
```
This will capture the environment variable, if it exists, or use 3000 otherwise.
We use the fully capitalized `PORT` as this is a configuration variable/a [magic number](http://en.wikipedia.org/wiki/Magic_number_%28programming%29).

When you specify the port that the application should listen on, make sure you use the new PORT variable:
```javascript
app.listen(PORT, function() {
  console.log("Application running on port:", PORT);
});
```

With this set up your app will connect to localhost when you run it from your computer, and your MongoLab database from Heroku.
## Some Parting Words
In order to complete this assignment, you're also going to have to use some arrays and sort your data from Mongoose. We didn't cover this in class, but it's not that much of a stretch to Google.

We encourage you to look at documentation and search for code/answers to problems that you run into. Attribute from where you copy, not just for honesty but because you'll probably run into the same issue again someday. This way, it'll be way easier to go back to where you found that answer.

Are you running into errors that the first page of Google results doesn't solve? Email out to the mailing list. Chances are, we've already had this error before.
As always, ask for help in Slack or come to office hours if you are running into trouble or need some guidance with this assignment.
