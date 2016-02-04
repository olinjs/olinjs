module.exports = function sortFunc(dirName, fileExt, callback){
	fileExt = "." + fileExt;

	var filesort = fs.readdir(directoryPath, function (err, list){
	    if(err){
        return console.error(err);
    }
    	var newlist = []
    	list.forEach(function(fileName){
    		if(path.extname(fileName)== fileExtension)
    			newlist.push(fileName)
    	})
    	for (var i = 0; i < newlist.length; i++){
    	console.log(newlist[i]);}
}