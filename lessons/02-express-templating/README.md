#Lesson 2 - Express and Templating

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
Routing is the process of serving up different pages for different URLs. When you go to www.mycoolsite.com/, your computer goes out on the internet and asks mycoolsite's server for a page. Mycoolsite's server then sees that request and sends back information to your computer in the form of html. This HTML is then rendered in your browser.

If you go to www.mycoolsite.com/, mycoolsite's servers obviously can't send you the same data they sent www.mycoolsite.com/olin. So mycoolsite's servers needs to differentiate `/` from `/olin`. This process is known as routing.

In the Node Beginner Book, we did routing through something like
```javascript
var pathname = url.parse(request.url).pathname;
route(handle, pathname, response, request);
```
With Express, we don't need to write the code to handle the route ourselves; Express does it for us with these statements:
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

At the end of the day, templating engines-like most things-come down to personal preference, and that's why we're forcing you to like Handlebars! (At least for the duration of this course).

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

# Lesson 2 In-Class Exercises

If you find useful resources online while you're working on these exercises, please post them in the #olinjs slack channel!

1. Follow along with the tutorial in this readme to create a web app that uses Express and Handlebars to display a list of classes at Olin that you're currently taking and the professors who teach them. Your finished product should display something like the paragraph below in a browser:
   
    - Aaron teaches POE
    - Allen teaches Signals and Systems
    - Mark teaches Markanics
   
   Build off of the hello world application you did for homework and make sure that
   you use Handlebars. You will have to extend and slightly change the code
   provided in the lesson 2 readme to build this app. Instead of giving Handlebars a list of
   Strings, you'll want to hand off a list of Objects to Handlebars. These objects
   will contain Strings specifying the name of the class and the teacher, like so:
   
   ```javascript
       res.render("home", {"classes": [
         {name:"Olin.js", teacher:"Me"},
         {name:"other class 1", teacher:"A baboon"},
         {name:"other class 2", teacher:"A sentient rock"}]
       });
   ```
   
   Then in Handlebars you can access the values stored in the object using this.name or this.teacher. For example, to display a list of teachers while complimenting them, we might write the folowing code:
   
   ```html
   <ul>
   {{#each classes}}
     <li>{{this.teacher}} is the best!</li>
   {{/each}}
   </ul>
   ```
   
   Once you've completed the exercise, show the teaching team your web app in a browser.

2. There is a lot of repetitive setup and repeated code, called boilerplate code, involved when you create a new web app. Copy the files of the application you created for the exercise above into a new directory. Name this new directory 'boilerplate' and make sure that you'll be able to easily find it later on. Congratulations, now you have code that you can copy and paste to quickly begin building a new web app. This way, you can avoid tedious repetitive setup in the future. You may modify this boilerplate as you wish, simplifying and cutting out code, but it's pretty bare-bones already. Generating code and setting up projects automatically is such a common thing that tools like express-generate (mentioned in the class readme) and yeoman exist to do this. Those tools generate more code than you'll need right now, making it harder to understand what's going on, so we don't recommend that you use them just yet.

3. For this last exercise, you will be replicating one of the most sophisticated and powerful web apps the internet has ever seen: [https://isitchristmas.com/](https://isitchristmas.com).There are a few requirements, of course.
  - Your website should use Handlebars and change to tell the user YES or NO depending on whether it is Christmas.
  - The website title and favicon (what displays at the top of a tab in chrome) should be appropriately Christmassy. Do some googling first if you need help with the favicon!
  - You don’t need to worry about timezones for now. Assume that everyone using this website is in the same timezone as your server.  
  - If you finish early, try your hand at these exercises:
    - Make sure that the response you send your user is centered, no matter how they resize their browser.
    - Send along some javascript so an animation of your choice occurs when you click on the page. For example, the text on the page could change to a random color when you click on it.  


#Before Class 3 (Friday 1/27/17)
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

When you're finished, fill out [the Homework 2 submission survey](https://goo.gl/forms/ZunpkPjtIgweJDQa2).
