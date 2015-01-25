
var fs = require('fs')

fs.readFile(process.argv[2], 
   function (err, buffer) {
   var newlines = buffer.toString().split('\n')
  console.log(lines.length - 1)
})



