var fs = require('fs');
fs.readFile(process.argv[2], function callback (err, buf){
	if (err){
		console.log('error');
	}else{
		var arr = buf.toString().split('\n');
		console.log(arr.length-1);
	}
})

