var bl = require('bl');
var http = require('http');
var urldata = [];
var count = 0;

function printData () {
  for (var i=0; i<3; i++) {
    console.log(urldata[i]);
  }
}

function httpGet (index) {
  http.get(process.argv[2 + index], function (response) {
  response.pipe(bl(function (err, data) {
    urldata[index] = data.toString();
    count++;
    if (count==3) {
      printData();
    }
  }))
 })
}

for (var i = 0; i < 3; i++) {
  httpGet(i)
}
