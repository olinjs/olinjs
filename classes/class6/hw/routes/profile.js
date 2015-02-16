var routes = {};
var User = require('../models/user');

routes.profileRender = function(req,res){
	//render the Profile page
	if(req.session.username){
		User.findOne({username: req.session.username}, function(err,user){
			var twits = [];
			var twitArray = user.twits
			for(var i=0; i<twitArray.length;i++){
				twits.push({
					timeMade: twitArray[i].timeMade,
					text: twitArray[i].text,
				});
			}
			twits.sort(function(a,b){
				var diff = a.timeMade - b.timeMade;
				return diff;
			});
			res.render('profile',{'twit': twits, 'login': req.session.username})
		})
	} else{
		res.render('profile');
	}
};

routes.deleteTwit = function(req,res){
	// delete a twit by the user

};

routes.profilePost = function(req,res){
	//post a new twit
	if(req.session.username){
		User.findOne({username: req.session.username}, function(err, user){
			var d = new Date();
			var time = d.getTime();
			var twitObj = {
				timeMade: time,
				text: req.body.text
			};
			user.twits.push(twitObj);
			user.save();
			var out = ({ 
				text: req.body.text,
				username: req.session.username
			}); 
			res.send(out);
	}else{
		res.send('')
	}
};

module.exports = routes;