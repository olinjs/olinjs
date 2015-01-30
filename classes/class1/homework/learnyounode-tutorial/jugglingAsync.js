var http = require('http');
var results = new Array(3);
var count = 0;

function httpGet(urls, i, callback) {
	http.get(urls[i], function (res) {
		var allData;

		res.setEncoding('utf8');

		res.on("data", function (data) {
			if (typeof(allData) == "undefined") {
				allData = data;
			} else {
				allData += data;	
			}
		})

		res.on("end", function () {
			results[i] = allData;
			count++;
			callback();
		})
	})
}

function juggleAsync (urls) {
	for (var i = 0; i < urls.length; i++) {
		httpGet(urls, i, function () {
			if (count == 3) {
				for (var j = 0; j < urls.length; j++) {
					console.log(results[j]);
				}
			}
		});
	}
}

juggleAsync([process.argv[2], process.argv[3], process.argv[4]])