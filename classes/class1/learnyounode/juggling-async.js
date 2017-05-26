var http = require('http');
var bl = require('bl');
var count = 0;
var the_stuff;

function buffguy () {
	return bl(function (err, buff) {
		count += 1;
		if (count == 3) {
			for (i = 0; i < 3; i++) {
				console.log(the_stuff[i][2].toString());
			}
		}
	});
}

the_stuff = [[0, process.argv[2], buffguy()],
			 [1, process.argv[3], buffguy()],
			 [2, process.argv[4], buffguy()]];

function makeListener (i) {
	var url = the_stuff[i][1];
	var buffo = the_stuff[i][2];
	http.get(url, function (response) {
		response.pipe(buffo);
	});
}
		
the_stuff[0][3] = makeListener(0);
the_stuff[1][3] = makeListener(1);
the_stuff[2][3] = makeListener(2);
