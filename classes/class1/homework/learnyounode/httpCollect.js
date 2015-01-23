/*
Write a program that performs an HTTP GET request to a URL 
provided to you as the first command-line argument. 
Collect all data from the server (not just the first 
"data" event) and then write two lines to the console 
(stdout).

The first line you write should just be an integer 
representing the number of characters received from 
the server. The second line should contain the complete 
String of characters sent by the server.

*/

var bl = require('bl');
var http = require('http');

function httpCollect(url){
	http.get(url, function (response){
		//response.setEncoding('utf8');
		response.pipe(bl(function(err, data){
			data = data.toString();
			console.log(data.length);
			console.log(data);
		}));
	})
}


httpCollect(process.argv[2]);