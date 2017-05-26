var net = require ('net');
d = new Date ();
var server = net.createServer (function (socket) {
	year = d.getFullYear();
	month = form (d.getMonth()+1);
	day = form (d.getDate());
	hours = form (d.getHours());
	minutes = form (d.getMinutes());

	socket.end(year +'-'+month+'-'+day+ ' ' + hours +':' +minutes +'\n');
})

server.listen(process.argv[2]);

function form (n) {
	if (n<10) {
		return '0'+n;
	}
	return n;
}