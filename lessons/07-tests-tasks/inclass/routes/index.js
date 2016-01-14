module.exports.home = function(req, res){
  res.render("home", {"links": [
    "/cats/new",
    "/cats",
    "/cats/delete/old",
    "/cats/bycolor/blue",
    "/cats/bycolor/green",
    "/cats/bycolor/orange"
    ]
  });
};
