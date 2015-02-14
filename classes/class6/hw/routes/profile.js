var routes = {};

routes.profileRender = function(req,res){
	//render the Profile page
	res.render('profile');
};

routes.deleteTwit = function(req,res){
	// delete a twit by the user
};

routes.profilePost = function(req,res){
	//post a new twit
};

module.exports = routes;