var routes = {};
var User = require('../models/user');

routes.profileRender = function(req,res){
	//render the Profile page
	if(!emptyObjTest(req.session.passport)){
		User.findOne({username: req.session.passport.user.displayName}, function(err,user){
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
			res.render('profile',{'twit': twits, 'login': req.session.passport.user.displayName})
		})
	} else{
		res.render('profile');
	}
};

routes.deleteTwit = function(req,res){
	// delete a twit by the user
	console.log('Delete Twit');
	User.findOne({username: req.session.passport.user.displayName}, function(err, user){
		var del = req.body.del
		console.log(del);
		for(var i = 0; i<user.twits.length; i++){
			if(user.twits[i].timeMade == del){
				user.twits[i].remove();
			}
		}
		user.save();
		res.send(del);
	})

};

routes.profilePost = function(req,res){
	//post a new twit
	if (!emptyObjTest(req.session.passport)) {
		User.findOne({username: req.session.passport.user.displayName}, function(err, user){
			var d = new Date();
			var time = d.getTime();
			var twitObj = {
				timeMade: time,
				text: req.body.text
			};
			user.twits.push(twitObj);
			user.save();
			var out = ({ 
				timeMade: time,
				text: req.body.text,
				username: req.session.passport.user.displayName
			}); 
			res.send(out);
		});
	} 
	else {
		res.send('')
	}
};

function emptyObjTest(obj){
	return Object.keys(obj).length === 0;
};

module.exports = routes;