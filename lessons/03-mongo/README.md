# Lesson 3 - MongoDB and Mongoose

Node has the ability to store some information as variables. But all of the variables are stored in the process memory.
If you restart the server (or the server crashes) the data will be wiped away.
If you are storing information from users or information based on user input, we need a more permanent solution.
That's where persistent storage comes in.

A file, like `data.txt`, is a form of persistent storage.
It can be written to, read from, and maintains information regardless of whether your server is running or has long since stopped.
But files aren't useful for much more than storing log information because of their organization and slow hard disk read/write speeds.
When we want to retrieve data from persistent storage quickly, we need a solution like a database!

MongoDB is a NoSQL database, which means that instead of tabular data, it stores data in JSON-like documents, and offers useful features for production level systems. We're going to use it for these reasons, but also because it is very easy to integrate with Node and doesn't require learning too much about data storage. Alternatives, for example the ubiquitous MySQL and PostgreSQL, are also very common database solutions, but tend to take a bit more time to get set up in a Node environment and require you to learn a query language (SQL) to access your data. You will likely see them in any internships or jobs doing web-dev, but MongoDB more than suits our purposes and will teach you the basics of data storage without taking a couple weeks of class time to get comfortable with.

##Mongo
So, let's get Mongo running and see what we can do with it:

```sh
sudo apt-key adv --keyserver keyserver.ubuntu.com --recv 7F0CEB10;
echo "deb http://downloads-distro.mongodb.org/repo/ubuntu-upstart dist 10gen" | sudo tee /etc/apt/sources.list.d/10gen.list;
sudo apt-get update;
sudo apt-get install -y mongodb-org
```

