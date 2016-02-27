var path = require('path');
var express = require('express');
var router = express.Router();

var routes = {};

routes.home = function(req, res){
	res.sendFile('main.html', { root: path.join(__dirname, '../public') });
};
module.exports = routes;