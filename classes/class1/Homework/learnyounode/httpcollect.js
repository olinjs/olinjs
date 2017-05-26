var url = process.argv[2];
var http = require("http");
totalString = "";

http.get(url, function(res) {
	res.setEncoding("utf8");
	res.on('data', function(data) {
	  totalString+=data;
	  })
	res.on ("end", function () {
		console.log (totalString.length);
		console.log (totalString);
	})
});