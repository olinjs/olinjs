var home = function(req, res){
  res.render("home", {"classes": [
  {teacher: "Alan", title: "POE"},
  {teacher: "Rehana", title: "Discrete"},
  {teacher: "Some ppl", title: "UOCD"},
  {teacher: "Cool cats", title: "olin.js"}]
});
};

module.exports.home = home;