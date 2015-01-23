var bl = require('bl');
var http = require('http');
var full = [];
var done = 0

function getter(ind) {
	http.get(process.argv[ind], function(response){
		response.pipe(bl(function(err,data) {
			data = data.toString();
			full[ind-2] = data;
			done++;
			if (done == 3) display()
		}));
	});
}

function display() {
	for (var i = 0; i < 3; i++) {
		console.log(full[i]);
	};
}

for (var j = 2; j < 5; j++) {
	getter(j);
}