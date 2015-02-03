var net = require('net')
var strftime = require('strftime')

var server = net.createServer(function (socket) {
	var date = strftime('%F %H:%M') + '\n'
	socket.end(date)
})

server.listen(process.argv[2])