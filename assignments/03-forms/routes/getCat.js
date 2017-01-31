// var routes = {};

// routes.getCatGET = function(req, res) {
//   console.log(req.query);
//   res.end(".");
// };

// routes.getCatPOST = function(req, res) {
//   console.log(req.body);
//   res.end(".");
// };

// module.exports = routes;

//SECOND FORM
// var path = require('path');

// var routes = {};

// var getCatImage = function(catParams) {
//   var imageLocation;
//   switch (catParams.mood) {
//     case "happy":
//       imageLocation = path.join(__dirname,"../public/images/cat.jpg");
//       break;
//     case "grumpy":
//       imageLocation = path.join(__dirname, "../public/images/grumpy.jpg");
//       break;
//   }
//   return imageLocation;
// }

// routes.getCatGET = function(req, res) {
//   console.log(req.query);
//   res.sendFile(getCatImage(req.query));
// };

// routes.getCatPOST = function(req, res) {
//   console.log(req.body);
//   res.sendFile(getCatImage(req.body));
// };

// module.exports = routes;

//THIRD FORM
var path = require('path');

var routes = {};

var getCatImage = function(catParams, absolute) {
  var imageLocation;
  var happyCat = "images/cat.jpg";
  var grumpyCat = "images/grumpy.jpg";
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