var fs = require('fs');

var bufferObj = fs.readFileSync(process.argv[2]);
var str = bufferObj.toString();
var count = str.split('\n').length -1 ;
console.log(count);