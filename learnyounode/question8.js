var bl = require('bl');
var http = require('http');
var buf;
var str;


http.get(process.argv[2], function(res) {
  	res.pipe(bl(function(err, data) {
	  	buf = data;
	  	str = buf.toString();
	  	console.log(str.length);
	  	console.log(str);
	  }
	  )
  	)
}
);