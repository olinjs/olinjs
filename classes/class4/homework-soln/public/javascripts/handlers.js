var HANDLERS = {
	click: {
	// Define all click handlers here
		orderOpt: function(event) {
		// Order page - on ingredient checkbox click
		// Add ingredient price to total cost tally
			var checkbox = event.target;
			var $price = $('#price');
			var curVal = $price.html()
			var addVal = $(checkbox).is(":checked") ? checkbox.value : -checkbox.value;
			var newVal = Number(curVal) + Number(addVal);
			$price.html(newVal.toFixed(2));
		},
		edit: function(event) {
		// Kitchen page - on ingredient edit button click
		// Bring up two prompts; fail out of sequence if cancel or input is ""
			var $form = $(event.target).closest('form')
			var id = $form.attr('id');
			var name = prompt('Edit ingredient name');
			if (name != null && name.length > 0) {
				var price = prompt('Edit ingredient price');
				if (price != null && price.length > 0) {
					$.post('/editIngredient', {
						id: id,
						name: name,
						price: price
				})
					.done(CALLBACKS.success.editIngredient)
					.error(CALLBACKS.error);
				}
			}
		}
	},

	makeSubmitHandler: function(route, success, ingrData) {
	// Creates a submit handler w/ specified POST route & success callback
	// Post data ONLY contains mongo _id if ingrData is false;
	// 	includes new ingredient name and price if ingrData is true.
	// Uses default error callback
		return function(event) {
			var $form = $(event.target);

			var postData = {};
			if (ingrData) {
				var form = $(event.target);
				postData.name = $form.find('input#name').val();
				postData.price = $form.find('input#price').val();
			} else {
				postData.id = event.target.id;
			}
			
			event.preventDefault();
			$.post(route, postData)
				.done(success)
				.error(CALLBACKS.error);
		}
	}
}