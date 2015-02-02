var fs = require('fs');
var newlines;

function getSize(callback) {
    fs.readFile(process.argv[2], 'utf8', function doneReading(err, fileContents) {
        newlines = fileContents.split('\n').length - 1;
        console.log(newlines);
    })
}

getSize();

// Easier way to do it

// var fs = require('fs')
// var file = process.argv[2]

// fs.readFile(file, function (err, contents) {
//     // fs.readFile(file, 'utf8', callback) can also be used
//     var lines = contents.toString().split('\n').length - 1
//     console.log(lines)
// })
