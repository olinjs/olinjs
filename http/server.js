var http = require('http');
var url = require('url');

function start(route, handle){

	http.createServer(function (req, res){
		var pathname = url.parse(req.url).pathname;
		var post_data = '';

		req.setEncoding('utf8');

		req.addListener('data', function(chunk){
			post_data += chunk;
			console.log('Received POST data chunk ' + 
			chunk + '.');
		});

		req.addListener('end', function(){
			route(handle, pathname, res, post_data);			
		});
	}).listen(8888);

	console.log('Request Received');
};

exports.start = start;
