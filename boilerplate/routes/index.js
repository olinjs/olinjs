var home = function(req, res){
res.render("home", {"classes": [
     {name:"Olin.js", teacher:"Me"},
     {name:"other class 1", teacher:"A baboon"},
     {name:"other class 2", teacher:"A sentient rock"}]
   });
};

module.exports.home = home;