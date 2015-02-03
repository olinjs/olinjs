var http = require('http');
var buf;
var str;

http.get(process.argv[2], function(res) {
  	res.on('data', function(data) {
  	buf = data;
  	str = buf.toString();
  	console.log(str);
});
});