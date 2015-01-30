//USED FOR HELP because I could not figure it out:
//https://github.com/rvagg/learnyounode/tree/master/exercises

var bl = require('bl');
var http = require('http');
var url = process.argv[2];

http.get(url, function(response) {
  response.setEncoding("utf8");
  response.pipe(bl(function(err,data) {
    console.log(data.length);
    console.log(data.toString());
  }))
});
