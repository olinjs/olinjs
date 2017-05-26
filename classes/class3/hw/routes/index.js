var home = function(req, res){
  res.render("home",{"cats":'Choose your path, friend.'});
};

module.exports.home = home;