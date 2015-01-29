var home = function(req, res){
  res.render("home", {"classes": [
    "/cats: List of all of your cats",
    "/cats/new: Find a new cat",
    "/cats/<color>: Lists all of your cats which have <color> coloring.",
    "/cats/delete/old: Your oldest cat dies.",
    "/cats/catmageddon: All of your cats die."]
  });
};


module.exports.home = home;
