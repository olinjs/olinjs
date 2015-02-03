var fs = require('fs');

// Read file into string
var file = fs.readFileSync(process.argv[2], 'utf8');

// Split the file by newline and count the newlines
console.log(file.split('\n').length-1);