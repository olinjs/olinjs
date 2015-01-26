var http = require('http');
var bl = require('bl');

var url = process.argv[2];
var callback = function (response) {

	response.setEncoding('utf8');


	// respone.on("error", function (error) {
	// });

	response.on("data", function (data) {
		console.log(data);

	});

	// respone.on("end", function (end) {
	// });

}

http.get(url, callback);