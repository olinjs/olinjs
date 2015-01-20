var fs = require('fs');
var path = process.argv[2];

var fileString = fs.readFileSync(path, 'utf-8');

console.log(fileString.split('\n').length - 1);