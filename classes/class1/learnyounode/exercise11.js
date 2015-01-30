//USED FOR HELP because I could not figure it out:
//https://github.com/rvagg/learnyounode/tree/master/exercises

var fs = require('fs');
var http = require('http');

var server = http.createServer(function (req, res) {
  res.writeHead(200, {'content-type':'text/plain'});
  fs.createReadStream(process.argv[3]).pipe(res);
})

server.listen(Number(process.argv[2]));
