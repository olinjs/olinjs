var $signUp = $("#sign_up");

var onSuccess = function(data, status) {
	console.log("Successful!");
	console.log(data);
};

var onError = function(data, status) {
	console.log("Failed!");
	console.log(data);
};

$signUp.submit(function(event) {
	event.preventDefault();
	console.log("Button pressed.");

	var authorName = $signUp.find("[name='name']").val();
	var authorPassword = $signUp.find("[name='password']").val();

	$.post("login/register", {
		name: authorName,
		password: authorPassword
	}).done(onSuccess).error(onError);
});