var fs = require('fs');
var path = require('path');

module.exports = function(dirName, fileExt, callback){
	fs.readdir(dirName, function (err, list){
	    if (err) {return callback(err)}
    	var newlist = [];
    	list.forEach(function(fileName){
    		if(path.extname(fileName)== fileExt)
    			newlist.push(fileName)
    	})

    	for (var i = 0; i < newlist.length; i++){
    	console.log(newlist[i]);}
        callback(err, list)
    });
    
}