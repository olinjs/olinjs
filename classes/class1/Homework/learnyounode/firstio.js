var fs = require ('fs');  //gets full fs module in variable called fs
var array = process.argv;  //gets array that contains filepath

var buffFile = fs.readFileSync(array[2])  //creates a buffer object that contains the complee contents of a file
var strFile = buffFile.toString();    //converts contents of file from buffer to string

//console.log(strFile);

var arrayNewLine = strFile.split('\n');  //splits string into array with one more element than the number of newlines
var totalNewline = arrayNewLine.length -1;

console.log(totalNewline);