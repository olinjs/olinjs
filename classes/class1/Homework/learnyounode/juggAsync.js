var finalList = [];
var http = require("http");
var urls = process.argv.slice(2);

for (var i=0; i<3;i++) {
	finalList[i]=null;
}

for (var j=0; j<3;j++) {
	httpget(j);
}


function httpget (index) {
	http.get(urls[index], function(res) {
		var result = "";
		res.setEncoding("utf8");
		res.on('data', function(data) {
		  result += data;
		});
		res.on ('end', function () {
			finalList[index] =result;
			var count =0;
			for (var l = 0; l<3; l++) {
				if (finalList[l] !== null) {
					count++
				}
			}
			if (count ===3) {
				for (var m=0; m<3; m++) {
				console.log (finalList[m]);
				} 
			}
		});
	});
}

