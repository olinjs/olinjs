var $twitBtn = $('#postTwit');
var $delBtn = $('.deletePost');

$twitBtn.click(function(event){
	var twitMessage = $('#twitMessage').val();
	console.log(twitMessage);
	if (twitMessage){
		$.post('profilePost',{text: twitMessage}).done(onSuccessTwit).error(onError);
	};
});

$delBtn.click(function(event){
	var val = $(this).attr('id');
	$.post('deleteTwit',{ del: val }).done(onSuccessDel).error(onError);
});

var onSuccessDel = function(data, status){
	$("#"+data).remove();
};

var onSuccessTwit = function(data, status){
	var out = "<div id="+data.timeMade+">"+
				"<span>"+
				"<li>"+data.text+"</li>"+
				"<button class='deletePost' id="+data.timeMade+" type='button'> x </button>"+
				"</span>"+
				"</div>"
	$("#result").html(out);
};

var onError = function(data, status){
	console.log(data);
	console.log(status);
};