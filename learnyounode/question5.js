var fs = require('fs');

fs.readdir(process.argv[2], function(err, list){
	list.forEach(function(element){
		if (element.split('.')[1] === process.argv[3]){
			console.log(element);
		}
	})
})