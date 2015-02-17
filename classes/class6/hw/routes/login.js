var routes = {};
var User = require('../models/user');

routes.loginRender = function(req,res){
	//Renders the login page
	res.render('login');
};

routes.loginPost = function(req,res){
	//handles the login request
	console.log(req.body);
	var usersName = req.body.username;
	console.log(usersName);
	console.log(req.session.username);
	if (!emptyObjTest(req.session.passport)){
			res.send('error')
	} else {
		User.findOne({username: usersName}, function(error, user){
			if(error){
				console.log(error);
			};
			if(user){
				console.log('Returning User', user)
				req.session.username = user.username;
				res.send(user.username)
			} else {
				console.log('New User', user)
				var newUser = new User({username: usersName, twits: []});
				newUser.save();
				req.session.username = usersName;
				res.send(usersName);
			};
		});
	}
};

function emptyObjTest(obj){
	return Object.keys(obj).length === 0;
};

module.exports = routes;
