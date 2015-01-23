var program6 = require('./program6.js')

program6(process.argv[2], process.argv[3], function(err,data){

	if (err) {
		return console.log('error');
	}

	data.forEach(function (file){
		console.log(file);
	})

})