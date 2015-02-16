var $submitTwote = $("#submit_twote");

var onSuccess = function(data, status) {
	console.log("Successful!");
	console.log(data);
	$("#twote_list").html(data);
};

var onError = function(data, status) {
	console.log("Failed!");
	console.log(data);
};

// After the page loads, send an AJAX get request to collect the list of ingredients.
$(function() {
  $.get("/").done(onSuccess).error(onError);
});

$submitTwote.submit(function(event) {
	event.preventDefault();
	console.log("Button pressed.");

	var writtenTwote = $submitTwote.find("[name='writtenTwote']").val();

	$.post("/", {
		twote: writtenTwote
	}).done(onSuccess).error(onError);
});