var net = require('net');

function dater () {
	var date = new Date();
	return date.getFullYear() + '-' + zee(date.getMonth()+1) + '-' + zee(date.getDate()) + ' ' + zee(date.getHours()) + ':' + zee(date.getMinutes())
}

function zee (val) {
	if (String(val).length != 2) return '0' + val
	return val
}

var server = net.createServer(function (socket) {
	socket.end(dater()+'\n');
}).listen(process.argv[2]);