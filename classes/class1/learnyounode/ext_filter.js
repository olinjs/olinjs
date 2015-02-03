var fs = require('fs')
var path = require('path')

module.exports = function (dir, ext, callback) {	

	var files = []

	fs.readdir(dir, function (err, list) {
		if (err) return callback(err) 
		else {
			list.forEach(function (file) {
				if (path.extname(file) === '.' + ext) 
					files.push(file)
			})
		}		
		return callback(null, files)
	})
}