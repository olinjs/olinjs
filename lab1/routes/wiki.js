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
	pagedb.find({title:req.body.title},function(err, pages) {
		console.log(pages);
		if (pages.length > 0){

			// Edit existing entry
			var existing_page = pages[0];
			existing_page.title = new_page.title;
			existing_page.content = new_page.content;
			existing_page.author = new_page.author;
			existing_page.timestamp = new_page.timestamp;

			existing_page.save( function(err) {
				if (err) {
					console.log("Problem adding new pages", err);
				} else {
					console.log("Edited successfully");
					res.json("New Page Added");
				}
			});
		} else {

			// Add new entry
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
			res.json({"title": page.title, "content": page.content});
		}
	});

};


wiki.deletepage = function(req, res){
	var pageid = req.params.id;
	pagedb.find({_id:pageid }).remove().exec();
	res.json("Page Deleted");
};

module.exports = wiki;