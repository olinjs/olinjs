var http = require('http');

http.get(process.argv[2], function (response) {
	response.setEncoding('utf8');

	var collated_response = "";

	// Collate returned data
	response.on('data', function (chunk) {
		collated_response += chunk;
	});

	// Error Handling
	response.on('error', function (error) {
		return console.error('An error has occured in the reponse: ', error);
	});

	// Output data
	response.on('end', function () {
		console.log(collated_response.length);
		console.log(collated_response);
	});

}).on('error', function (error) {
	return console.error('An error has occurred with the request: ', error);
});