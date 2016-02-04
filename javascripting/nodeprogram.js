var fs = require('fs');
var fileToRead = fs.readFile(process.argv[2], 'utf8', function(err, data){
    if(err){
        return console.error(err);
    }

    var newLineCount = data.split('\n').length-1;
    console.log(newLineCount);
    return newLineCount;
})
