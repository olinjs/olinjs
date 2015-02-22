var http = require('http');
var path = process.argv[2];

function httpGet () {
  http.get(path, function(response) {
    response.on('data', function(data) {
      console.log(data.toString());
    });
  });
}

httpGet();
