var $btn = $('#postTwit');
var $logoutBtn = $('#logout');

$btn.click(function btnClick(event){
	var twitMessage = $('#twitMessage').val();
	console.log(twitMessage);
	if (twitMessage){
		$.post('homeTwit',{text: twitMessage}).done(onSuccess).error(onError)
	}
});

var onSuccess = function(data, status){
	var out = "<li>"+
		"<div id='text'>"+data.text+"</div>"+
		"<div id='author'>"+data.username+"</div>"+
		"</li>";
	$("#result").html(out);
};

var onError = function(data, status){
	console.log('Error' + data);
	console.log(status);
}

$logoutBtn.click(function(event){
	$.post('logout',{}).done(onLogout).error(onError)
});

var onLogout = function(data, status){
	console.log('Logout');
	window.location.replace("/");
};