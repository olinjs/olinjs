var express = require('express');
var async = require('async');
var User = require('../models/userModel.js');
var Twote = require('../models/twoteModel.js');
var router = express.Router();

module.exports = router;

var homeGET = function(req, res) {
	console.log(req.user)
	async.series([
		function(callback) {
			if (req.user) {
				User.findById(req.user._id, function(err, user) {
					callback(null,user);
				}) 
			} else {
				callback(null,null);
			}
		},
		function(callback) {
			User.find({}).populate('twotes').exec( function(err, users) {
				callback(null,users);
			}) 
		},
		function(callback) {
			Twote.find({}).populate('user').exec( function(err, twotes) {
				callback(null,twotes);
			}) 
		}
		], function(error, results) {
			var user = results[0];
			var users = results[1];
			var twotes = results[2];
			var userName = user ? user.name : null
			var userId = user ? user._id : null
			twotes = twotes.map(function(twote) {
				twote = twote.toObject();
				twote.currentUser = (String(twote.user._id) === String(userId));
				return twote;
			})

			res.render("homeView", {"currentUserName": userName, "currentUserId": userId,"twotes": twotes, "users": users});

		}
	);

}

var newTwotePOST = function(req, res) {
	var newTwote = Twote({"text": req.body.text ,"user": req.body.user})
	newTwote.save(function (err, newTwote) {
				if (err) return console.error(err)
					newTwote.populate('user',function(err) {
						res.send(newTwote)
					})
					
			});
	User.findById(req.body.user, function(err, user) {
		user.twotes.push(newTwote._id)
		user.save(function (err, user) {
			if (err) return console.error(err)
		});
	})
}



var deleteTwotePOST = function(req, res) {

	Twote.findById(req.body.twoteId, function(err, twote) {
		twote.remove();
		res.send(twote);
	}); 
}

var loginGET = function(req, res) {
	res.render("loginView", {error: req.flash('error')});
}


module.exports.home = homeGET;
module.exports.login = loginGET;
module.exports.newTwote = newTwotePOST
module.exports.deleteTwote = deleteTwotePOST