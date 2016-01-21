# Lesson 4 - MongoDB and Mongoose

Node has the ability to store some information as variables. But all of the variables are stored in the process memory.
If you restart the server (or the server crashes) the data will be wiped away.
If you are storing information from users or information based on user input, we need a more permanent solution.
That's where persistent storage comes in.

A file, like `data.txt`, is a form of persistent storage.
It can be written to, read from, and maintains information regardless of whether your server is running or has long since stopped.
But files aren't useful for much more than storing log information because of their organization and slow hard disk read/write speeds.
When we want to retrieve data from persistent storage quickly, we need a solution like a database!

MongoDB is a NoSQL database, which means that instead of tabular data, it stores data in JSON-like documents, is relatively performant and offers useful features for production level systems.
We're going to use it for these reasons, but also because it is very easy to integrate with Node and doesn't require learning too much about data storage.
Alternatives, for example the ubiquitous MySQL and PostgreSQL, are also very common database solutions, but tend to take a bit more time to get set up in a Node environment and require you to learn a query language (SQL) to access your data.
You will likely see them in any internships or jobs doing web-dev, but MongoDB more than suits our purposes and will teach you the basics of data storage without taking a couple weeks of class time to get comfortable with.

##Mongo
So, let's get Mongo running and see what we can do with it:

```sh
sudo apt-key adv --keyserver keyserver.ubuntu.com --recv 7F0CEB10;
echo "deb http://downloads-distro.mongodb.org/repo/ubuntu-upstart dist 10gen" | sudo tee /etc/apt/sources.list.d/10gen.list;
sudo apt-get update;
sudo apt-get install -y mongodb-org
```

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
