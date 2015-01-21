var http = require('http');

function request (url, id, callback) {
	http.get(url, function (response) {
		var collated_response = "";

		response.setEncoding('utf8');

		// Add data to the collated response
		response.on('data', function (chunk) {
			collated_response += chunk;
		});

		// Error Handling
		response.on('error', function (error) {
			return console.error('An error has occured in the reponse: ', error);
		});

		response.on('end', function () {
			callback(collated_response, id);
		});

	}).on('error', function (error) {
		return console.error('An error has occurred with the request: ', error);
	});
}

var Registrar = {
	id: 0,
	id_list: {},
	response_list: {},

	request: function (path) {
		this.id_list[this.id] = true;
		request(path, this.id, recordResponse);
		this.id ++;
	}	
};

function recordResponse (response, id) {
	// Remove id from id_list
	delete Registrar.id_list[id];
	Registrar.response_list[id] = response;

	if (Object.keys(Registrar.id_list).length === 0) {
		for (var i = 0; i < Registrar.id; i++) {
			console.log(Registrar.response_list[i]);
		}
	}
}

for (var i = 2; i < process.argv.length; i++)
	Registrar.request(process.argv[i]);
