# Homework 3
In this homework you will build your first Express application, create some dynamic Handlebars templates, and store and load information in a MongoDB database using Mongoose.
## Assignment
Create an Express application that has the following routes:
* GET `/cats/new` => Creates a new cat record. A cat should have a random age, a name, and a list of colors.
  * These should be generated upon creation, not hardcoded.
  * Optional: Display a verification that a new cat was created, perhaps by stating the details of the new cat.
* GET `/cats` = > Shows a sorted list of cats by age. This should display their names, colors and age.
  * The display doesn't have to be pretty as long as its clear. Feel free to explore some HTML formatting, but we will cover it more next time.
* GET `/cats/bycolor/:color` => Shows a sorted list of cats by age that have a specific color, where `:color` is a parameter, such as "orange", or "grey" that specifies the color.
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
This homework will require deploying to Heroku. We talked about it briefly in class but now its time to set it up. First you'll need an account which you can create at https://www.heroku.com/.

* To setup your local computer, install the [Heroku Toolbelt](https://toolbelt.heroku.com/debian).
* Work through the [Node.js guide](https://devcenter.heroku.com/articles/getting-started-with-nodejs#introduction) to practice deploying a sample application.
* In order to use MongoDB in Heroku we will use a third-party addon called MongoLab. Follow their [setup guide](https://devcenter.heroku.com/articles/mongolab#adding-mongolab) to create a data store. You only need to read until you get your URI which will look something like this:
```sh
heroku config | grep MONGOLAB_URI
MONGOLAB_URI => mongodb://heroku_app1234:random_password@ds029017.mongolab.com:29017/heroku_app1234
```
In order to seamlessly transition between localhost and heroku, while also keeping your URI outside of your public git repo we will use environment variables.
Save your local URI to an environment variable in your current terminal session with:
```sh
$ export MONGOURI=mongodb://localhost/test
```
If you add this line to your `~/.bashrc` file, the environment variable will be added to all of your terminal sessions on startup.
You can print the current state of the environment variable with:
```sh
$ echo $MONGOURI
mongodb://localhost/test
```
Inside your Node app, the value of that variable is accessible within the process object:
```javascript
var mongoURI = process.env.MONGOURI;
mongoose.connect(mongoURI);
```
Once you've retrieved your MongoLab URI, you can set your Heroku instance to connect to that database by setting the environment variable:
```sh
$ heroku config:set MONGOURI=mongodb://heroku_app1234:random_password@ds029017.mongolab.com:29017/heroku_app1234
Adding config vars and restarting heroku_app1234... done, v12
MONGOURI: mongodb://heroku_app1234:random_password@ds029017.mongolab.com:29017/heroku_app1234
```
You can run `heroku config` to list all set variables and their values.

With this set up your app will connect to localhost when you run it from your computer, and your MongoLab database from Heroku.
## Some Parting Words
In order to complete this assignment, you're also going to have to use some arrays and sort your data from Mongoose. We didn't cover this in class, but it's not that much of a stretch to Google.

We encourage you to look at documentation and search for code/answers to problems that you run into. Attribute from where you copy, not just for honesty but because you'll probably run into the same issue again someday. This way, it'll be way easier to go back to where you found that answer.

Are you running into errors that the first page of Google results doesn't solve? Email out to the mailing list. Chances are, we've already had this error before.
As always, ask for help in Slack or come to office hours if you are running into trouble or need some guidance with this assignment.
