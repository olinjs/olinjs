#Class 3 - Express, Templating, and MongoDB

##Express
Now that we've explored Node.js a little, we will abstract the details away with the [Express](http://expressjs.com/) development framework. Before, in the Node Beginner's Book, our code looked a lot like this:
```javascript
var http = require("http");

http.createServer(function(request, response) {
  response.writeHead(200, {"Content-Type": "text/plain"});
  response.write("Hello World");
  response.end();
}).listen(8888);
```

Now let's see what the same app would look like using Express. To start we'll set up a new application using `npm init`. This will ask you a series of questions that will populate your `package.json` file, you can use the defaults for all of them. This file manages many things. If you publish your module on npm (like any of the modules which you `npm install` are published) this file will include the meta information about your module. We won't get into that much in this class, but that's why it seems like there are a lot of unnecessary fields. The main purpose we will use the `package.json` for is dependency management.

After you exit the init setup, run `npm install express --save`. If you check your `package.json` again, you'll see the following was added:
```javascript
"dependencies": {
    "express": "^4.10.6"
  },
```
The `--save` argument will add the module to your list of dependencies and is generally a good thing to use whenever adding a new module. If you just forked a cloned project that has its dependencies listed you can simply run `npm install` to install the required dependencies (at the right versions) for that project.

Now that we're set up, create a file called `app.js` and and paste in the following:
```javascript
var express = require('express');
var app = express();

app.get('/', function(req, res){
  res.send('hello world');
});

app.listen(3000);
```
Inside the folder in which you created the `app.js` file, run the command `node app` to start the server. Go to `http://localhost:3000` in your web browser and you should see the following:
```
hello world
```
Awesome! You just ran your first application using Express!

Express makes writing web servers in Node much easier. Here are some of the important differences between the examples you did in the book and Express:
* Routing: Instead of parsing the URL out of the request ourselves, we can have Express do that for us, and even assign a function to execute whenever a request asks for a specific path.
* Sending a response: Express takes care of setting many obvious response headers for you. Express will also handle sending files like images, music, audio, or `.html` files from a folder easily.
* Handling templates: Express can also be configured to populate HTML templates before sending them in a response. We'll cover this later.
Let's go back to our `app.js`. We want more than just "hello world". Let's make Express show the string `hello olin` when we go to `http://localhost:3000/olin`.

Below the `app.get('/',...` statement, add the following:
```javascript
app.get('/olin', function(req, res){
  res.send('hello olin');
});
```

###Routing
Routing is the process of serving up different pages for different URLs. When you go to www.mycoolsite.com/ your computer goes out on the internet and asks mycoolsite's server for a page. Mycoolsite's server then sees that request and sends back information to your computer in the form of html. This HTML is then rendered in your browser.

If you go to www.mycoolsite.com/ mycoolsite's servers obviously can't send you the same data it sent www.mycoolsite.com/olin. So mycoolsite's servers needs to differentiate `/` from `/olin`. This process is known as routing.

In the Node Beginner Book, we did routing through something like
```javascript
var pathname = url.parse(request.url).pathname;
route(handle, pathname, response, request);
```
Instead of writing the code to handle the route ourselves, Express does it for us with these statements:
```javascript
app.get('/', function (req, res){
  res.send('hello world');
});

app.get('/olin', function (req, res){
  res.send('hello olin');
});
```
The two routes we created are for the index page (`/`) and the olin page (`/olin`).

