var routes = {};
var User = require('../models/user');

routes.loginRender = function(req,res){
	//Renders the login page
	res.render('login');
};

routes.loginPost = function(req,res){
	//handles the login request
	var usersName = req.body.username;
	if (req.session.user){
			res.send('error')
	} else {
		User.findOne({username: usersName}, function(error, user){
			if(error){
				console.log(error);
			};
			if(user == ''){
				var newUser = new User({username: usersName, twits: []});
				req.session.user = usersName;
				res.send(usersName);
			} else {
				req.session.user = user.username;
				res.send(user.username)
			};
		});
	}
};

module.exports = routes;
