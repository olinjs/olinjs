var http = require('http');
var bl = require('bl');

var content = [];

var getHttpContent = function (index) {
	http.get(process.argv[index], function (response) {

		response.setEncoding('utf8');
		// console.log(index-2);

		response.pipe(bl(function (err, data) {
			if (err){
				return console.error(err);
			}

			content[index-2] = data.toString();

			if (content.length === process.argv.length - 2) {
				for (j = 0; j < content.length; j++) {
					console.log(content[j]);
				}
			}
		}));
	});
}

for (var i = 2; i < process.argv.length; i++) {
	getHttpContent(i);	
}