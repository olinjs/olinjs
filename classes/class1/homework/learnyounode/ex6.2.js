// module file to do work
// takes dir, extension, callback
var fs = require('fs');
var path = require('path');

module.exports = function dirLoc(dir, sort, callback) {
  fs.readdir(dir, function(err, list) {
    if (err) {
      return callback(err);
    }
    var filter = [];
    for (var i = 0; i < list.length; i++) {
      if (path.extname(list[i]) == '.' + sort) {
        filter.push(list[i]); 
      }
    }
    callback(null, filter);
  });
}
