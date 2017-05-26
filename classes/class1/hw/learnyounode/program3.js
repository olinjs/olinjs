var fs = require('fs');

file = fs.readFileSync(process.argv[2]);

contents = file.toString();

console.log(contents.split('\n').length - 1);