var net = require('net');
var port = process.argv[2];

var server = net.createServer(function (socket) {
	
	var date = new Date();
	var res = date.getFullYear() + '-' + date.getMonth()+1 + '-' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes();
	console.log(res)

    socket.end(res);
})

server.listen(port)