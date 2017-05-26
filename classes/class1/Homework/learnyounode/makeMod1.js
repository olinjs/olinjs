var fs = require ('fs');  //gets full fs module in variable called fs
var returnList =[];

module.exports = function (dir, ext, callback){fs.readdir (dir,function (err, list) {
		if (err) return callback (err);
		for (var item = 0; item <list.length; item++) {
			var fileSplit = list[item].split(".");
			if (fileSplit[1] === ext) {
				returnList.push(list[item]);
			}
		}
		callback (null,returnList);
	} 
)}