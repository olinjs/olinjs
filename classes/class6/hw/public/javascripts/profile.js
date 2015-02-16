var $twitBtn = $('#postTwit');
var $delBtn = $('#deletePost');

$twitBtn.click(function(event){
	var twitMessage = $('#twitMessage').val();
	console.log(twitMessage);
	if (twitMessage){
		$.post('profilePost',{text: twitMessage}).done(onSuccessTwit).error(onError);
	};
});

$delBtn.click(function(event){
	$.post('deleteTwit',{}).done(onSuccessDel).error(onError);
});

var onSuccessDel = function(data, status){

};

var onSuccessTwit = function(data, status){

};

var onError = function(data, status){
	console.log(data);
	console.log(status);
};