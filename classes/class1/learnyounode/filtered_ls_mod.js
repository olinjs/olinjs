var ext_filter = require('./ext_filter')
var dir = process.argv[2]
var ext = process.argv[3]

ext_filter(dir, ext, function(err, list) {
	
	if (err) return console.error('Error: ', err)
	list.forEach (function (file) { console.log(file) } )

})