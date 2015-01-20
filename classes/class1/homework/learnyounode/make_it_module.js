var fs = require("fs");
var path = require("path");

module.exports = function (filename, ext, callback) {
    fs.readdir(filename, function _callback(err, data) {
        if (err)
            return callback(err);

        callback(null, data.filter(function filterList(name) {
            return path.extname(name) == "." + ext;
        }));
    });
}

