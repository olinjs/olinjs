var express = require('express');
var router = express.Router();
var wiki = {};

var pagedb = require('../public/models/models.js').pageModel;

// get all the pages created
wiki.getpages = function(req, res){
	var pagelist = [];
	pagedb.find({}, function(err, pages) {
		console.log("Sent Pages");
		var pages_nocontent = [];
		for (i = 0; i < pages.length; i++) {
			pages_nocontent.push({
				"title": pages[i].title,
				"author": pages[i].author,
				"timestamp": pages[i].timestamp,
				"_id": pages[i]._id
			});
		}
		res.json(pages_nocontent);
	});
};


wiki.addpage = function(req, res){
	console.log("Adding Page");
	var new_page = new pagedb(req.body);
	console.log(new_page);
	pagedb.find({_id:req.params.id},function(err, pages) {
		console.log(pages);
		if (pages.length > 0){
			console.log("Found existing entry");
			pages[0].title = new_page.title;
			pages[0].content = new_page.content;
			pages[0].author = new_page.author;
			pages[0].timestamp = new_page.timestamp;
			res.json("New Page Added");
		} else {
			console.log("Saving new entry");
			console.log(new_page);
			new_page.save(function(err) {
				if (err) {
					console.log("Problem adding new pages", err);
				} else {
					console.log("Added successfully");
					res.json("New Page Added");
				}
			});
		}
	});
};




wiki.getcontent = function(req, res){
	var pageid = req.params.id;
	pagedb.findById(pageid, function (err, page) {
		if (err) {
			console.log("Problem finding page content", err);
		} else {
			res.json(page.content);
		}
	});

};


wiki.deletepage = function(req, res){
	
	var pageid = req.params.id;
	pagedb.find({ id:pageid }).remove().exec();
	res.json("Page Deleted");
};

module.exports = wiki;