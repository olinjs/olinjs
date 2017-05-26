var fs = require('fs');
var path = require('path');
fs.readdir(process.argv[2], function callback (err, list){
	if (err){
		console.log('error');
	}else{
		var filtered = list.filter(function (x){
			return path.extname(x) == ('.' + process.argv[3])
		});
		for(var i = 0; i < filtered.length; i++){
			console.log(filtered[i]);
		}
	}
})
