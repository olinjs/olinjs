var fs = require('fs');

fs.readFile(process.argv[2], 'utf8', function (err,data) {
	
  if (err) {
    return console.log(err);
  }

  else {
  	console.log(data.split('\n').length - 1);
  }

});