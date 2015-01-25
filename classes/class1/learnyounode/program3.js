var fs = require('fs');
var buf = fs.readFileSync(process.argv[2]);
var fileStr = buf.toString();
var lineArr = fileStr.split('\n');
console.log(lineArr.length-1);