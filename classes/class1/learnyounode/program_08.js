var http = require('http');
var bl = require('bl');

var url = process.argv[2];
var callback = function (response) {

	response.setEncoding('utf8');

	response.pipe(bl(function (err, data) {
		if (err){
			return console.error(err);
		}
		console.log(data.toString().length);
		console.log(data.toString());
	}));

}

http.get(url, callback);