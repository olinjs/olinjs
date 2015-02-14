var routes = {};
var User = require('../models/user');

routes.homeRender = function(req,res){
	//renders the home res.
	//page.render('home')
	User.find({},function(err,users){
		var twits = [];
		for(var i=0;i<users.length;i++){
			var twitArray = users[i].twits;
			for (var j= 0; j<twitArray.length;j++){
				twits.pop(twitArray[j]);
			};
		};
		twits.sort(function(a,b){
			var diff = a.timeMade - b.timeMade;
			return diff
		})
		res.render('home',{'twit': twits, 'user': users});
	});
};

routes.postTwit = function(req,res){
	//Handles the new twit form
	if(req.session.username){
		var out = ({ 
			text: req.body.text,
			username: req.session.username
		}); 
		res.send(out);
	} else {
		res.send('')
	};
};

module.exports = routes;