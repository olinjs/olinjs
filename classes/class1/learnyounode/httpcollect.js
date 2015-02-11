http = require('http')
// had problems installing concatStream due to unlocking something that hadn't been locked
// solution found here: http://stackoverflow.com/questions/22152162/npm-cannot-install-dependencies-attempt-to-unlock-something-which-hasnt-been
concatStream = require('concat-stream');
http.get(process.argv[2], function (response) {
	// you can pipe all the data from the response to a stream, and then make a callback once all the data has arrived
	response.pipe(concatStream(function (data) {
		str = data.toString();
		console.log(str.length)
		console.log(str)
	}))
})