var CALLBACKS = {
	success: {
	// Define success callbacks here
		orderFulfilled: function(data, status) {
		// Kitchen page - order has been marked as fulfilled in db; remove from page
			var formId = '#'+data;
			$(formId).remove();
		}, 
	    toggleIngredient: function(data, status) {
	    // Ingredients page - move ingredient forms between 'in stock' and 'out of stock' divs
			// get form
			var formId = '#'+data;
			var $form = $(formId).remove();

			// change form class
			$form.toggleClass('inStock outOfStock');

			// update the rest of the form according to new class & place into document
			var newVals = $form.hasClass('inStock') ? 
			['Out Of Stock', 'markOutOfStock', 'div#in'] :
			['Restock', 'markInStock', 'div#out']; 
				// [new button text, new form action, target div]

			$form.find('input.submit').val(newVals[0]); // change button text
			$form.attr('action', newVals[1]); // change form action
			$(newVals[2]).append($form[0].outerHTML); // place into document

			// Re-register handlers - contents of jquery objects have changed!
			registerSubmitHandlers();
	    },
	    editIngredient: function(data, status) {
	    // Ingredients page - change edited ingredient
			data = JSON.parse(data);
			var $form = $('#'+data.id);
			var newText = data.name + ' - $' + Number(data.price).toFixed(2);
			$form.find('span').html(newText);
	    },
	    newIngredient: function(data, status) {
	    // Ingredients page - add newly created ingredient
	    	if (!data) {
	    		alert("Can't save - duplicate of existing ingredient");
	    	} else {
		    	// get existing form & make a clone (avoid modifying it)
		    	var $form = $('form.inStock').first().clone();

		    	// update it w/ new ingredient's parameters; assume in stock
		    	var label = data.name + ' - $' + Number(data.price).toFixed(2);
		    	var newVals = ['Out Of Stock', 'markOutOfStock', 'div#in'];
		    		// [new button text, new form action, target div]

		    	$form.attr('id', data._id); // give form id to match ingredient's db _id
		    	$form.find('span').html(label); // change label text in span
		    	$form.find('input.submit').val(newVals[0]); // change button text
				$form.attr('action', newVals[1]); // change form action
				$(newVals[2]).append($form[0].outerHTML); // place into document
		    
		    	// Re-register handlers - contents of jquery objects have changed!
				registerSubmitHandlers();
			}
	    }
	},

	error: function(data, status) {
	// Default error callback
    	console.log('Error!' + data);
	}
}