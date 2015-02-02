var fs = require('fs');
var path = require('path');

function filterList (dir_name, extension, callback) {
    fs.readdir(dir_name, function (err, list) {
        if (err) {
            return callback(err);
        }

        var filtered = list.filter(function suffix (fn) {
            return path.extname(fn) == '.' + extension;
        });

        callback(null, filtered);
    })
}

module.exports = filterList;

// Official Solution

// var fs = require('fs')
// var path = require('path')

// module.exports = function (dir, filterStr, callback) {

//   fs.readdir(dir, function (err, list) {
//     if (err)
//       return callback(err)

//     list = list.filter(function (file) {
//       return path.extname(file) === '.' + filterStr
//     })

//     callback(null, list)
//   })
// }
