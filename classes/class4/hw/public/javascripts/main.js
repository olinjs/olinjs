var $form = $("#ajax-form");

var onSuccess = function(data, status){
	console.log('success');
	console.log(data);
	var out = "<form id= 'ajax-form1' action='outOfStock' method= 'POST'>" +
			"<input type='text' name='name' value='"+data.name+"'/><br/>" +
  			"<input type='text' name='price' value='"+data.price+"'/><br/>"+
  			"<input type ='submit' value='Edit' formaction = 'edit'>"+
			"<input type ='submit' value='Out of Stock'>" +
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