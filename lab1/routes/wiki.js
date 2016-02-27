
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var wiki = {};

var pagedb = require('../models/pagemodel.js');

// get all the pages created
wiki.getpages = function(req, res){
	var pagelist = [];
	pagedb.find({}, function(err, page) {
		var title = req.body.title;
		var id = req.params.id;
		var p = "{"+ title + "," + id + "}";
		pagelist.push(p);
		if (err) {
			console.log("Problem fetching pages", err);
		}
	});
	return pagelist;
};


wiki.addpage = function(req, res){
	var new_page = new pagedb(req.body);
	pagedb.find({_id:req.params.id},function(err, page)
		if (page.length > 0){
			new_page.title = req.body.title;
			new_page.content = req.body.content;
			new_page.author = req.body.author;
		}
		new_page.save(function(err) {
		if (err) {
			console.log("Problem adding new pages", err);
			}
		});
	)
};




wiki.getcontent = function(req, res){

	var pageid = req.params.id;
	pagedb.findById(pageid, function (err, page) {
		return page.content;
	});

};


wiki.deletepage = function(req, res){
	
	var pageid = req.params.id;
	pagedb.find({ id:pageid }).remove().exec();
};