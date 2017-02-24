var express = require('express');
var Todo = require("../models/todoModel")

// returns the To Do List with all elements
var routes = {};

routes.home = function(req, res, next) {
	Todo.find({}).sort({time: -1}).exec(function (err, todos) {
		if (err) {
			console.error(err);
		} else if (todos) {
			var data = {todos:todos};
			res.json(data);
		} else {
			var data = {todos: []};
			res.json(data);
		}
	});
}

routes.add = function(req, res, next) {
	Todo.create({task: req.body.task, time: req.body.time, status: 'active'}, function (err, todo) {
		if (err) {
			console.error(err);
		} else {
			todo.save();
			var data = todo;
			res.json({data: data});
		}
	});
}

routes.changeStatus = function(req, res) {
	Todo.findByIdAndUpdate(req.body.id, {$set: {status: req.body.status}}, {new: true}, function (err, todo) {
		if (err) {
			console.error(err);
		}
		console.log(todo);
		res.json(todo);
	});
}

routes.edit = function(req, res, next) {
	Todo.findByIdAndUpdate(req.body.id, {$set: {task: req.body.task}}, {new: true}, function (err, todo) {
		if (err) {
			console.error(err);
		}
		console.log(todo);
		res.json(todo);
	});
}

routes.remove = function(req, res, next) {
	Todo.findOne({_id: req.body.id}).exec(function(err, todo) {
		if (err) {
			console.error(err);
		} else {
			data = todo;
			todo.remove();
			res.json({data: data});
		}
	});
}

module.exports = routes;
