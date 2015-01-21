var fs = require('fs');
var lines = 0;

function linesNum (callback) {
  fs.readFile(process.argv[2], 'utf8', function doneReading (err, fileContents) {
    if (err) {
      throw err;
    }
    lines = fileContents.split('\n').length - 1;
    callback();
  })
}

function logMyString() {
  console.log(lines);
}

linesNum (logMyString);
