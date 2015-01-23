var fs = require ('fs');  //gets full fs module in variable called fs
var array = process.argv;  //gets array that contains filepath

var something = fs.readdir (array[2],callback);

function callback (err, list) {
	for (var item = 0; item <=array.length-1; item++) {
		var fileSplit = list[item].split(".");
		if (fileSplit[1] == array[3]) {
			console.log(list[item]);
		}
	}
}