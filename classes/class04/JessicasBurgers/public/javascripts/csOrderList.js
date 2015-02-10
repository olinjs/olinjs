// Computes the total amount of money of the selected order.
$(':checkbox').on( "click", function() {
	var total_price = 0;
	$(':checkbox:checked').each(function () {
  	var classes = $(this).attr('class').split(/\s+/);
		var itemPrice = Number(classes[1]);
		total_price += itemPrice;
  });
  $("#price-counter").html(total_price).currency();
});

$(".money").currency();