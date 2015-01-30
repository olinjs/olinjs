var http = require('http');

http.get(process.argv[2], function (res) {
	var allData;

	res.on("data", function (data) {
		if (typeof(allData) == "undefined") {
			allData = data;
		} else {
			allData += data;	
		}
	})

	res.on("end", function () {
		console.log(allData.length);
		console.log(allData);
	})
})