var http = require('http');
http.get(process.argv[2], function callback (response){
	response.setEncoding('utf8');
	response.on('data', function (data){
		console.log(data);
	})
	response.on('error', console.error)
})
