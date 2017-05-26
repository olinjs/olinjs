var mymodule = require('./mymodule');

mymodule(process.argv[2], process.argv[3], function(err, list){
	if (err){
		throw err;
	}

	list.forEach(function(item){
		console.log(item);
	});
});