//USED FOR HELP because I could not figure it out:
//https://github.com/rvagg/learnyounode/tree/master/exercises

var fs = require('fs');
var path = require('path');

module.exports = function (dirName,ext,callback) {
  fs.readdir(dirName, function (err,data) {
    if (err) {
      return callback(err);
    }
    data = data.filter(function(file) {
      return path.extname(file) === '.' + ext;
    })
    callback(null,data);
  })
};

