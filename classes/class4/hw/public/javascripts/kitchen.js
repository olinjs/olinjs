$("[type='button']").click(function(event){
	console.log($(this));
	var orderID = $(this).attr("id");
	$.post("kitchenButton",{
		order: orderID
	}).done(onSuccess).error(onError);
});

var onError = function(data, status){
	console.log(data);
	console.log(status);
};

var onSuccess = function(data,status){
	var divId = data
	$("#"+divId).remove();
};
