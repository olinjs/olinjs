// http://stackoverflow.com/questions/5915096/get-random-item-from-javascript-array

function randVal(length) {
	return Math.floor(Math.random()*length);
}

module.exports.randVal = randVal