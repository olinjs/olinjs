// >> HELLO WORLD

// console.log("HELLO WORLD");

////////////////////////////////////
// >> BABY STEPS

// var input_numbers = process.argv;

// var sum = 0;
// for(var i = 2; i < input_numbers.length; i++)
// {
//     sum = sum + parseFloat(input_numbers[i]);
// }

// console.log(sum);

////////////////////////////////////
// >> MY FIRST I/O!

// // Import the module for manipulating files.
// var fs = require('fs');
// var input_file = process.argv[2];

// var buf = fs.readFileSync(input_file);
// var str = buf.toString();
// var line_break_number = (str.match(/\n/g)||[]).length;

// console.log(line_break_number);

////////////////////////////////////
// >> MY FIRST ASYNC I/O!

// // Import the module for manipulating files.
// var fs = require('fs');
// var input_file = process.argv[2];

// var printLineBreakNumber = function (err, data) {
// 	if (err) throw err;
// 	var str = data.toString();
// 	var line_break_number = (str.match(/\n/g)||[]).length;
// 	console.log(line_break_number);
// }

// fs.readFile(input_file, printLineBreakNumber);

////////////////////////////////////
// >> MY FIRST ASYNC I/O!