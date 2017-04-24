var path = require('path');

var routes = {};

var getCatImage = function(catParams, absolute) {
  var imageLocation;
  var happyCat = "images/cat.jpg";
  var grumpyCat = "images/grumpy.jpeg";
  switch (catParams.mood) {
    case "happy":
      imageLocation = absolute ? path.join(__dirname,"../public/", happyCat) : happyCat;
    break;
    case "grumpy":
      imageLocation = absolute ? path.join(__dirname, "../public/", grumpyCat) : grumpyCat;
    break;
  }
  return imageLocation;
}

routes.getCatGET = function(req, res) {
  if (req.xhr) {
    res.send(getCatImage(req.query));
  } else {
    res.sendFile(getCatImage(req.query, true));
  }
};

routes.getCatPOST = function(req, res) {
  res.sendFile(getCatImage(req.body, true));
};

module.exports = routes;
