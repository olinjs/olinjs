var fs = require('fs');
var buffer = undefined;

fs.readFile(process.argv[2],function callback(err,data) {
  buffer = data.toString();
  console.log(buffer.split('\n').length-1);
})
