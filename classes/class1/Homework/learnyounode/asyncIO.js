var fs = require ('fs');  //gets full fs module in variable called fs
var array = process.argv;  //gets array that contains filepath

var buffFile = fs.readFile(array[2], callback);  //creates a buffer object that contains the complee contents of a file

function callback (err, data) {
	var strFile = data.toString();    //converts contents of file from buffer to string
	var arrayNewLine = strFile.split('\n');  //splits string into array with one more element than the number of newlines
	var totalNewline = arrayNewLine.length -1;
	console.log(totalNewline);
}
