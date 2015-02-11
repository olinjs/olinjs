var fs = require('fs');
var path = require('path');
module.exports = function (dir, ext, callback) {
	fs.readdir(dir, function (err, list) {
		if (err)
			return callback(err) // early return

		// ... no error, continue doing cool things with 'data'
		list = list.filter(function (fn) {
			return path.extname(fn) === '.' + ext;
		});
		
		// all went well, call callback with 'null' for the error argument
		callback(null, list);
	});
};