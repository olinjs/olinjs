var fs = require('fs');
var path = process.argv[2];
var contents = fs.readFileSync(path, 'utf8');
var newlines = contents.split('\n').length - 1

console.log(newlines);
