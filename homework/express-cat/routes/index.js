var home = function(req, res){
  res.render("home", {"classes": [
    "Olin.js",
    "other class 1",
    "other class 2",
    "other class 3"]
  });
};

var newcat = function(req, res) {
    res.render('catstat');
}

var listcats = function(req, res) {
    //read from database
    //render with data from database
}

var listclrcats = function(req, res) {
    // get cat name
    // get cat color(s)
    // get cat age
    // store in database
}

var rationalize = function(req, res) {
    // get cat name
    // get cat color(s)
    // get cat age
    // store in database
}

module.exports.home = home;
module.exports.newcat = newcat;
module.exports.listcats = listcats;
module.exports.listclrcats = listclrcats;
module.exports.rationalize = rationalize;
