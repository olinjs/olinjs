var $form1 = $("#addForm");

var onSuccess1 = function(data, status){
	console.log('main success');
	console.log(data);
	var out = "<form id= 'ajax-form1' action='outOfStock' method= 'POST'>" +
			"<input type='text' name='id' value = "+data._id+" readonly/><br/>"+
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

$form1.submit(function(event){
	event.preventDefault();
	var name = $form1.find("[name='name']").val();
	var price = $form1.find("[name='price']").val();

	$.post("newIngredient", {
		name: name,
		price: price,
		available: "In Stock"
	})
		.done(onSuccess1)
		.error(onError);
});