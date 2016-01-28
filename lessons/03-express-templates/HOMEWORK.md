### Before Class 4 (Friday 1/29/16)
In this homework you will begin building your first Express application, and create dynamic Handlebars templates.

#### Reading
This assignment asks you to create, access, and modify data on your server when certain routes in your web app are visited. To do this and have your data be truly persistent, you'll need tools like MongoDB and Mongoose. We haven't gotten there yet, so for this assignment we're providing you with some code that will act somewhat like a database.

Create a file named 'fakeDatabase.js' in the top level directory of your express application and paste in the following code:

```javascript
var FakeDatabase = module.exports = {

    data: [],

    add: function(obj) {
        //adds item to end of array holding data
        FakeDatabase.data.push(obj);
    },

    getAll: function() {
        //returns copy of array of all items in the database
        return FakeDatabase.data.slice();
    },

    remove: function(index) {
        //removes item located at index in array and returns it
        return FakeDatabase.data.splice(index,1);
    }
}
```

This fake database is actually just an object that contains an array and some functions to modify that array. Since this isn't a real database, the data won't be truly persistent. If your node application crashes or is restarted, the data in this fake database will be lost. But this is good enough for now. In the next assignment, you'll be hooking up your application to a real database.

To use the fake database, you can simply require the fakeDatabase file at the top of your own modules. Here is an example of an index.js file containing routes for a simple web app. This web app allows users to create and access Lizard records.

```javascript
var express = require('express');
var router = express.Router();
var db = require('../fakeDatabase');

//function that constructs and returns lizard object
function Lizard(name){
  var lizard = {
    name: name,
  };
  return lizard;
}

//get all lizard names
router.get('/names', function(req, res, next){
  var lizards = db.getAll();
  var msg = "Lizard names are: ";
  lizards.forEach(function(liz){
    msg = msg + liz.name + ",";
  })
  res.send(msg);
});

// create new lizard named Bob
router.get('/new', function(req, res, next) {
  db.add(Lizard("Bob"));
  res.send("Added lizard!");
});

module.exports = router;
```

Carefully reading the code above should be enough to get you started. Note that handlebars templating is not used in the example above, but you are required to use handlebars templating for your assignment. So you should be using *res.render*, not *res.send*! And though it isn't nessecary to, you can modify the fakeDatabase.js code if you wish.

#### Assignment 
Create an Express application that has the following routes:
* GET `/cats/new` => Creates a new cat record. A cat should have a random age, a name, and a list of colors.
  * These should be generated upon creation, not hardcoded.
  * Optional: Display a verification that a new cat was created, perhaps by stating the details of the new cat.
* GET `/cats` = > Shows a sorted list of cats by age. This should display their names, colors and age.
  * The display doesn't have to be pretty as long as its clear. Feel free to explore some HTML formatting, but we will cover it more next time.
* GET `/cats/bycolor/:color` => Shows a sorted list of cats by age that have a specific color, where `:color` is a parameter, such as "orange", or "grey" that specifies the color. See [the Express API Docs](http://expressjs.com/4x/api.html#req.params) for a hint on how to parse the URL easily.
* GET `/cats/delete/old` => Deletes the record of the oldest cat (send it to a nice farm in the country). The cat should not longer appear on any lists
  * Optional: Display a verification that a cat was deleted, perhaps by stating which cat was deleted.

In this assignment we are doing something very bad. GET should be a [safe method](http://en.wikipedia.org/wiki/Hypertext_Transfer_Protocol#Safe_methods) that is guaranteed to not modify or delete data. We should be using a DELETE or POST request when we intend to modify the server's data. Check out this [video](https://www.youtube.com/watch?v=cIliEo0zOwg) for an example of why this is important.

We are using GET requests in this horrible way because without writing a front end, sending other types of requests becomes much more difficult. We'll get there soon though.

###### Some Parting Words
In order to complete this assignment, you're going to have to figure out
how to filter and sort data. We didn't cover this in class, but it's not much of a stretch to Google.

We encourage you to look at documentation and search for code/answers to problems that you run into. Attribute from where you copy, not just for honesty but because you'll probably run into the same issue again someday. This way, it'll be way easier to go back to where you found that answer.

Are you running into errors that the first page of Google results doesn't solve? Email out to the mailing list or post on Slack -- chances are, someone's encountered your error before.

As always, ask for help in Slack or come to office hours if this feels like an overwhelming amout of work, if you are running into trouble, or if you need some guidance with this assignment.

###### Submission
Note: Because this is the first homework where you've really written code, we're going to try a feedback experiment -- in the homework submission survey, we'll ask you for a code excerpt you feel really confident about and a code excerpt you're not sure about or think could be improved. We'll target our feedback towards those two excerpts. We're hoping that looking at less code will allow us give you higher-quality, more detailed comments. Let us know what you think of the experiment -- we want to give you feedback which is helpful for you!

When you're finished, fill out [the Homework 3 submission survey](http://goo.gl/forms/4bDNdoH3M8).

#### Preclass Reading and Exercise
- Read the [Class 4 README](https://github.com/olinjs/olinjs/tree/master/lessons/04-client-jquery-ajax)
- Send an email to [olinjs16@gmail.com](olinjs16@gmail.com) with the subject line "Preclass 4" telling us about...
    - Something in the reading you felt confident about and easily grasped
    - Something in the reading you're confused about or want to know more about
