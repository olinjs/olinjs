var routes = {};

routes.getCatGET = function(req, res) {
  console.log(req.query);
  res.end(".");
};

routes.getCatPOST = function(req, res) {
  console.log(req.body);
  res.end(".");
};

module.exports = routes;