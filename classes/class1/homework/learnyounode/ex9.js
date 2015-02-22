var http = require('http');
var val1 = '';
var val2 = '';
var val3 = '';
var finished = 0;

http.get(process.argv[2], function(response) {
  values = '';
  response.on('data', function(data) {
    val1 += data;
  });
  response.on('end', function() {
    finished += 1;
    if(finished === 3) {
      console.log(val1);
      console.log(val2);
      console.log(val3);
    }
  });
});

http.get(process.argv[3], function(response) {
  values = '';
  response.on('data', function(data) {
    val2 += data;
  });
  response.on('end', function() {
    finished += 1;
    if(finished === 3) {
      console.log(val1);
      console.log(val2);
      console.log(val3);
    }
  });
});

http.get(process.argv[4], function(response) {
  values = '';
  response.on('data', function(data) {
    val3 += data;
  });
  response.on('end', function() {
    finished += 1;
    if(finished === 3) {
      console.log(val1);
      console.log(val2);
      console.log(val3);
    }
  });
});
