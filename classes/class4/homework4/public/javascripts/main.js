//Handles the ajax requests on the /ingredients page

$(document).ready(function() { 
	var $addForm = $(".addForm");
	var $outOfStockForm = $(".outOfStockForm");
	var onError = function(data, status) {
		//Log the status and error to the console
		//This will be generic error generator for my ajax requests
		console.log("Status: ", status);
		console.log("Error: ", data);
	};

	var onSuccessAdd = function(data, status) {
		//Reloads the section when we've successfully added the item
		//TODO: Figure out how to load just the list item instead of the whole page
		window.location.reload();
	};

	var onSuccessDel = function(data, status) {
		//Reloads the section when we've successfully deleted the item
		window.location.reload();
	};

	var onSuccssEdit = function(data, status) {
		//Reloads the window when we've successfully edited the item
	};

	$addForm.submit(function(event) {
		event.preventDefault();
		var name = $addForm.find("[name = 'name']").val();
		var price = $addForm.find("[name = 'price']").val();

		$.post('addIngredient', {
			name: name,
			price: price
		})
		.done(onSuccessAdd)
		.error(onError);

	});

	$outOfStockForm.submit(function(event) {
		event.preventDefault();
		var id = $outOfStockForm.find("[name = 'id']").val();

		$.post('outOfStock', {
			id: id
		})
		.done(onSuccessDel)
		.error(onError);
	});
});





