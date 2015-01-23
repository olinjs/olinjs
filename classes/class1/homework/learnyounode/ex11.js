var http = require('http');
var fs = require('fs');

var port = process.argv[2];
var file = process.argv[3];

var server = http.createServer(function(request, response) {
  var readStream = fs.createReadStream(file);
  readStream.on('open', function() {
    readStream.pipe(response);
  });

  readStream.on('error', function(err) {
    response.end(err);
  });
});
server.listen(port);
