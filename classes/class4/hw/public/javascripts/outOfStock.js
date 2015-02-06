var $form = $("#ajax-form2");

var onSuccess = function(data, status){
	console.log('success');
	console.log(data);
	var out = "";
	var id = data._id;
	$("#"+id).remove();
};

var onError = function(data, status){
	console.log("status",status);
	console.log("error",data);
};

$form.submit(function(event){
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
})