If you have Ubuntu 16.04 or higher, consult these [instructions and FAQ](https://www.digitalocean.com/community/tutorials/how-to-install-mongodb-on-ubuntu-16-04) to install.

If you have a mac, you can consult these [instructions](https://docs.mongodb.org/manual/tutorial/install-mongodb-on-os-x/).

Once installed, start the database by running:
```sh
sudo service mongod start

```
If you ever run into errors connecting to your database, ensure the `mongod` service (mongo daemon) is still running, and restart it if necessary.

While the server is running in the background you can exit it safely by running:
```sh
sudo service mongod stop
```

While the database is running you can access it directly through your terminal using the `mongo` command. This will connect on the default Mongo port (27017) and allow you to issue MongoDB commands directly:
```sh
$ mongo
MongoDB shell version: 2.6.6
connecting to: test
>
```
You can see all the databases you have on your machine by typing
```sh
> show dbs
admin  (empty)
local  0.078GB
```
Let's create a new database and a new entry in that database:
```sh
> use test
switched to db test
> db.users.insert({'name':'alice'})
> db.users.find()
{ "_id" : ObjectId("51007865e481634f390b162f"), "name" : "alice" }
> db.users.insert({'name': 'bob', 'grade': 'A', 'assignments':[{1: 'A', 2: 'B'}]})
> db.users.find()
{ "_id" : ObjectId("51007865e481634f390b162f"), "name" : "alice" }
{ "_id" : ObjectId("510078bee481634f390b1630"), "name" : "bob", "grade" : "A",
"assignments" : [ { "1" : "A", "2" : "B" } ] }
> show dbs
admin (empty)
local 0.078GB
test  0.203125GB
```
Mongo creates a database for us as soon as we start inserting items into it. It stores data in what's known as a `collection`. So in our case, users would be a collection. Items within a collection don't have to be consistent with each other (alice only has a name while bob has a name and a grade).

We can also delete specific items, or a whole collection:
```
> db.users.remove({'name': 'alice'})
> db.users.find()
{ "_id" : ObjectId("510078bee481634f390b1630"), "name" : "bob", "grade" : "A",
"assignments" : [ { "grade" : "A", "grade" : "B" } ] }
> db.users.drop()
true
```
Modify items:
```sh
> db.users.update({'name': 'bob'}, {$set: {'class': 2013}})
> db.users.find()
{ "_id" : ObjectId("510078bee481634f390b1630"), "assignments" : [ { "grade" : "A", "grade" : "B" } ],
"class" : 2013, "grade" : "A", "name" : "bob" }
```
And search for items:
```sh
> db.users.find({'grade': 'A'})
{ "_id" : ObjectId("510078bee481634f390b1630"), "assignments" : [ { "grade" : "A", "grade" : "B" } ],
"class" : 2013, "grade" : "A", "name" : "bob" }
```
There are loads more Mongo commands that can be found through the [documentation](http://docs.mongodb.org/manual/).
## Mongoose
[Mongoose](http://mongoosejs.com/) is a javascript wrapper for MongoDB that allows us to save javascript objects into our database without having to deal with the underlying Mongo commands. Install it by opening up a console and typing:
```sh
npm install --save mongoose
```
You can configure Mongoose to save objects using a [schema](http://mongoosejs.com/docs/guide.html). In a schema we define what kind of data we expect an object to have.
```javascript
var userSchema = mongoose.Schema({
  name: String,
  grade: String,
  class: Number
});
```
We can now use this schema to create and save users:
```javascript
var User = mongoose.model('User', userSchema);
var bob = new User({name: 'bob', grade: 'A', class: '2013'});
bob.save(function (err) {
  if (err) {
    console.log("Problem saving bob", err);
  }
});
```

The schema can also be used for querying:
```javascript
User.find({name: 'bob'})
  .sort({grade: -1})
  .exec(function(err, users) {
    console.log(users);
  });
```

Find all users with the name 'bob', sort them in descending order based on their grade, and then print them to the console.
Using the exec function allows you to chain multiple query elements (like `find` and `sort`) together before providing a callback.
This allows Mongoose to form one large Mongo query and be more performant than running additional queries in the callbacks of other queries.

## Connecting to a Mongoose Database
Check out the [getting started](http://mongoosejs.com/docs/index.html) guide on Mongoose to learn how to connect to your MongoDB database.

It's a little vague where you should put everything as you start integrating databases into your applications, so we have a few suggestions.

Put the code to establish your connection from mongoose to your mongo database in your main application file. It should look like this.

```javascript
mongoose.connect('mongodb://localhost/robots');
```

You will also want somewhere to store the mongoose schemas that you are creating, so make sure your folder structure has a models folder that can contain files that look something like this.

```javascript
//This type of file is usually found in app/models/robotModel.js
var mongoose = require('mongoose');

// Create a Schema
var robotSchema = mongoose.Schema({
  name: String,
  abilities: [String],
  isEvil: Boolean
});

module.exports = mongoose.model("robot", robotSchema);
```

Finally, when you want to use this model in your routes, make sure you **require** your `robotModel.js` schema file.

```javascript
var Robot = require('../models/robotModel.js');

Robot.find({}, function(err, robots){
  console.log(robots);
});
```

# Lesson 3 In-Class Exercises

Today we will be playing around with mongoDB by writing mongoose queries, before moving on to working with mongoose in your cat app.

If you find useful resources online while you're working on these exercises, please post them in the #olinjs slack channel!

##Queries in Mongoose
In mongoose, you create a schema to define the structure of your mongo collection. For this exercise, you will be working with a schema that has various robot features.

```javascript
var robotSchema = mongoose.Schema({
	name: String,
	abilities: [String],
  isEvil: Boolean
});
```

Follow along at the end of the Readme to connect a copy of your boilerplate app to mongoose. Try writing out a few queries to select certain robots, and pass them to render in a handlebars file. You can now use mongo/mongoose to persist data for any application.

##Advanced Queries
Now that you've got the basics of mongoose working, organize into groups and have each member research an advanced mongoose query to present to the group. You can implement this if you want, or move on to working on the cat app (where you will eventually need to implement an advanced query for this weeks homework).

We're defining an advanced query as something that builds on basic queries by using query operators such as **and** and **or**. You can find a full list of query operators [here](https://docs.mongodb.org/manual/reference/operator/query/#query-selectors). You can also see examples of what that looks like in mongoose syntax at the main queries [doc page](http://mongoosejs.com/docs/queries.html) and in the [page](https://docs.mongodb.org/manual/tutorial/query-documents/) dedicated to building specific queries.

##Cat App
Once you are comfortable with using mongoose in your boilerplate application and building different types of queries, start working on integrating a database into your cat app. Follow the [getting started guide](http://mongoosejs.com/docs/index.html) that mongoose provides to hook the in-class app up to your database.

In groups, discuss the models you will use to store data for your cat app. It can be helpful to diagram your models on the board.

After you have decided on your model and created a schema, hook the cat creation route in your cat app up to mongoose. Once you have this working, try connecting your cat app to a partner's cat app database.

## Feedback
We'd love your feedback on today's class -- fill out [this survey](https://docs.google.com/forms/d/e/1FAIpQLScnYqhtJAFYkq5FAJALVZtu0fFx658EZk3x3n2olL1_eZZlqg/viewform) if you'd like!

#Before Class 4 (Tuesday 1/31/17)
#### Assignment
For the homework, you will be integrating mongoDB into your Cat App from last class using mongoose. Now you can store the cats you create forever, and create new features that allow you to sort those cats in various ways.

For this homework, you will need to add at least one feature that integrates with your database and uses an advanced query. For example, you could only show cats in a certain age range, or display cats by date created.

In case you missed the in-class:
We're defining an advanced query as something that builds on basic queries by using query operators such as **and** and **or**. You can find a full list of query operators [here](https://docs.mongodb.org/manual/reference/operator/query/#query-selectors). You can also see examples of what that looks like in mongoose syntax at the main queries [doc page](http://mongoosejs.com/docs/queries.html) and in the [page](https://docs.mongodb.org/manual/tutorial/query-documents/) dedicated to building specific queries.

**Challenging:** Explore a more advanced concept of mongo/mongoose like embedding vs. referencing inside your cat application.

Other possible ideas would be integrating your cat app with a SQL database like mySQL or integrating with a remote database hosted on mongolab. However, please at least read through the following information on embedding vs. referencing.

#### Mongo Embedding vs Referencing
Let's say that you owned a series of bookstores each with a location,
a manager, and tons of books. Each book has an author and a price.
So our data structure so far looks like:
```
bookstore
  location
  manager
  book
    author
    price
```
Keep in mind that a lot of books will be repeated across bookstores.
How would we convert this to a Mongo datastore?
Perhaps the obvious solution would be to just throw it all into an object that looks like the above.
This is called **embedding** and is one of two ways that Mongo allows us to store objects within other objects.

**Embedding** is when you store a Mongo document inside of another Mongo document.
This is the default way to do things in Mongo, and is the most obvious.
Instead of creating two collections for your bookstore,
you'll just have one bookstore collection that has a list of every book inside of the bookstore.
```
bookstore
  location
  manager
  book
    author
    price
```

This will lead you to repeat books across bookstores (but who cares because space is cheap).
However, it will also mean that if you want to change the price of a book across all bookstores you have to go through each bookstore,
search for the book, then change the attribute of the book.
This isn't too bad if the book changes price very rarely, or if there are only a few stores which stock the book.
However, think back to the Amazon.com example.
If the price of the book changes every hour, and 1000 bookstores stock the book,
you now have to update 1000 objects every hour.
This becomes an even bigger problem when you're a product like Twitter and your
"bookstores" are users and books are people those users follow. Let's say you want
to update information about the book "Lady Gaga", which is stocked by 33 million "bookstores".
This would be nearly impossible with embedded data, but is a cinch with references.

The other method of putting objects within other objects is called **referencing**.

**Referencing** is when you reference a Mongo document (usually by _id)
inside of another document.
We could split up the `bookstore` into two separate Mongo collections,
a `store` and a `book`.
Then our collections will look like:
```
store
  location
  manager
  items
```
```
book
  author
  price
```
This decouples stores with what they carry.
We now have 1 book object that can be referenced from multiple stores.
This is useful when you are lacking in space (because you don't repeat books).
It is also useful when the object being shared changes often.
Imagine that this bookstore based the price of their books on the Amazon.com price of the book (which fluctuates constantly).
Now every time the price of the book changes you have to make only one change to one object,
and the next time a store looks up the book it will see the updated price.

In the end which way you use (reference or embedding) depends what your data access patterns will be like.
You'll likely be using embeds 80% of the time, but references also have their place, so know how to do both.

The Mongo documentation has further details about [when to embed vs reference](http://docs.mongodb.org/manual/core/data-model-design/).

When you're finished, fill out [the Homework 3 submission survey](https://docs.google.com/forms/d/e/1FAIpQLSdqXUJFMLalcKxrkWCiv17zcEshEfDO1Wullp-5BzzSjwbL5Q/viewform). Like the previous homework, your app will be graded according to the [Homework Rubric](../../Syllabus.md#homework-rubric-50-points-total).
