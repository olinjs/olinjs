var mymodule = require('./makeMod1.js');

mymodule(process.argv[2], process.argv[3], callback1);

function  callback1 (err, listy){
	if (err) return callback1 (err);
	for (i = 0; i<=listy.length-1; i++) {
		console.log (listy[i]);
	}
}

//thing.ForEach is a thing that loops through everything in a list