//the callback should be in the program.js file where where
//we do the printing
var fs = require('fs');
var path = require('path');
module.exports = function filterTheFiles (dirName, extension, callback) {

	// var files = undefined;

	
		var fileNames = undefined;
		fs.readdir(dirName, doneGettingFileNames);
		function doneGettingFileNames(err, list)
		{
			if(err) return callback(err);
			fileNames = list;
			filterExtension(fileNames, extension);
		}	


	function filterExtension(files, ext){
		var filtered = undefined;
		ext = "."+ext;

			filtered = files.filter(function rightExt(file){
				return path.extname(file) === ext;
			});
		
		err = null;
		callback(err, filtered);

	}
};



//they have a more elegant soln
/*
    var fs = require('fs')
    var path = require('path')
    
    module.exports = function (dir, filterStr, callback) {
    
      fs.readdir(dir, function (err, list) {
        if (err)
          return callback(err)
    
        list = list.filter(function (file) {
          return path.extname(file) === '.' + filterStr
        })
    
        callback(null, list)
      })
    }

*/