var net = require('net');
function date () {
	var today = new Date();
	var dd = today.getDate();
	var mm = today.getMonth()+1;
	var yyyy = today.getFullYear();
	var hh = today.getHours();
	var min = today.getMinutes();

	if (dd < 10) {
	    dd = "0" + dd;
	};

	if (mm < 10) {
	    mm = "0" + mm;
	};

	if (hh < 10) {
	    hh = "0" + hh;
	};

	if (min < 10) {
	    min = "0" + min;
	};

	today = yyyy + "-" + mm + "-" + dd + " " + hh + ":" + min + "\n";
	return today;
	};

var port = process.argv[2];
var server = net.createServer(function (socket){
	socket.end(date());
})
server.listen(port);