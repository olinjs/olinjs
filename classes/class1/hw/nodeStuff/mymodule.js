var fs = require('fs');
var path = require('path');
module.exports = function (dirName, extensionF, callback){

fs.readdir(dirName, function (err, list){
	if (err){
		return callback(err);
	}else{
		var filtered = list.filter(function (x){
			return path.extname(x) == ('.' + extensionF)
		});
		callback(null, filtered);
	}
})
}
