//USED FOR HELP because I could not figure it out:
//https://github.com/rvagg/learnyounode/tree/master/exercises

var http = require('http');
var url = process.argv[2];

http.get(url, function(response) {
  response.setEncoding("utf8");
  response.on("data",function(data) {
    console.log(data);
  })
});
