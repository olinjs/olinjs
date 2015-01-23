var http = require('http');
var url = process.argv[2];

http.get(url, function (responce){

	responce.setEncoding('utf8');
	
	responce.on('data',function (data){
		console.log(data);
	})

	responce.on('error', console.error);
})