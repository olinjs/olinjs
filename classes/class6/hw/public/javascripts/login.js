var $form = $("#login");

$form.submit(function(event){
	event.preventDefault();
	var usersName = $form.find("[name='username']").val();
	alert(usersName);
	$.post('loginUser', {username: usersName}).done(onSuccess).error(onError);
});

var onError = function(data, status){
	console.log("status",status);
	console.log("error",data);
};

var onSuccess = function(data, status){
	console.log(data);
	window.location.replace("/");
};
