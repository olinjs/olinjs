var fs = require('fs');
var path = require('path');
var mymodule = require('./module.js');
fileExt = '.'+ process.argv[3] 
mymodule(process.argv[2], fileExt, function(err, list){
	callback(null, list, callback)})
