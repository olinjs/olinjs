var mod = require('./mod')

mod(process.argv[2], process.argv[3], function (err, data) {
	if (err) {
		console.log('There was an error.');
	}
});
