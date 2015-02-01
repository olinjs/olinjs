var path = require('path');

var routes = {};

var getCatImage = function(catParams) {
  var imageLocation;
  switch (catParams.mood) {
    case "happy":
      imageLocation = path.join(__dirname,"../public/images/cat.jpg");
      break;
    case "grumpy":
      imageLocation = path.join(__dirname, "../public/images/grumpy.jpeg");
      break;
  }
  return imageLocation;
}

routes.getCatGET = function(req, res) {
  console.log(req.query);
  res.sendFile(getCatImage(req.query));
};

routes.getCatPOST = function(req, res) {
  console.log(req.body);
  res.sendFile(getCatImage(req.body));
};

module.exports = routes;