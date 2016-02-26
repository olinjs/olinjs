
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var wiki = {};

var pagedb = require('../models/pagemodel.js');

// get all the pages created
wiki.getlink = function(req, res){
	return pagedb.find({}, function(err) {
		if (err) {
			console.log("Problem fetching twotes", err);
		}
	});

};


wiki.addlink = function(req, res){
	var new_page = new pagedb(req.body);
	new_page.save(function(err) {
		if (err) {
			console.log("Problem adding new twote", err);
		}
	});

};


wiki.editlink = function(req, res){
	

};

