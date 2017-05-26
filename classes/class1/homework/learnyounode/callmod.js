var mymodule = require('./mymodule.js')

var dir = process.argv[2];
var filt = process.argv[3];

mymodule(dir,filt, function(err,files){
	if (err)
		return console.error('There was an error:', err)

	files.forEach(function (file){
		console.log(file);
	});
});