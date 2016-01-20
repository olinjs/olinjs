var bl = require('bl')
var http = require('http');

http.get(process.argv[2],callback);

function callback(response){
	//response.setEncoding('utf8');
	response.pipe(bl(function (err, data) { 
		var str = data.toString();
		console.log(str.length);
		console.log(str);
	}));
}