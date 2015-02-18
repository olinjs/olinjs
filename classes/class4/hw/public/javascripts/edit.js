var $form = $("#ajax-form1");

var onSuccess = function(data, status){
	console.log('success');
	console.log(data);
	var out = "<form id= 'ajax-form1' action='outOfStock' method= 'POST'>" +
			"<input type='text' name ='id' value ='"+data._id+"' readonly/><br/>"+
			"<input type='text' name='name' value='"+data.name+"'/><br/>" +
  			"<input type='text' name='price' value='"+data.price+"'/><br/>"+
  			"<input id ='edit' type ='submit' value='Edit' formaction = 'edit'>"+
			"<input id ='outOfStock' type ='submit' value='Out of Stock'>" +
			"</form>";
	console.log(out)
	var id = data._id;
	$("#"+id).html(out);
};

var onError = function(data, status){
	console.log("status",status);
	console.log("error",data);
};

var onSuccess2 = function(data, status){
	console.log(data);
	var id = data._id;
	$("#"+id).remove();
};

$('#edit').click(function(event){
	event.preventDefault();
	var name = $form.find("[name='name']").val();
	var price = $form.find("[name='price']").val();
	var id = $form.find("[name='id']").val();
	$.post("edit", {
		_id: id,
		name: name,
		price: price,
		available: "In Stock"
	})
		.done(onSuccess)
		.error(onError);
});

$('#outOfStock').click(function foo(event){
	event.preventDefault();
	var id = $form.find("[name ='id']").val();
	$.post("outOfStock",{
		_id: id,
		available: "Out of Stock"
	})
		.done(onSuccess2)
		.error(onError);
});