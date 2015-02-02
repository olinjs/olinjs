// without the help of async or after modules...
http = require('http');
concatStream = require('concat-stream');
var numUrls = 3;

var streamData = {};
for (var i = 0; i < numUrls; i++) {
	queueRequest(i, streamData);
}

// wrap in a separate function, so it can be remembered in this async call
function queueRequest(i, streamData) {
	http.get(process.argv[i+2], function (response) {
		// you can pipe all the data from the response to a stream, and then make a callback once all the data has arrived
		response.pipe(concatStream(function (data) {
			streamData[i] = data.toString();
			if (Object.keys(streamData).length === 3)
				printOrderedElements(streamData);
		}));
	});
}

function printOrderedElements (data) {
	for (var i = 0; i < numUrls; i++) {
		console.log(data[i]);
	};
}