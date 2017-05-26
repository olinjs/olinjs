var http = require('http');
var bl = require('bl');
var array = [];

for (var i = 0; i < 3; i++){
	http.get(process.argv[2 + i], function(res){
		res.pipe(bl(function(err, data){
			array[i] = data.toString();
		}));
	});
};

for (var j = 0; j < 3; j++){
	console.log[array[j]];
};