var path = require('path') 
var fs = require('fs')


module.exports = function (dir, ext, callback) {
	fs.readdir(process.argv[2], callbackFS);

	function callbackFS (err, list) { 
		if (err) {
			callback(err);
		} else {
			var filteredList = [];
			for (var i = 0; i<list.length;i++) {
				if (process.argv[3] == path.extname(list[i]).substring(1)) {
					filteredList.push(list[i]);
				}
			}
			callback(err,filteredList);
		}
	} 
}
