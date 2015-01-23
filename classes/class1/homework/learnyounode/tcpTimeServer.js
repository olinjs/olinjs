/*
Write a TCP time server!

Your server should listen to TCP connections on the port provided by the first argument to your program. For each connection you must write the current date & 24 hour time in the format:

    "YYYY-MM-DD hh:mm"

followed by a newline character. Month, day, hour and minute must be zero-filled to 2 integers. For example:

    "2013-07-06 17:42"

*/

var net = require('net');

function pad(inp)
{
	var out = inp.toString();
	if (inp<10)
	{
		out = "0"+inp;
	}
	return out;
}

var server = net.createServer(function(socket){
	//socket handling logic
	date = new Date();
	daRealTime = date.getFullYear() + "-"
	+ pad(date.getMonth() + 1)+ "-"
	+ pad(date.getDate()) + " "
    + pad(date.getHours()) + ":"
    + pad(date.getMinutes()) + "\n";

	socket.end(daRealTime);
});
server.listen(process.argv[2]);

/*
//they used some cool syntax
    function zeroFill(i) {
      return (i < 10 ? '0' : '') + i
    }

*/