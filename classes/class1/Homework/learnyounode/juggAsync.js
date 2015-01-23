var url1 = process.argv[2];
var url2 = process.argv[3];
var url3 = process.argv[4];

var http = require("http");

http.get(url1, function(res) {
	totalString = "";
	res.setEncoding("utf8");
	res.on('data', function(data) {
	  totalString+=data;
	  })
	res.on ("end", function () {
		console.log (totalString);
	})
});

http.get(url2, function(res) {
	totalString = "";
	res.setEncoding("utf8");
	res.on('data', function(data) {
	  totalString+=data;
	  })
	res.on ("end", function () {
		console.log (totalString);
	})
});

http.get(url3, function(res) {
	totalString = "";
	res.setEncoding("utf8");
	res.on('data', function(data) {
	  totalString+=data;
	  })
	res.on ("end", function () {
		console.log (totalString);
	})
});