var routes = {};
var User = require('../models/user');

routes.homeRender = function(req,res){
	//renders the home res.
	//page.render('home')
	User.find({},function(err,users){
		var twits = [];
		console.log(users.length);
		for(var i=0;i<users.length;i++){
			var twitArray = users[i].twits;
			for (var j= 0; j<twitArray.length;j++){
				var twit = {
					timeMade: twitArray[j].timeMade,
					text: twitArray[j].text,
					author: users[i].username
				}
				twits.push(twit);
			};
		};
		console.log(twits);

		twits.sort(function(a, b){
			return Number(b.timeMade) - Number(a.timeMade); 
		})
		// var userList = users.map(function(val){
		// 	return val.username;
		// });
		console.log(req.session.passport);
		if(!emptyObjTest(req.session.passport)){
			res.render('home', {'twit': twits, 'user': users, 'login': req.session.passport.user.displayName});
		} else {
			console.log(twits);
			res.render('home', {'twit': twits, 'user': users});
		}	
	});
};

function emptyObjTest(obj){
	return Object.keys(obj).length === 0;
}

routes.postTwit = function(req,res){
	//Handles the new twit form
	if(!emptyObjTest(req.session.passport)){
		User.findOne({username: req.session.passport.user.displayName}, function(err, user){
			var d = new Date();
			var time = d.getTime();
			var twitObj = {
				timeMade: time,
				text: req.body.text
			}
			console.log(twitObj);
			user.twits.push(twitObj);
			user.save();
			console.log(user.twits);
			var out = ({ 
				text: req.body.text,
				username: req.session.passport.user.displayName
			}); 
			res.send(out);
		})	
	} else {
		res.send('')
	};
};

routes.logoutUser = function(req,res){
	User.find({},function(err,users){
		req.session.passport = {};
		var twits = [];
		console.log(users.length);
		for(var i=0;i<users.length;i++){
			var twitArray = users[i].twits;
			for (var j= 0; j<twitArray.length;j++){
				var twit = {
					timeMade: twitArray[j].timeMade,
					text: twitArray[j].text,
					author: users[i].username
				}
				twits.push(twit);
			};
		};
		console.log(twits);

		twits.sort(function(a, b){
			return Number(b.timeMade) - Number(a.timeMade); 
		})
		// var userList = users.map(function(val){
		// 	return val.username;
		// });
		res.send('logout');
	});
};

module.exports = routes;