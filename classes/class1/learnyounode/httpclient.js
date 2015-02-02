http = require('http');

url = process.argv[2];

http.get(url, function (res) {
	res.setEncoding('utf8');
	res.on('data', console.log);
});