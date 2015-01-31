var home = function(req, res){
  res.render("home", {"links": [
    "/cats/new",
    "/cats",
    "/cats/bycolor/:color",
    "/cats/delete/old"
    ]
  });
};


module.exports.home = home;