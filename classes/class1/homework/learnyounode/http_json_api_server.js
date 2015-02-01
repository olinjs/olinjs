var http = require('http');
var url = require('url');

var server = http.createServer(function callback (req, res) {
    var param = url.parse(req.url, true).query.iso;
    var date = new Date(param);
    res.writeHead(200, { "Content-Type": "application/json"});
    res.end(JSON.stringify({
        "hour": date.getHours()
      , "minute": date.getMinutes()
      , "second": date.getSeconds()
    }));
});

server.listen(process.argv[2]);