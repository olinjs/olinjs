var exec = require('child_process').exec;
var querystring = require('querystring');

function start(res, post_data) {
	console.log('START!');

	var body = '<html>'+
	'<head>'+
	'<meta http-equiv="Content-Type" content="text/html;'+
	'charset=UTF-8" />'+
	'</head>'+
	'<body>'+
	'<form action="/upload" method="post">'+
	'<textarea name="text" rows="20" cols="60"></textarea>'+
	'<input type="submit" value="Submit text" />'+
	'</form>'+
	'</body>'+
	'</html>';

	res.writeHead(200, {'Content-Type': 'text/html'});
	res.end(body);
}

function upload(res, post_data) {
	console.log('UPLOAD!');
	res.writeHead(200, {'Content-Type': 'text/plain'});
	res.end('You have upload:' + querystring.parse(post_data).text);
}

exports.start = start;
exports.upload = upload;