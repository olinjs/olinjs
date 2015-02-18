var fs = require('fs')
var path = require('path')
function findExts(p, ext, callback){
	var ar = fs.readdir(p, function findFiles(err, list){
		if (err)
			return callback(err)
		var str = '.' + ext;
		var array = new Array();
		for (var i = 0; i < list.length; i++){
			if (path.extname(list[i]) == str){
				array.push(list[i])
			}
		}
		callback(null, array)
		return array
	})
}

module.exports = findExts