var express = require('express');
var passport = require('passport');
var router = express.Router();

router.get('/facebook', 
	passport.authenticate('facebook'), 
	function(req, res){}
);

router.get('/facebook/callback', 
	passport.authenticate('facebook', 
	{ failureRedirect: '/' }),
	function(req, res) {
		res.redirect('/account');
		req.login();
		console.log("Authenticated");
	}
);

module.exports = router;
