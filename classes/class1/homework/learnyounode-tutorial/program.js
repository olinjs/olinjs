var fs = require('fs');
var path = require('path');

function Exercise2 () {
	var total = 0;

	for (var i = 2; i < process.argv.length; i++) {
		total += Number(process.argv[i]);
	}

	console.log(total);
}

function Exercise3 () {
	var contents = fs.readFileSync(process.argv[2]).toString().split('\n').length - 1;

	console.log(total);
}

function Exercise4 () {
	var contents = fs.readFile(process.argv[2], 'utf8', function callback(err, data) {
		if (err) {
			console.log("ERROR: readFile; try a better file");
		}
		else {
			console.log(data.split('\n').length-1);
		}
	});
}

function Exercise5 () {
	var fileList = fs.readdir(process.argv[2], function callback(err, list) {
		if (err) {
			console.log("ERROR in readFile; try a better file");
		}
		else {
			//Alternative for loop: list.forEach(function (file) {
			for (var i = 0; i < list.length; i++) {
				if (path.extname(list[i]) == "." + process.argv[3]) {
					console.log(list[i]);
				}
			}
		}
	})
}

Exercise5()