var net = require('net');
var dateFormat = require('dateformat');

var server = net.createServer(callback)
server.listen(process.argv[2])

function callback (socket) { 
	var now = new Date();
	var str = dateFormat(now, "yyyy-mm-dd HH:MM");

	socket.write(str);
	socket.end();
}
//"yyyy-mm-dd hh:MM"


