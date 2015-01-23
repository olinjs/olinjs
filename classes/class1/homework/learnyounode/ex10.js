var net = require('net');
var server = net.createServer(function(socket) {
  date = new Date();
  data = date.getFullYear() + '-' + '0' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes();
  socket.end(data + '\n');
});
server.listen(process.argv[2]);
