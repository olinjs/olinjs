var mymodule = require('./mymodule.js');
mymodule(process.argv[2], process.argv[3], function (err, files){
	if(err){
		console.log('error');
	}else{
		for(var i = 0; i < files.length; i++){
			console.log(files[i]);
		}	
	}
});
