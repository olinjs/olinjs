var lesson6module = require('./lesson6module.js')

lesson6module(process.argv[2],process.argv[3],callback);

function callback(err, data){
	for (var i = 0; i<data.length;i++) {
		console.log(data[i]);
	}
}