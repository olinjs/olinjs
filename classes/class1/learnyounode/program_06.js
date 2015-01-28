var input_path = process.argv[2];
var file_format = process.argv[3];
var filtered_ls = require("./filtered_ls");

filtered_ls(input_path, file_format, function (err, result) {
	if (err) {
		return console.error('There was an error:', err);
	}
	
	for (i = 0; i<result.length; i++){
		console.log(result[i]);
	}
});