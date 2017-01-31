var bl = require('bl')
var http = require('http');

var responses = [false,false,false];

http.get(process.argv[2],callback1);
http.get(process.argv[3],callback2);
http.get(process.argv[4],callback3);

function callback1(response) {
	callback(0,response);
}

function callback2(response) {
	callback(1,response);
}

function callback3(response) {
	callback(2,response);
}

function callback(num,response){
	//response.setEncoding('utf8');
	response.pipe(bl(function (err, data) { 
		var str = data.toString();
		responses[num] = str;
		if (responses[0] && responses[1] && responses[2]) {
			console.log(responses[0]);
			console.log(responses[1]);
			console.log(responses[2]);
		}
	}));
}