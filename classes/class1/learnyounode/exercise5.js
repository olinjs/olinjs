var fs = require('fs');
var dirName = process.argv[2];
var extension = process.argv[3];

fs.readdir(dirName,function callback(err,list) {
  for (i=0;i<list.length;i++) {
    if (list[i].split('.')[1] == extension) {
      console.log(list[i]);
    }
  }
});
