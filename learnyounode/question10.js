var net = require('net');
var time = new Date();
var str = time.getFullYear() + '-' + time.getMonth() + '1-' + time.getDate() + ' ' + time.getHours() + ':' + time.getMinutes() + '\n';


var server = net.createServer(function (socket){
	socket.write(str);
	socket.end();
});
server.listen(process.argv[2]);