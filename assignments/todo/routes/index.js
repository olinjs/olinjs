
var express  = require('express');
var router = express.Router();                             // create our app w/ express
var mongoose = require('mongoose'); 

var Todo = require('../models/todoModel.js')


// routes ======================================================================

    // api ---------------------------------------------------------------------
    // get all todos
router.get('/api/todos', function(req, res) {

  // use mongoose to get all todos in the database
  Todo.find(function(err, todos) {
    // if there is an error retrieving, send the error. nothing after res.send(err) will execute
    if (err) { res.send(err) }
    res.json(todos); // return all todos in JSON format
  });
});

// create todo and send back all todos after creation
router.post('/api/todos', function(req, res) {

  // create a todo, information comes from AJAX request from Angular
  Todo.create({
    text : req.body.text,
    done : false
  }, function(err, todo) {
    if (err) {res.send(err);}

    // get and return all the todos after you create another
    Todo.find(function(err, todos) {
      if (err) {res.send(err)} 
      res.json(todos);
    });
  });

});

//edit a todo
router.put('/api/todos/:todo_id', function(req, res) {

  // console.log(req)
  Todo.update({
    //_id: mongojs.ObjectId(req.body._id)
    _id: req.params.todo_id
  }, {
    text: req.body.text
  }, {}, function(err, todo) {
    if (err) {res.send(err);}

      // get and return all the todos after you edit
  Todo.find(function(err, todos) {
    if (err) {res.send(err); return;} 
    res.json(todos);
    });
  });

});


//complete a todo
router.post('/api/todos/:todo_id', function(req, res) {

  // console.log(req)
  Todo.update({
    //_id: mongojs.ObjectId(req.body._id)
    _id: req.params.todo_id
  }, {
    isCompleted: true
  }, {}, function(err, todo) {
    console.log('Todo completed!');
    if (err) {res.send(err);}

      // get and return all the todos after you edit
  Todo.find(function(err, todos) {
    if (err) {res.send(err); return;} 
    res.json(todos);
    });
  });

});

// delete a todo
router.delete('/api/todos/:todo_id', function(req, res) {
  Todo.remove({
      _id : req.params.todo_id
  }, function(err, todo) {
    if (err)
      res.send(err);

    // get and return all the todos after you create another
    Todo.find(function(err, todos) {
      if (err) {res.send(err)}
      res.json(todos);
    });
  });
});

router.get('*', function(req, res) {
    res.sendfile('./public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
});

module.exports = router;