var net = require('net');

var server = net.createServer(function callback(socket) {
	// date = new Date().toISOString().
	// replace(/T/, ' ').
	// replace(/\..+/, '');

	date = new Date()

	currentTime = date.getFullYear() + '-' +date.getMonth()+1 + '-' + date.getDate() + ' ' + 
		date.getHours() + ':' + date.getMinutes() + '\n';
	// console.log(date.substring(0, date.length-3));

	socket.end(currentTime);
})

server.listen(process.argv[2]);