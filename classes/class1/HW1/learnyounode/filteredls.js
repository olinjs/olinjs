var fs = require('fs')
var path = require('path')
fs.readdir(process.argv[2], function (err, list) {
  list.forEach(function (filteredfiles) {
    if (path.extname(filteredfiles) === '.' + process.argv[3])
      console.log(filteredfiles)
  })
})