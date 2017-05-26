module.exports = function(message){
	return message.filter(function(element){
		return element.message.length < 50;
	}).map(function(each){
		return each.message;
	});


};