So what does `app.get` do? It tells Express that every time that particular route (the first string argument) receives a `HTTP GET` request, we want to execute the anonymous function (the second argument). HTTP allows you to make different types of requests on a particular route, and these types are called **methods**. `GET` is just one of the methods you can perform, and is the most common (every time you request an image or a script for example). You can [view the other types of HTTP methods on wikipedia](http://en.wikipedia.org/wiki/Hypertext_Transfer_Protocol#Request_methods). But for now, let's only consider these two:
* `GET` returns a resource (such as an image or an html page). This is used for when your browser wants to read information from a server. Parameters and options are communicated in the request header as part of the path (`/olin`) and query string parameters (`?pageid=12&button=2&coolsetting=super`) which you may recognize from various websites.
* `POST` is used when your browser wants to send information over to the server. For example, when you fill out an online form, that data is sent over to the server as `POST` data. This information is sent in the body of the request (not the header), and is therefore encrypted when communicating over an HTTPS connection.

### Organizing an Express Application
Express offers a tool called the `express-generator` to get a new directory up a running. This is also an example of a node module that provides a command line tool. To run node modules in your console you must install them globally using the `-g` flag and sudo permissions. Whenever you install a node module using sudo, ensure to add `-H` to prevent your cache from saving write protected files.
```sh
$ express

   create : ./
   create : ./package.json
   create : ./app.js
   create : ./public
   create : ./public/images
   create : ./public/stylesheets
   create : ./public/stylesheets/style.css
   create : ./routes
   create : ./routes/index.js
   create : ./routes/users.js
   create : ./public/javascripts
   create : ./views
   create : ./views/index.jade
   create : ./views/layout.jade
   create : ./views/error.jade
   create : ./bin
   create : ./bin/www

   install dependencies:
     $ cd . && npm install
```
This creates a series of directories `public`, `routes`, and `views`. The public directory is used for client side assets such as images, stylesheets, and client side javacript. Views are used to store template files which we will cover later. Routes, which we will focus on first, contain all the routing logic of our applications.
More often then not, I find the generated app provides more structure and example files then you actually want and you end up deleting much of it. Feel free to explore the generator if you're curious, but for now we'll steal the folder structure and build the contents ourselves.

Create this folder structure in the same directory as your `app.js` file by running `mkdir views routes public public/images public/javascripts public/stylesheets`. Then create a new file `index.js` in the `routes` folder. This is where we will add some of the main routing logic for our app. You will often see another file like `users.js` in the routes folder which would contain routes that might manage login, logout, view profile, or other actions like that. You may even see `/routes/cat.js` in your near future!

To move the "hello world" routing into this new structure, paste the following into the `routes/index.js` file:
```javascript
var home = function(req, res){
  res.send("Welcome home!");
};

module.exports.home = home;
```

Then replace the contents of `app.js` with:
```javascript
var express = require('express');
var index = require('./routes/index');
var app = express();

app.get('/', index.home);

app.listen(3000);
```
Note that this time we `require` the new route file as the variable `index` then instead of defining the route function inline we just write `index.home`, which is the function we defined in the index.js file. This structure helps to keep the `app.js` file a bit leaner and makes it more clear where in the project our routes are defined.

### Application Configuration and Useful Settings

There are some initial configurations we want our app to have, such as running on a specific port, using routes, and setting up the public directory as well as some useful tricks to add to our `app.js` file.

First, we're going to install 3 more modules that are used in pretty much every Express app: `npm install --save body-parser cookie-parser morgan`.
Next we'll use them in `app.js` by doing the following:
Add these lines to the top of the file, next to the rest of the requires:
```javascript
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
```
We add `path` here which we did not need to install because it is included within node. It gives us some useful directory path functionality you'll see in a second.
Add these lines of configuration below the line `var app = express();`:
```javascript
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
```
This sets up some basic command line logging functionality using the [Morgan](https://github.com/expressjs/morgan) module, request body parsing, cookie parsing, and establishes the `public` directory as a static folder. This means that going to `http://localhost:3000/images/foo.jpg` will load the file `./public/images/foo.jpg` without any additional work from us. The same will work for javascript files, stylesheets, static html files, or anything else you may want to serve directly.

If you run the app again (`node app`) upon navigating to http://localhost:3000 you will notice a new line in your console:
```
GET / 304 6.892 ms - -
```
This is Morgan logging the request. This will really come in handy while trying to debug in the future.

Now go ahead and copy the image `cat.jpg` from the `expressintro/public/images` folder in this directory and place it in your new images folder. Then navigate to http://localhost:3000/images/cat.jpg. That is your static folder doing work!

## Templating

Now I imagine you may be asking yourself, *"This is a web-dev course, right? Where's the HTML?"* Well its coming, but doing it smart is not as simple as putting some `<p>` tags in a file and calling it a day. We will be using a technique called templating. Templating allows us to put some logic behind what is otherwise entirely a layout language. This will greatly reduce the overall quantity of HTML you write, thereby reducing errors, and making it much easier to make a change to an element that appears on many pages in your app. Most importantly however, it allows us to dynamically customize the contents of our HTML. Think about Facebook profiles. When you load your profile, you are looking at a static page of HTML. But Facebook's servers aren't full of files called `ben-kahle-profile.html`, and `evan-simpson-profile.html`; that wouldn't exactly scale very well. They have a single profile template into which they inject your personal profile information, render it as HTML and then send it to your browser. Let's learn the basics!

First off, we will be using [Handlebars](http://handlebarsjs.com/) as a templating engine. The default templating engine of Express is actually [Jade](http://jade-lang.com/). We're going to use Handlebars for a few reasons:
* It more closely resembles the HTML result you will see on the client. Some people consider this a negative, but we like it and it can make debugging your views *much* easier. It also makes it easier while you are learning HTML.
* It supports pre-compiled templates and client side rendering. We won't get to these for a while, but they provide some great performance boosts and some awesome flexibility when it comes to designing and building dynamic front-ends.
* Jade's whitespace dependency and style can be a bit too dense and harder to understand. Handlebars may be more "cluttered", but it can also be very nicely structured and layed out in an easy to read manner.

At the end of the day, templating engines-like most things-come down to personal preference, and that's why we're forcing you to like Handlebars! (At least for the next couple weeks).

### Making Express Render Handlebars

To get Express to render handlebars, as well as to add some useful templating features which we will get into later, we are going to use the [Express-Handlebars](https://github.com/ericf/express-handlebars) module. So go ahead and `npm install --save express-handlebars` to get it installed.

Now two more things to know about are layouts and partials.
* Layouts: Basically meta-templates. They are handlebars documents that allow you to create a wrapper around all the templates that use them. You might see different layouts that include different css or js files for different sections of applications.
* Partials: Basically mini-reusable templates. They are handlebars documents that can be written once and "included" within other templates. For example, the Facebook chat module is a chunk of HTML that is included in many different pages.

We're going to build a layout and leave utilizing partials as an exercise for later.

To render a template the first thing we want is a base layout. To start we'll make a very simple one:
```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Express Intro</title>
  </head>
  <body>
    {{{body}}}
  </body>
</html>
```
This is some of the [boilerplate](http://en.wikipedia.org/wiki/Boilerplate_code) for HTML where the center bit `{{{body}}}` signifies where templates will be inserted into this layout.
Go ahead and copy that code into a file `main.handlebars` and put it in a new folder `/layouts` within the `/views` directory of your application.

Now for the template itself. Starting off simple:
```html
<h1>Welcome Home!</h1>
```
Save that in a file called `home.handlebars` and put in the `/views` directory as a sibling to the new `/layouts` directory you just made. Your folder structure should look like this:
```
.
├── app.js
└── views
    ├── home.handlebars
    └── layouts
        └── main.handlebars

2 directories, 3 files
```
All of this organization is completely customizable, but we'll leave it as the default for now.

Now let's hook it all up!

Add the line `var exphbs  = require('express-handlebars');` to the top of your `app.js` file. Then add these two lines after the `var app = express();` line:
```javascript
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
```
Note that you're setting the default layout for the application to the `main.handlebars` file you just created. You can change the layout for a single template at render time with a simple option.

Lastly, within the `index.js` routing file, replace:
```javascript
res.send("Welcome home!");
```
with
```javascript
res.render('home');
```
Restart your server, visit http://localhost:3000 and behold your template!

At this point you are basically just writing plain HTML, let's fix that!
Start by adding the following to your `home.handlebars` template:
```html
<ul>
{{#each classes}}
  <li>{{this}}</li>
{{/each}}
</ul>
```
Then change the contents of your `index.js` route again. This time to this:
```javascript
res.render("home", {"classes": [
  "Olin.js",
  "other class 1",
  "other class 2",
  "other class 3"]
});
```
The second parameter that we are passing to the `render` function is the *context* for the template. That means that the word `classes` in the handlebars file is looking for an array named `classes` and it will create a new list item for *each* of the elements in the array. There's plenty more power in templates and we'll see them shortly.

## MongoDB

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
So, let's get Mongo running and see what we can do with it:

```sh
sudo apt-key adv --keyserver keyserver.ubuntu.com --recv 7F0CEB10;
echo "deb http://downloads-distro.mongodb.org/repo/ubuntu-upstart dist 10gen" | sudo tee /etc/apt/sources.list.d/10gen.list;
sudo apt-get update;
sudo apt-get install -y mongodb-org
```

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

We can also delete items:
```
> db.users.remove({'name': 'alice'})
> db.users.find()
{ "_id" : ObjectId("510078bee481634f390b1630"), "name" : "bob", "grade" : "A",
"assignments" : [ { "grade" : "A", "grade" : "B" } ] }
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
Check out the [getting started](http://mongoosejs.com/docs/index.html) guide on Mongoose to learn how to connect to your MongoDB database and the basics of saving and loading records.

In the homework you will explore more about how to leverage MongoDB and Mongoose to store data persistently.

For next class finish this [homework](./homework.md).
