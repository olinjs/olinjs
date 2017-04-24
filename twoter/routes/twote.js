//Be sure to comment what each route does. Good simple routes though!
var Twotes = require('../models/twoteModel.js');
var Users = require('../models/userModel.js');
var routes = {};

routes.login = function(req,res){
    res.render('login');
};

routes.twoteshome = function(req, res){
  var username = (req.session.passport.user.displayName);

  Users.count({username: username}, function(err, i){
    if (i==0){ //good use of checking if username exists
      var newUser = new Users({username:username});
      newUser.save(function(err){
        if (err){
          res.sendStatus(500); //nice!
          return;
        }
        Twotes.find(function(err,twotes){
          if (!twotes){
            res.send({"error":"no twotes"})
            return;
          }
          else {
            Users.find(function(err,users){
              if (!users){
                res.send({"error":"no users"})
                return;
              }
              else {
                res.render("home",{"newuser":[newUser], "allTwotes": twotes, "allUsers": users});
                return;
              }
            })
          }
        })
        //Remove this if not using:
        //res.send(newUser);
      })
    } else {
      Users.find({username: username},function(err,user){
        if (err){
          res.sendStatus(500);
          return;
        }
        Twotes.find(function(err,twotes){
          if (!twotes){
            res.send({"error":"no twotes"})
            return;
          }
          else {
            Users.find(function(err,users){
              if (!users){
                res.send({"error":"no users"})
                return;
              }
              else {
                console.log(user)
                res.render("home",{"newuser":[user[0]], "allTwotes": twotes, "allUsers": users});
                return;
              }
            })
          }
        })
      })
    }
  })
}

routes.addTwote = function(req, res) {
  console.log(req.body)
  var newTwote = new Twotes({text: req.body.twote, user: req.body.user, user_id: req.body.user_id, deleted: false});
  newTwote.save(function(err){
    if (err) {
      res.sendStatus(500);
      return;
    }
    else{
      Users.findOne({"username":req.body.user},function(err,user){
        user.twotes.push(newTwote._id)
        user.save(function(err){
          if (err){
            res.sendStatus(500);
            return;
          }
          res.send(newTwote);
          return;
        })
      })
    }
  })
};

routes.addUser = function(req,res){
  console.log(req.session)
  console.log(req.body)
  var sess = req.session;
  sess.username = req.body.name;

  Users.count({username: req.session.username}, function(err, i){
    if (i==0){
      var newUser = new Users({username:req.session.username});
      newUser.save(function(err){
        if (err){
          res.sendStatus(500);
          return;
        }
        //res.send(newUser);
        return;
      })
    } else {
      Users.find({username: req.session.username},function(err,user){
        if (err){
          res.sendStatus(500);
          return;
        }
        //res.send(user[0])
      })
    }
  })
}

routes.deleteTwote = function(req,res){
  console.log(req.body)
  Twotes.findById(req.body.twote_id, function(err,twote){
    twote.remove(function(err){
      if (err){
        res.sendStatus(500);
        return;
      }
      res.send(twote)
    })
  })
}

module.exports = routes;
