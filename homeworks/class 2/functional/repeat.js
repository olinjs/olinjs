module.exports = function (operation, num) {
	for (var i = 0; i < num; i++) operation();
};