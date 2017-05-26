function upperCaser(str) {
	return str.toUpperCase();
}


function repeat(operation, num) {
	var i = 0;
	while(i < num) {
		operation();
		i++;
	};
};

function doubleAll(numbers) {
	var result = [];

	result = numbers.map(function (num) {
		num * 2;
	});
	console.log(result);

}