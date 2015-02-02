var net = require('net');
var port = process.argv[2];
var full_date = '';

function fixLength (day) {
	day = day.toString();
	if (day.length < 2) {
		day = '0' + day;
	}
	return day;
}

var server = net.createServer(function callback (socket) {
	var date = new Date();
	full_date = date.getFullYear().toString();
	full_date += "-" + fixLength(date.getMonth() + 1);
	full_date += "-" + fixLength(date.getDate());
	full_date += " " + fixLength(date.getHours());
	full_date += ":" + fixLength(date.getMinutes()) + '\n';
	socket.end(full_date);
});

server.listen(port);

// Official Solution

// var net = require('net')
    
// function zeroFill(i) {
//   return (i < 10 ? '0' : '') + i
// }

// function now () {
//   var d = new Date()
//   return d.getFullYear() + '-'
//     + zeroFill(d.getMonth() + 1) + '-'
//     + zeroFill(d.getDate()) + ' '
//     + zeroFill(d.getHours()) + ':'
//     + zeroFill(d.getMinutes())
// }

// var server = net.createServer(function (socket) {
//   socket.end(now() + '\n')
// })

// server.listen(Number(process.argv[2]))
