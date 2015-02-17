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
		if(req.session.username){
			console.log(twits);
			res.render('home', {'twit': twits, 'user': users, 'login': req.session.username});
		} else {
			console.log(twits);
			res.render('home', {'twit': twits, 'user': users});
		}	
	});
};


routes.postTwit = function(req,res){
	//Handles the new twit form
	if(req.session.username){
		User.findOne({username: req.session.username}, function(err, user){
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
				username: req.session.username
			}); 
			res.send(out);
		})	
	} else {
		res.send('')
	};
};

routes.logoutUser = function(req,res){
	User.find({},function(err,users){
		req.session.username = '';
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