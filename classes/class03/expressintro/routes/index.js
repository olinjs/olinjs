var home = function(req, res){
  res.render("home", {"classes": [
    "Olin.js",
    "other class 1",
    "other class 2",
    "other class 3"]
  });
};

module.exports.home = home;
