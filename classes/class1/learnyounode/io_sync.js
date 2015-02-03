var fs = require('fs')

var text = fs.readFileSync(process.argv[2]).toString()
console.log(text.split('\n').length - 1)