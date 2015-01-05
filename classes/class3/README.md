#Class 3

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

Now let's see what the same app would look like using Express. To start we'll set up a new application using `npm init`. This will ask you a series of questions that will populate your `package.json` file, you can use the defaults for all of them. This file manages many things. If you publish your module on npm (like any of the modules which you `npm install` are published) this file will include the meta information about your module. We won't get into that much in this class, but that's why it seems like there are a lot of unnecessary fields. The main purpose we will use the package.json for is dependency management.

After you exit the init setup, run `npm install express --save`. If you check your package.json again, you'll see the following was added: 
```javascript
"dependencies": {
    "express": "^4.10.6"
  },
```
The `--save` argument will add the module to your list of dependencies and is generally a good thing to use whenever adding a new module. If you just forked a cloned a project that has its dependencies listed you can simple run `npm install` to install the required dependencies (at the right versions) for that project.

Now that we're set up, create a file named `app.js` and and paste in the following:
```javascript
var express = require('express');
var app = express();

app.get('/', function(req, res){
  res.send('hello world');
});

app.listen(3000);
```
Inside the folder you created the `app.js` file, run the command `node app` to start the server. Go to `http://localhost:3000` in your web browser and you should see the following:
```
hello world
```
Awesome! You just ran your first application using Express!

Express makes writing web servers in Node much easier. Here are some of the important differences between the examples you did in the book and Express:
* Routing. Instead of trying to parse the URL the user is at ourselves, we can just tell Express to match an individual path with a function.
* Sending a response. Express takes care of setting many obvious response headers for you. Express will also handle sending files like images, music, audio, or `.html` files from a folder easily.
* Handling templates. We haven't gotten here yet, but we'll touch on this later.
Let's go back to our `app.js`. We want more than just hello world. Let's make Express show the string `hello olin` when we go to `http://localhost:3000/olin`.

Below the `app.get('/',...` statement, add the following:
```javascript
app.get('/olin', function(req, res){
  res.send('hello olin');
});
```

So what does `app.get` do? It tells express that every time we have a `GET` request from a client (the browser). We'll learn more about this in Routing.
###Routing
Routing is the process of serving up different pages for different urls. When you go to www.mycoolsite.com/ your computer goes out on the internet and asks mycoolsite's server for a page. Mycoolsite's server then sees that request and sends back information to your computer in the form of html. This html is then rendered on your browser.

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
These two routes we created are for the index page (/) and the olin page (/olin).

So what does `app.get` do? It tells express that every time that particular route (the first string argument) receives a `HTTP GET` request, we want to execute the anonymous function (the second argument). `HTTP` lets you perform different types of requests for a particular route, and these types are called *methods*. `GET` is just one of the methods you can perform, and is the most common (every time request an image or a script for example). You can [view the other types of HTTP methods on wikipedia](http://en.wikipedia.org/wiki/Hypertext_Transfer_Protocol#Request_methods). But for now, let's only consider these two:
* `GET` returns a resource (such as an image or an html page). This is used for when your browser wants to read information from a server. Parameters and options are communicated in the url through the path (`/olin`) and query string parameters (`?pageid=12&button=2&coolsetting=super`) which you may recognize from various websites.
* `POST` is used for when your browser wants to send information over to the server. For example, when you fill out an online form, that data is sent over to the server as `POST` data. This information is sent in the request header, is not visible in plain-text and can be encrypted.
* 
### Organizing an Express Application
Express offers a tool called the `express-generator` to get a new directory up a running.
```sh
express expressintro

   create : expressintro
   create : expressintro/package.json
   create : expressintro/app.js
   create : expressintro/public
   create : expressintro/public/images
   create : expressintro/public/stylesheets
   create : expressintro/public/stylesheets/style.css
   create : expressintro/routes
   create : expressintro/routes/index.js
   create : expressintro/routes/users.js
   create : expressintro/public/javascripts
   create : expressintro/views
   create : expressintro/views/index.jade
   create : expressintro/views/layout.jade
   create : expressintro/views/error.jade
   create : expressintro/bin
   create : expressintro/bin/www

   install dependencies:
     $ cd expressintro && npm install
```
This creates a series of directories `public`, `routes`, and `views`. The public directory is used for client side assets such as images, stylesheets, and client side javacript. Views are used to store template files which we will cover later. Routes, which we will focus on first, contain all the routing logic of our applications.
More often then not, I find the generated app provides more structure and example files then you actually want and you end up deleting much of it. Feel free to explore the generator if you're curious, but for now we'll steal the folder structure and build the contents ourselves.
