
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var wiki = {};

var pagedb = require('../models/pagemodel.js');

// get all the pages created
wiki.getlink = function(req, res){
	return pagedb.find({}, function(err) {
		if (err) {
			console.log("Problem fetching pages", err);
		}
	});

};


wiki.addlink = function(req, res){
	var new_page = new pagedb(req.body);
	new_page.save(function(err) {
		if (err) {
			console.log("Problem adding new pages", err);
		}
	});

};


wiki.editlink = function(req, res){
	pagedb.findById(req.body.id,function(err, page){
		if(err) throw err;
		page.content = req.body.content;
		page.title = req.body.title;
		page.author = req.body.author;

		page.save(function(err){
			if (err){
				console.log("Problem editing pages")
			}
		})
	})
};


wiki.gettitile = function(req, res){
	var pages = pagedb.find({}, function(err) {
		if (err) {
			console.log("Problem fetching page title", err);
		}
	});


};

