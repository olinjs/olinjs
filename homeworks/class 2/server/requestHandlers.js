var querystring = require("querystring");
var fs = require("fs");

exports.start = function(response, postData) {
	var content = '<html>' +
		'<head>' +
		'<meta http-equiv="Content-Type" content="text/html; '+
		'charset=UTF8"/>' +
		'</head>' +
		'<body>' +
		'<form action="/upload" method="post">' +
		'<textarea name="text" rows="20" cols="60"></textarea>' +
		'<input type="submit" value="Submit text" />' +
		'</form>' +
		'</body>' +
		'</html>';

	response.writeHead(200, {"Content-Type": "text/html"});
	response.end(content);
};

exports.upload = function(response, postData) {
	response.writeHead(200, {"Content-Type": "text/plain"});
	response.end("You sent: " + querystring.parse(postData).text);
};

exports.show = function (response, postData) {
	fs.readFile("/tmp/test.png", "binary", function (err, file) {
		if (err) {
			response.writeHead(500, {"Content-Type": "text/plain"});
			response.end(err +  "\n");
		} else {
			response.writeHead(200, {"Content-Type": "text/plain"});
			response.end(file, "binary");
		}
	});
};