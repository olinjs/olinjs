var fs = require('fs');

var buff = fs.readFileSync(process.argv[2]);

buff = buff.toString();
buff = buff.split('\n');
console.log(buff.length-1);