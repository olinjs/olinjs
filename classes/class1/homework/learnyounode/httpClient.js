/*
Write a program that performs an HTTP GET request 
to a URL provided to you as the first command-line 
argument. Write the String contents of each "data" 
event from the response to a new line on the console 
(stdout).
*/

var http = require('http');

function httpGet(url){

	http.get(url, function (response){
		response.setEncoding('utf8');
		response.on("data", function(data){
			console.log(data);
		})
		//response.on('data', console.log);
		response.on("error", console.error);

	})
}

httpGet(process.argv[2]);
