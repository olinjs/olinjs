var fs = require('fs')

var buf = fs.readFileSync(process.argv[2]);
var str = buf.toString();

console.log(str.split('\n').length - 1);