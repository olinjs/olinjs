var models = require('./models.js');

module.exports.login = function(req,res){
	res.render('newLogin');
}
module.exports.clear = function(req,res){
	//Allows us to wipe the database of users and twotes
	models.Users.remove({}).exec(function(err){
			if(err){res.status(500).send("Failed to add to list.")}
		});
	models.Twotes.remove({}).exec(function(err){
			if(err){res.status(500).send("Failed to add to list.")}
		});
	models.FacebookUsers.remove({}).exec(function(err){
			if(err){res.status(500).send("Failed to add to list.")}
		});
	res.send('ok');
}

module.exports.home = function(req,res){
	//Grabs all data neccessary for home page
	var items = {}

	function dbAndRender(){
		models.Twotes.find({}).exec(function(err,data){
			if(err){res.status(500).send("Failed to access list.")}
			items['twoteList']=data.reverse();
			for (var i = 0; i < items['twoteList'].length; i++){
				if (items['twoteList'][i].username == items['username']){
					items['twoteList'][i]['mine'] = true;
				}else{
					items['twoteList'][i]['mine'] = false;
				}
			}
			models.Users.find({}).exec(function(err,data){
				if(err){res.status(500).send("Failed to access list.")}
				items['userList'] = data;
				models.FacebookUsers.find({}).exec(function(err,data){
					if(err){res.status(500).send("Failed to access list.")}
					items['userList'] = items['userList'].concat(data);
					res.render('home',items);
				});
			});
		});
	}

	if(req.user){
		items['logedin'] = true
		items['username'] = req.user.username;
		items['userid'] = req.user._id;
		dbAndRender();
		
	}else{
		//From HW6 not logged in option
		items['logedin'] = false;
		dbAndRender();
	}


	
	
};

module.exports.addTwote = function(req,res){
	//Adds twote to DB, sends back twote so that _id can be used on client
	var data = {username:req.body.username,
				text:req.body.text,
				userid:req.body.userid};
	var twote = models.Twotes(data);
	twote.save(function(err,data){
		if(err){res.status(500).send("Failed to add to list.")}
		res.send(data);
	});
};

module.exports.deleteTwote = function(req,res){
	//Deletes twotes in DB
	models.Twotes
	.findByIdAndRemove(req.body.id)
	.exec(function(err,data){
		if(err){res.status(500).send("Failed to remove from list.")}
		res.send('ok')
	});
};