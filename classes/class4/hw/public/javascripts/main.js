var $form = $("#ajax-form");

var onSuccess = function(data, status){
	console.log('success');
	console.log(data);
	var out = "<li>"+data.name+"</li>" +
			"<ul>" +
			"<li>"+data.price+"</li>" +
			"</ul>" +
			"<form id= 'ajax-form1' action='outOfStock' method= 'POST'>" +
			"<input type ='submit' value='Out of Stock'>" +
			"</form>" +
			"<form id='ajax-form2' action='edit' method= 'POST'>" +
			"Name: <input type='text' name='name'/><br/>" +
			"Price: <input type='text' name='price'/><br/>" +
			"<input type ='submit' value='Edit'>" +
			"</form>";
	$("#result").html(out);
};

var onError = function(data, status){
	console.log("status",status);
	console.log("error",data);
};

$form.submit(function(event){
	event.preventDefault();
	var name = $form.find("[name='name']").val();
	var price = $form.find("[name='price']").val();

	$.post("newIngredient", {
		name: name,
		price: price,
		available: "In Stock"
	})
		.done(onSuccess)
		.error(onError);
});