// program to print list of files
var mymodule = require('./ex6.2.js');
var dir = process.argv[2];
var sort = process.argv[3];

mymodule(dir, sort, function(err, list) {
  list.forEach(function(element) {
    console.log(element);
  });
});
