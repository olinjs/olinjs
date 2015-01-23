var fs = require('fs');
var path = require('path');

var dir_name = process.argv[2];
var extension = '.' + process.argv[3];

fs.readdir(dir_name, function (err, list) {
    var filtered = list.filter(function suffix (fn) {
        return path.extname(fn) == extension;
    });
    for (var i = 0; i < filtered.length; i++) {
        console.log(filtered[i]);
    }
})

// Better Example

// var fs = require('fs')
// var path = require('path')

// fs.readdir(process.argv[2], function (err, list) {
//     list.forEach(function (file) {
//         if (path.extname(file) === '.' + process.argv[3])
//             console.log(file)
//     })
// })
