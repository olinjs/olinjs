var http = require("http");
var map = require("through2-map");


var server = http.createServer(function callback (req, res) {
    req.pipe(map(function (name) {
        return name.toString().toUpperCase();
    })).pipe(res);
});

server.listen(process.argv[2]);