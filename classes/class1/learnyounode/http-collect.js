var http = require('http');
var bl = require('bl');
var url = process.argv[2];
var thisLine = "";

mybuffman = new bl(function (err, buff) {
	//buff.
	console.log(buff.length);
	console.log(buff.toString());
});

http.get(url, function (response) {
	response.pipe( mybuffman ); 
	//mybuffman.append(response);
});
