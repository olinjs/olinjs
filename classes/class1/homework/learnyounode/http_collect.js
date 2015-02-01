var bl = require("bl");
var http = require("http");

http.get(process.argv[2], function callback(response) {
    response.pipe(bl(function (err, data) {
        var dataStr = data.toString();
        console.log(dataStr.length);
        console.log(dataStr);
    }));
});
