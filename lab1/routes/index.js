var path = require('path');
var express = require('express');
var router = express.Router();

var routes = {};

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { message: "WikiMVC!" });
});

routes.home = function(req, res){
	res.sendFile('main.html', { root: path.join(__dirname, '../public') });
};
module.exports = routes;