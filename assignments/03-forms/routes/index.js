var home = function(req, res){
  //res.send("Welcome home!");
  //res.render('home');
   res.render("home", {"classes": [
        {name:"Olin.js", teacher:"A student team"},
        {name:"POE", teacher:"Aaron"},
        {name:"Signals and Systems", teacher:"Allen"},
        {name:"Markanics", teacher:"Mark"}]
   });
};

var fun = function(req, res) {
    res.send("This is so much fun!");
};

var hello = function(req, res) {
    res.send("Hello world!");
};

module.exports.home = home;
module.exports.fun = fun;
module.exports.hello = hello;