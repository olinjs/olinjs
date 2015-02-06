var $form = $("orderForm");

$("[type='checkbox']").click(function foo(event){
	var cost = $("#cost").text();
	console.log(cost);
	var name = $( this ).attr("name");
	var price = $("#"+name).text();
	if (this.checked){
		console.log('Was Checked');
		var priceInt = parseInt(price);
		if (priceInt <= 0){
			priceInt = 0;
		};
		var total =  priceInt + parseInt(cost);
		var costString = total.toString();
		$("#cost").html("<h3>" + costString+ "</h3>");
	}
	else{
		console.log(name);
		var priceInt = parseInt(price);
		if (priceInt <= 0){
			priceInt = 0;
		};
		var total = parseInt(cost) - priceInt;
		var costString = total.toString();
		$("#cost").html("<h3>" + costString+ "</h3>");
	};
});

$form.submit(function(event){
	event.preventDefault();
	var sel = $('input[type=checkbox]:checked').map(function(_, el) {
    	return $(el).val();
    });
    console.log(sel);
	$.post("orderSubmit", {
		ingredients: sel
	})
		.done(onSuccess)
		.error(onError);
});

var onError = function(data, status){
	console.log("status",status);
	console.log("error",data);
};

var onSuccess = function(data, status){
	console.log(data);
	var out = "<h3>Order Submitted!!</h3>";
	$("#result").html(out);
};