var http = require('http');
var bl = require('bl');
var url = process.argv.slice(2,5);

var content = [];
function httpGet(i) {
    http.get(process.argv[2+i], function(response){
	response.pipe(bl(function (err, data){
		if(err){console.log('err');}
		else{
			content[i] = data.toString();
			console.log(i);
		}
			if(content[1] && content[0] && content[2]){
				printContent(content)}
	}));
	});
}

for(var i =0; i<3; i++){
	httpGet(i);
}

function printContent(content){
	for(var i =0; i<3; i++){
		console.log(i);
		console.log(content[i]);
	}}
