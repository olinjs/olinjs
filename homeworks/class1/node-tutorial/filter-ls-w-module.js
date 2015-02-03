var ls_mod = require('./ls-module');

ls_mod(process.argv[2], process.argv[3], function (err, filtered) {
	if (err) return console.error("An error has occurred: ", err);
	else for (var i in filtered) console.log(filtered[i]);
});