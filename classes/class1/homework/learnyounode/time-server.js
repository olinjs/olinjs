var net = require("net");

function fillZero(num, limit) {
    var numStr = num.toString();
    if (num < limit) {
        numStr = "0" + numStr;
    }

    return numStr;
}

var server = net.createServer(function callback(socket) {
    var date = new Date();
    socket.end(date.getFullYear() 
        + "-" 
        + fillZero(date.getMonth() + 1, 10) + "-" 
        + fillZero(date.getDate(), 10) + " "
        + fillZero(date.getHours(), 10) + ":"
        + fillZero(date.getMinutes(), 10) + "\n");
})

server.listen(process.argv[2]);