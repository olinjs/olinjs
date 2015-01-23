var fs = require('fs')
module.exports = function (path,ext,cb) {
	function filterlist (err,list){
		if (err){
			return cb(err,null);
		}
		cb(null,list.filter(function(file){
			return file.slice(-3) === '.'+ext;
		}));
	}
	fs.readdir(path,filterlist);
}
