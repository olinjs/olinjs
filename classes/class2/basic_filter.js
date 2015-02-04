var lessThanFifty = function (value, index, array){
	if (value.length <= 50) {return true;} 
	else {return false;}
};

function getShortMessages(messages) {
	return messages.filter(lessThanFifty);
};

module.exports = getShortMessages;