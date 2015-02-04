var fs = require('fs');

var path = fs.readFileSync(process.argv[2]);
var str = path.toString();
console.log(str.split('\n').length - 1);
