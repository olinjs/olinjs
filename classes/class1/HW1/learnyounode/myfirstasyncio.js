
var fs = require('fs')

fs.readFile(process.argv[2], function (err, buffer) {
   var lines = buffer.toString().split('\n').length - 1
  console.log(lines)
})


