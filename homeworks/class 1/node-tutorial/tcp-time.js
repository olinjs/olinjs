var net = require('net');
var st = require('strftime');

var server = net.createServer(function (socket){
	socket.end(st('%Y-%m-%d %H:%M') + '\n');
});

server.listen( +process.argv[2]);