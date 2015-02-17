var onSuccess = function(data, status) {
	console.log(status);
	if (data === "exists"){
		$("#loginErrors").html("Account already exists! Please try again.");
	} else if (data === "/"){
		window.location.replace("/");
	}
};

var onError = function(data, status) {
	$("#loginErrors").html(data);
};

var $signUp = $("#sign_up");
$signUp.submit(function(event) {
	event.preventDefault();

	var authorName = $signUp.find("[name='name']").val();
	var authorPassword = $signUp.find("[name='password']").val();
	var passwordAgain = $signUp.find("[name='password_again']").val();

	if (authorPassword === passwordAgain) {
		$.post("/login/register", {
			name: authorName,
			password: authorPassword
		}).done(onSuccess).error(onError);
	} else {
		alert("Your password doesn't match. Please try again!");
	}
});

var $login = $("#login");
$login.submit(function(event) {
	event.preventDefault();

	var authorName = $login.find("[name='name']").val();
	var authorPassword = $login.find("[name='password']").val();
	$.post("/login", {
		name: authorName,
		password: authorPassword
	}).done(onSuccess).error(onError);
});