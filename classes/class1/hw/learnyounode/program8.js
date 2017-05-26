var http = require('http');
var concatStream = require('concat-stream');
var url = process.argv[2];

var counter = 0;

http.get(url, function (responce){

	responce.setEncoding('utf8');

	responce.pipe(concatStream(function	(data){
		var stringData = data.toString();
		console.log(stringData.length);
		console.log(stringData);
	}))
})