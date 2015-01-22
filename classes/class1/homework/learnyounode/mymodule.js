var fs = require('fs');
var path = require('path')

module.exports = function (dir,filt,callback) {
	var ext = '.' + filt;

	fs.readdir(dir, function (err, files) {
		if (err)
			return callback(err)

		files = files.filter(function(file){
			if (ext === path.extname(file)) {
				return file
			}
		});

		callback(null,files);
	});
}