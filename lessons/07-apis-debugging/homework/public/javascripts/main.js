var $login = $("#login").unbind();
var $newTwote = $("#newTwote").unbind();
var $twote = $(".twote").unbind();
var $user = $(".user").unbind();


var onError = function(data, status) {
	console.log("status", status);
	console.log("error", data);
};

var onSuccessNewTwote = function(data, status) {
	console.log("status", status);
	console.log("error", data);
	var $newTwote = $('<form class="twote" id=' + data._id + ' userid=' + data.user._id + ' method="POST"><fieldset><legend class="scheduler-border">'+data.user.displayName+'</legend><span>'+data.text+'</span><br> <input type="submit" class="btn btn-xs btn-danger delete" value="Delete"></fieldset></form>');
	$newTwote.appendTo('#twotes');
	$newTwote.unbind();
	$newTwote.submit(deleteTwote);
};

var onSuccessDeleteTwote = function(data, status) {
	console.log("status", status);
	console.log("error", data);
	$('#' + data._id).remove();

};

var onSuccessHighlightTwotes = function(data, status) {
	console.log("status", status);
	console.log("error", data);
	$('#' + data._id).remove();
};

var newTwote = function(event) {
	event.preventDefault();

	$.post("/newTwote", {
		text: $('#newTwoteText').val(),
		user: $('#newTwote').attr('data-currentUserId')
	})
	.done(onSuccessNewTwote)
	.error(onError);
	$('#newTwoteText').val("")
}

var deleteTwote = function(event) {
	event.preventDefault();

	$.post("/deleteTwote", {
		twoteId: $(event.target).attr('id'),
		userId: $('#newTwote').attr('data-currentUserId')
	})
	.done(onSuccessDeleteTwote)
	.error(onError);	
}

var userHighlight = function(event) {
	event.preventDefault();
	console.log($(event.target).attr('id'));
	console.log($( 'form[userid=' + $(event.target).attr('id') + ']' ).length);
	$( 'form' ).each(function() {
		console.log($(this).children('fieldset').length)
		$(this).children('fieldset').children('legend').css({"color": "#000000", "font-weight": "Normal"}); 
	});
	$( 'form[userid=' + $(event.target).attr('id') + ']' ).each(function() {
		console.log($(this).children('fieldset').length)
		$(this).children('fieldset').children('legend').css({"color": "#3e8f3e", "font-weight": "Bold"}); 
		// , "border": "solid #ff0000 10px"

	});
}

$newTwote.submit(newTwote)
$twote.submit(deleteTwote)
$user.submit(userHighlight)