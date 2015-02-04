var fs = require('fs');
var path = require('path');
var dir = process.argv[2];
var sort = process.argv[3];

function dirLoc () {
  fs.readdir(dir, function callback (err, list) {
    if (err) {
      throw err;
    }
    for (var i = 0; i < list.length; i++) {
      if (path.extname(list[i]) == '.' + sort) {
        console.log(list[i]);
      }
    }
  })
}

dirLoc ();
