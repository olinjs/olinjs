var http = require('http');

http.get(process.argv[2], function(response) {
  values = '';
  response.on('data', function(data) {
    values += data;
  });
  response.on('end', function() {
    console.log(values.length);
    console.log(values);
  });
});
