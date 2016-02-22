//THis app was created using the following tutorials: 
//https://scotch.io/tutorials/creating-a-single-page-todo-app-with-node-and-angular
//http://blog.jaykanakiya.com/angular-js-todo-list-sortable/

// set up ========================
var express  = require('express');
var app      = express();                               // create our app w/ express
var mongoose = require('mongoose');                     // mongoose for mongodb
var morgan = require('morgan');             // log requests to the console (express4)
var bodyParser = require('body-parser');    // pull information from HTML POST (express4)
var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)

// configuration =================

mongoose.connect('mongodb://localhost/todo');    // connect to mongoDB database on modulus.io
//mongoose.connect('mongodb://node:nodeuser@mongo.onmodulus.net:27017/uwO3mypu');


app.use(express.static(__dirname + '/public'));                 // set the static files location /public/img will be /img for users
app.use(morgan('dev'));                                         // log every request to the console
app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride());

// define model =================
var Todo = mongoose.model('Todo', {
    text : String,
    complete: { type: Boolean, default: false }
});

// routes ======================================================================

// api ---------------------------------------------------------------------
// get all todos
app.get('/api/todos', function(req, res) {

    // use mongoose to get all todos in the database
    Todo.find(function(err, todos) {

        // if there is an error retrieving, send the error. nothing after res.send(err) will execute
        if (err)
            res.send(err)

        res.json(todos); // return all todos in JSON format
    });
});

// create todo and send back all todos after creation
app.post('/api/todos/create', function(req, res) {
    console.log(req.body)
    // create a todo, information comes from AJAX request from Angular
    Todo.create({
        text : req.body.text,
        complete : false
    }, function(err, todo) {
        if (err)
            return res.send(err);
        res.send(todo)
    });

});

//complete a todo
app.post('/api/todos/update', function(req, res) {
    console.log(req.body)
    Todo.findById(req.body._id, function(err, todo) {
        todo.complete = req.body.complete
        todo.text = req.body.text
        todo.save(function (err, todo) {
            if (err) return console.error(err)
            res.send(todo);
        });
    });
});

// delete a todo
app.delete('/api/todos/delete/:todo_id', function(req, res) {
    Todo.remove({
        _id : req.params.todo_id
    }, function(err, todo) {
        if (err)
            res.send(err);
    });
});

// application -------------------------------------------------------------
app.get('*', function(req, res) {
    res.sendfile('./public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
});

// listen (start app with node server.js) ======================================
app.listen(8080);
console.log("App listening on port 8080");
