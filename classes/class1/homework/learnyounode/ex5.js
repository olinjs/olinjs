var fs = require('fs');
var dir = process.argv[2];
var sort = process.argv[3];

function dirLoc () {
  fs.readdir(dir, function callback (err, list) {
    if (err) {
      throw err;
    }
    console.log(list);
  })
}

dirLoc ();
