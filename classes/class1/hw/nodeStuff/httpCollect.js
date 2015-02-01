var http = require('http');
var bl = require('bl');
http.get(process.argv[2], function callback (response){
	response.setEncoding('utf8');
	response.pipe(bl(function (err, data){
		if(err)
			console.error;
		else{
		console.log(data.toString().length)
		console.log(data.toString())
	}
	}))
	// response.on('data', function (data){
	// 	console.log(data);
	// })
})

