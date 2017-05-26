// console.log("HELLO WORLD")

function addConsole(arg){
	var total = 0;
	for(var i = 2; i<arg.length; i++){
		var temp = Number(arg[i]);
		total += temp;
	}
	return total
}

// console.log(addConsole(process.argv))

var fs = require('fs')
var path = require('path')
// var buf = fs.readFileSync(process.argv[2])
// var str = buf.toString()
// var res = str.split('\n')
// console.log(res.length-1)

// var str = fs.readFile(process.argv[2],'utf8', callback1)

function callback1(err,data){
	var res = data.split('\n').length
	console.log(res-1)
}

// var ar = fs.readdir(process.argv[2],function findFiles(err,list){
// 	var str = '.' + process.argv[3]
// 	for (var i = 0; i < list.length; i++){
// 		if (path.extname(list[i]) == str){
// 			console.log(list[i])
// 		}
// 	}
// })

// var mod = require('./module1.js')
// mod(process.argv[2],process.argv[3], function callback2(err, list){
// 	for(var i = 0; i<list.length; i++){
// 		console.log(list[i])
// 	}
// })

var http = require('http')
// http.get(process.argv[2], function callback(response){
// 	response.on("data", function (data) {
// 		var str = data.toString()
// 		console.log(str)
// 	})
// })

// http.get(process.argv[2], function callback(response){
// 	var stuff = new Array();
// 	var buf = '';
// 	var num = 0;
// 	response.on("data", function(data){
// 		var str = data.toString();
// 		stuff.push(str)
// 	})
// 	response.on("end", function(){
// 		for(var i = 0; i<stuff.length;i++){
// 			buf += stuff[i];
// 			num += stuff[i].length;
// 		}
// 		console.log(num);
// 		console.log(buf);
// 	})	
// })

var urls = [process.argv[2],process.argv[3],process.argv[4]];
var results = [null,null,null];
for(var i = 0; i<3; i++){
	doShit(i)
}
function doShit(i){
	http.get(urls[i], function(request){
		var buf = '';
		request.on("data",function(data){
			var str = data.toString();
			buf += str;
		});
		request.on("end",function(){
			results[i] = buf;
			var resultCount = 0;
			for (var j = 0; j<results.length; j++){
				if (results[j] !== null) resultCount++;
			}
			if (resultCount == results.length){
				for(var a = 0; a<results.length;a++){
					console.log(results[a]);
				}
			}
		});
	});
}
