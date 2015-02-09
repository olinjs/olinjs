var $form = $("#orderForm");

$("[type='checkbox']").click(function foo(pass){
	var cost = $("#cost").text();
	console.log("cost", cost);
	var name = $( this ).attr("value");
	var price = $("#"+name).text();
	console.log("name", name);
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
		console.log("price",price);
		var priceInt = parseInt(price);
		if (priceInt <= 0){
			priceInt = 0;
		};
		var total = parseInt(cost) - priceInt;
		var costString = total.toString();
		$("#cost").html("<h3>" + costString+ "</h3>");
	};
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

$form.submit(function(event){
	event.preventDefault();
	// var values = $("[type='checkbox']:checked").map(function() {
 //    	return this.val();
 //    });
	var elems = document.querySelectorAll('select option:checked');
	var values = [].map.call(elems, function(obj) {
  		return obj.value;
	});
    console.log("shit", values);
	$.post("orderSubmit", {
		ingredients: values
	})
		.done(onSuccess)
		.error(onError);
});

