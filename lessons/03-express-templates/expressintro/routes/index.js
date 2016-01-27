var home = function(req, res){
  res.render("home", {"classes": [
     {name:"Olin.js", teacher:"Me"},
     {name:"Data Science", teacher:"Paul"},
     {name:"SCOPE", teacher:"Paul"}]
  });
};

module.exports.home = home;
