//USED FOR HELP because I could not figure it out:
//https://github.com/rvagg/learnyounode/tree/master/exercises

var http = require('http');
var map = require('through2-map');

var server = http.createServer(function (req, res) {
  if (req.method != 'POST') {
    return res.end('send me a POST\n');
  }
  req.pipe(map(function(chunk) {
    return chunk.toString().toUpperCase();
  })).pipe(res);
})

server.listen(Number(process.argv[2]));
