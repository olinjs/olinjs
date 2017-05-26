//Create a program that prints a list of 
//files in a given directory, filtered by 
//the extension of the files. You will be 
//provided a directory name as the first 
//argument to your program 
//(e.g. '/path/to/dir/') and a file extension 
//to filter by as the second argument.

//For example, if you get 'txt' as the second 
//argument then you will need to filter the 
//list to only files that end with .txt. 
//Note that the second argument will not 
//come prefixed with a '.'.

//The list of files should be printed to the 
//console, one file per line. You must use 
//asynchronous I/O.

var fs = require('fs');
var path = require('path');
var files = undefined;

function filteredFilesInDir(dirName,extension){
	var fileNames = undefined;
	fs.readdir(dirName, doneGettingFileNames);
	function doneGettingFileNames(err, list)
	{
		if(err) throw err;
		fileNames = list;
		filterExtension(fileNames, extension);
	}

	

}

function filterExtension(files, ext){
	var filtered = undefined;
	ext = "."+ext;
	for(i=0;i<files.length;i++){
		filtered = files.filter(function rightExt(file){
			return path.extname(file) === ext;
		});
	}
	logThings(filtered);

}

function logThings(filtered){
	for(i=0;i<filtered.length;i++){
		console.log(filtered[i]);
	}
}

filteredFilesInDir(process.argv[2], process.argv[3]);

/*
    var fs = require('fs')
    var path = require('path')
    
    fs.readdir(process.argv[2], function (err, list) {
      list.forEach(function (file) {
        if (path.extname(file) === '.' + process.argv[3])
          console.log(file)
      })
    })

*/