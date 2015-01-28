// func must be passed previousValue, currentValue, index, and array

// var func = function (previousValue, currentValue, index, array){
// };

module.exports = function reduce(array, func, initial) {

	var previousValue = func(initial, array[0], 0, array);

	if (array.length === 1) {
		console.log(previousValue);
	}

	reduce(array.slice(1), func, previousValue);

};