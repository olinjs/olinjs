var express = require('express');
var router = express.Router();

var Todo = require('../public/models/models.js').todoModel;

// Send list of all twotes
router.get('/', function(req, res) {
	console.log("Sending all todos");
	getTodosQuery().exec(function(err, todos) {
		res.json(todos);
	});
});

// Add new twote to database
router.post('/new', function(req, res) {
	var new_todo = new Todo(req.body);
	console.log(req.body);
	new_todo.save(function(err) {
		if (err) {
			console.log("Problem adding new todo", err);
			res.json({"error": err});
		} else {
			res.json({"status": "OK"});
		}
	});
});

router.post('/:id/status/toggle', function(req, res) {
	var id = req.params.id;
	var status = req.params.status;

	Todo.find({_id:id}, function(err, todos) {
		var todo = todos[0];
		if (todo.status !== "Completed") {
			todo.status = "Completed";
		} else {
			todo.status = "In Progress";
		}
		todo.save(function(err) {
			if (err) {
				console.log(err);
			} else {
				res.json({"status": "OK"});
			}
		});
	});
});

router.delete('/delete/:id', function(req, res) {
	var id = req.params.id;
	Todo.find({_id:id}).remove(function() {
		res.json({"status": "OK"});
	});
});

//Form a query that gets all twotes in the database
function getTodosQuery() {
	return Todo.find({}, function(err) {
		if (err) {
			console.log("Problem fetching todos", err);
		}
	});
}

module.exports = router;