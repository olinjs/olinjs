var mongoose = require('mongoose');
var users = require('../models/users');
var tvveets = require('../models/tvveets');

var mongoURI = process.env.MONGOURI || "mongodb://127.0.0.1:27017/test";
mongoose.connect(mongoURI);

var Users = mongoose.model('Users', users.usersSchema);
var Tvveets = mongoose.model('Tvveets', tvveets.tvveetsSchema);

var renderUsers = function(res, current_user){
	Users.find().exec(function (err, users){
        Tvveets.find().sort({_id: 1}).exec(function (err, tvveets){
            console.log(users);
            console.log(tvveets);
            res.render('home', {"users": users,
                                "tvveets": tvveets,
                                "current_user": current_user});
        });
    });
}

var postLogin = function(req, res){
    console.log(req.body.name);
    if(req.body.name){
        Users.findOne({name:req.body.name}).exec(function (err, user){
            if(user){
                console.log("Old User");
                current_user = user;
                renderUsers(res, current_user);
            } else{
                current_user = new Users();
                current_user.name = req.body.name;
                current_user.save(function (err){
                    if(err){
                        console.log(err);
                    } else {
                        console.log("New User!");
                        renderUsers(res, current_user);
                    }
                });
            }
        });
    }
    else{
        console.log("login failed");
    }
}

var postTvveet = function(req, res){
    tvveet = new Tvveets();
    tvveet.text = req.body.text;
    tvveet.author = req.body.author;
    tvveet.author_id = req.body.author_id;
    
    tvveet.save(function (err){
        if(err){
            console.log(err);
        } else {
            console.log("new tvveet");
            res.json({id: tvveet.id});
        }
    });
}

var deleteTvveet = function(req, res){
    console.log(req.body.id);
    Tvveets.findOne({_id:req.body.id}).remove(function (err){
        if(err){
            console.log(err);
        } else {
            res.json({status: "deleted"});
        }
    })    
}

var getHome = function(req, res){
        console.log("No Users");
        current_user = undefined;
        renderUsers(res, undefined);
}

var getLogin = function(req, res){
    console.log("Going to login page")
    res.render('login',{});
}

module.exports.getHome = getHome;
module.exports.getLogin = getLogin;
module.exports.postLogin = postLogin;
module.exports.postTvveet = postTvveet;
module.exports.deleteTvveet = deleteTvveet;
