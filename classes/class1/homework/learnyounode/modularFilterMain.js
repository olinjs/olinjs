


var mymodule = require('./myModuleFilterLS.js');

function logThings(err,filtered){
	if (err) throw err;
	for(i=0;i<filtered.length;i++){
		console.log(filtered[i]);
	}

}

mymodule(process.argv[2], process.argv[3], logThings);

/*
//they have elegant soln
    var filterFn = require('./solution_filter.js')
    var dir = process.argv[2]
    var filterStr = process.argv[3]
    
    filterFn(dir, filterStr, function (err, list) {
      if (err)
        return console.error('There was an error:', err)
    
      list.forEach(function (file) {
        console.log(file)
      })
    })

*/