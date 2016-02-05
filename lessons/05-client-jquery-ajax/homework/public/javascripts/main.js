var $addIngred = $("#newIngredient").unbind();
var $inIngred = $(".inStock").unbind();
var $outIngred = $(".outOfStock").unbind();
var $editIngr = $('input.edit').unbind();

var $order = $('#order');
var $ingredCheck = $('input.ingredient').unbind();

var $kitchenOrder = $('.order').unbind();

var onSuccess = function(data, status) {
	console.log(status)
	console.log(data)
};

var onSuccessOrder = function(data, status) {
	alert("You submitted a terrible Order!")
};

var onSuccessNew = function(data, status) {
	console.log(status)
	console.log(data)

			
	var $newIngredForm = $('<form class="inStock" id=' + data._id + ' method="POST"> <span>' + data.name + ' - $' + data.price + ' </span><input type="button" class="edit" value="Edit"> <input type="submit" class="submit" value="Out of Stock"></form>');
	$newIngredForm.unbind();
	$newIngredForm.appendTo('#in');
	$newIngredForm.submit(eventHandlers.inIngred);
	$newIngredForm.find('.edit').click(eventHandlers.editIngred);
};

var onSuccessUpdate = function(data, status) {
	console.log(status)
	console.log(data)
	var $updateIngredForm = $('#'+data._id);
	var stockText = 'Out of Stock'
	if (!data.inStock) {
		stockText = 'Restock'
	}

	$updateIngredForm.empty()

	$updateIngredForm.append('<span>' + data.name + ' - $' + data.price + '</span> <input type="button" class="edit" value="Edit"> <input type="submit" class="submit" value="' + stockText + '" + >');
	$updateIngredForm.find(' submit').unbind();

	if (data.inStock) {
		$updateIngredForm.submit(eventHandlers.inIngred);
	} else {
		$updateIngredForm.submit(eventHandlers.outIngred);
	}
	$updateIngredForm.find('.edit').click(eventHandlers.editIngred);
};

var onSuccessOut = function(data, status) {
	console.log(status)
	console.log(data)
	$('#'+data._id).remove();
	var $newIngredForm = $('<form class="outOfStock" id=' + data._id + ' method="POST"> <span>' + data.name + ' - $' + data.price + ' </span><input type="button" class="edit" value="Edit"> <input type="submit" class="submit" value="Restock"></form>');

	$newIngredForm.appendTo('#out');
	$newIngredForm.submit(eventHandlers.outIngred);
	$newIngredForm.find('.edit').click(eventHandlers.editIngred);
};

var onSuccessIn = function(data, status) {
	console.log(status)
	console.log(data)
	$('#'+data._id).remove()
	var $newIngredForm = $('<form class="inStock" id=' + data._id + ' method="POST"> <span>' + data.name + ' - $' + data.price + ' </span><input type="button" class="edit" value="Edit"> <input type="submit" class="submit" value="Out of Stock"></form>');

	$newIngredForm.appendTo('#in');
	$newIngredForm.submit(eventHandlers.inIngred);
	$newIngredForm.find('.edit').click(eventHandlers.editIngred);
};


var onError = function(data, status) {
	console.log("status", status);
	console.log("error", data);
};

var eventHandlers = {
	addIngred: function(event) {
		event.preventDefault();
		var name = $addIngred.find("#name").val();
		var price = $addIngred.find("#price").val();
		$addIngred.find("#name").val("");
		$addIngred.find("#price").val("");

		$.post("addIngredient", {
			name: name,
			price: price
		})
		.done(onSuccessNew)
		.error(onError);
	},
	inIngred: function(event) {
		event.preventDefault();
		var id = this.id;
		console.log(id);

		$.post("outIngredient", {
			id: id
		})
		.done(onSuccessOut)
		.error(onError);
	},
	outIngred: function(event) {
		event.preventDefault();
		var id = this.id;
		console.log(id);

		$.post("reStockIngredient", {
			id: id
		})
		.done(onSuccessIn)
		.error(onError);
	},
	editIngred: function(event){
		console.log('edit');
		console.log(this);
		var id = this.closest('form').id;
		console.log(id);
		var $currentForm = this.closest('form');
		$currentForm.empty
		console.log($currentForm)
		var children = $currentForm.children
		var spanTextSplit = $('#' + id).children(' span').get(0).innerText.split("-");
		children[0].remove();
		children[0].remove();
		children[0].remove();
		$('#' + id).append('Ingredient: <input type="text" id="name" value="' + spanTextSplit[0].slice(0, -1) + '"/> Price: $<input type="text" id="price" value="' + spanTextSplit[1].slice(2) + '"> <input type="submit" class="submit" value="Update">');
		$('#' + id).off();
		$('#' + id).submit(eventHandlers.updateIngred);
	},
	updateIngred: function(event) {
		event.preventDefault();
		console.log(event);
		var name = $(this).find("#name").val();
		var price = $(this).find("#price").val();
		// this.find("#name").val("");
		// this.find("#price").val("");
		console.log($(this).attr('id'));

		$.post("updateIngredient", {
			id: $(this).attr('id'),
			name: name,
			price: price
		})
		.done(onSuccessUpdate)
		.error(onError);
	},
	ingredCheck: function(event) {

		var total = Number($('#total').html());
		console.log(total);

		if ($(event.target).is(":checked")) {
			total += Number($(event.target).attr('price'));
		} else {
			total -= Number($(event.target).attr('price'));
		}

		console.log(total);
		$('#total').html(String(total));
	},
	submitOrder: function(event) {
		event.preventDefault();
		console.log(event);

		var name = $order.find("#name").val();
		var total = Number($('#total').html());
		$order.find("#name").val("");
		$('#total').html("0.00");

		var ingredients = $(event.target).find(".ingredient:checked").map(function() {
			this.checked = false;
			return this.id;
		});

		console.log(ingredients);
		console.log(ingredients.toArray());

		$.post("submitOrder", {
			name: name,
			total: total,
			ingredients: ingredients.toArray()
		})
		.done(onSuccessOrder)
		.error(onError);
	},
	completeOrder: function(event) {
		event.preventDefault();

		$.post("completeOrder", {
			id: $(event.target).attr('id')
		})
		.done(onSuccess)
		.error(onError);
		$(event.target).remove()
	}
}

var loadEventHandlers = function(){
	$addIngred.submit(eventHandlers.addIngred);
	$inIngred.submit(eventHandlers.inIngred);
	$outIngred.submit(eventHandlers.outIngred);
	$editIngr.click(eventHandlers.editIngred);

	$ingredCheck.click(eventHandlers.ingredCheck);
	$order.submit(eventHandlers.submitOrder);

	$kitchenOrder.submit(eventHandlers.completeOrder)
}

//Code to run on load
loadEventHandlers();