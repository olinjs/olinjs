var http = require('http');

http.get(process.argv[2], function (response) {
	response.setEncoding('utf8');

	// When all goes well
	response.on('data', function (chunk) {
		console.log(chunk);
	});

	// Error Handling
	response.on('error', function (error) {
		return console.error('An error has occured in the reponse: ', error);
	});
}).on('error', function (error) {
	return console.error('An error has occurred with the request: ', error);
});