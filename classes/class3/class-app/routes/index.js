var schema = require('../db/schema');

module.exports.home = function (req, res) {
    res.render("home", {"classes": [
      "Olin.js",
      "SCOPE",
      "Documentary Film Making",
      "Drawing",
      "PDE"]
    });
};

module.exports.addUser = function (req, res) {
    var bob = new schema.User({name: 'bob', grade: 'A', class: '2013'});
    bob.save(function (err) {
      if (err) {
        console.log("Problem saving bob", err);
        res.send("Failed to add bob");
      } else {
        res.send("Added Bob!");
      }
    });
}