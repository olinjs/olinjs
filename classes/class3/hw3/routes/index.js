
var home = function(req, res){
  // res.render('home');
  res.render("home", {"classes": [
  "Links available below for Cats homework ",
  "/cats",
  "/cats/new",
  "/cats/bycolor/:color",
  "/cats/delete/old"]
});
};

module.exports.home = home;