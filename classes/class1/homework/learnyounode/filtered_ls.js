var fs = require('fs');
var path = require("path");

function callback(err, list) {
    if (err != null) {
        console.log(err);
        return err;
    }

    console.log(list.filter(filterList).join("\n"));
}

function filterList(name) {
    return path.extname(name) == "." + process.argv[3];
}

fs.readdir(process.argv[2], callback);
