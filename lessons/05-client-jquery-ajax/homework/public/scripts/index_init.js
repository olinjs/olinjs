//Toggle visibility of create ingredient menu
function createIngredient() {
	var element = $('#add_ingredient_menu');
	if (element.css("display") == "none") {
		element.css("display", "block");
	} else {
		element.css("display", "none");
	}
}

function fetchIngredients(div_id, content_generator) {
	$.ajax({
		type: "GET",
		url: "./ingredients",
		success: function(ingredients, status) {
			$('#' + div_id).html(content_generator(ingredients));
		},
		error: function(err) {
			console.log(err);
		}
	});
}

function addIngredient(name, price) {
	if (name.length > 0 && !isNaN(price)) {
		var ingredient_data = {"name": name, "price": price, "stock": true};

		$.ajax({
			type: "POST",
			contentType: "application/json",
			url: "./ingredients/new",
			data: JSON.stringify(ingredient_data),
			success: function(ingredients, status) {
				$('#ingredients_list').html(genIngredientsList(ingredients));
			},
			error: function(err) {
	            console.log(err);
	        }
		});
	}
}

//Take list of ingredients and generate html list of ingredients
function genIngredientsList(ingredients) {
	var list = ''.concat(
		'<table style="width: 100%">',
		'<tr>',
		'<td><strong>Ingredient</strong></td>',
		'<td><strong>Price</strong></td>',
		'<td><strong>Out of Stock?</strong></td>',
		'<td><strong>Remove Ingredient</strong></td>',
		'</tr>'
	);
	$.each(ingredients, function(index, ingredient) {
		list += ''.concat(
			'<tr id="ingredient_',
			index,
			'" style="text-decoration: ',
			(ingredient.stock ? "none" : "line-through"),
			'"">',
			'<td>', ingredient.name, '</td>',
			'<td>', '$', ingredient.price, '</td>',
			'<td><input type="checkbox" onclick="toggleIngredientAvailability(\'', index, '\',\'', ingredient.name, '\')"',
				(ingredient.stock ? "" : "checked"), '>',
			'</td>',
			'<td>', '<button type="button" onclick="removeIngredient(\'', ingredient.name, '\')">Remove</button>', '</td>',
			'</tr>'
		);
	});
	list += '</table>';
	return list;
}

//Similar to genIngredientsList but creates a simpler list designed for placing orders
function genOrderingList(ingredients) {
	var list = ''.concat(
		'<table style="width: 100%">',
		'<tr>',
		'<td><strong>Ingredient</strong></td>',
		'<td><strong>Price</strong></td>',
		'<td><strong>Include?</strong></td>',
		'</tr>'
	);
	$.each(ingredients, function(index, ingredient) {
		list += ''.concat(
			'<tr style="text-decoration: ', (ingredient.stock ? "none" : "line-through"), '">',
			'<td>', ingredient.name, '</td>',
			'<td>', '$', ingredient.price, '</td>',
			'<td><input type="checkbox" data-ingredient="', ingredient.name, '" value="', ingredient.price, '" onclick="addIngredientToOrder(this)" class="order_ingredients"', (ingredient.stock ? "" : "disabled"), '></td>',
			'</tr>'
		);
	});
	list += '<table></br>';
	list += '<span>Total: $</span><span style="font-weight: bold" id="order_total">0</span>';
	// list += ''.concat(
	// 	'<div style="width: 100%; text-align: right"></div>'
	// );
	return list;
}

//Add price of ingredient to running total
function addIngredientToOrder(element) {
	var price = Number(element.value); //Every checkbox has the value of its ingredient encoded into it
	var total = Number($('#order_total').html()); //Draw total directly from span
	$('#order_total').html(($(element).prop('checked') ? total + price : total - price)); //Either add or subtract the price of the ingredient from the total
}

//Set an ingredient as out of stock or in stock
function toggleIngredientAvailability(index, name) {
	//Toggle the strikethrough of the ingredient in the list of the ingredients
	var element = $('#ingredient_' + index);
	element.css("text-decoration", (element.css("text-decoration") == "none" ? "line-through" : "none"));

	//Send request to set ingredient to out of stock or in stock
	var ingredient_data = {"name": name};
	$.ajax({
		type: "POST",
		contentType: "application/json",
		url: "./ingredients/stock",
		data: JSON.stringify(ingredient_data),
		error: function(err) {
            console.log(err);
        }
	});
}

function removeIngredient(name) {
	var ingredient_data = {"name": name};
	$.ajax({
		type: "DELETE",
		contentType: "application/json",
		url: "./ingredients/remove",
		data: JSON.stringify(ingredient_data),
		success: function(ingredients) {
			$('#ingredients_list').html(genIngredientsList(ingredients));
		},
		error: function(err) {
			console.log(err);
		}
	});
}

//Finalize and submit order to kitchen
function makeOrder() {
	var price = $('#order_total').html(); //Draw total directly from span
	if(confirm("Are you sure you want to place an order for $" + price + "?")) {
		var ingredients_in_order = [];
		$(".order_ingredients:checked").each(function(index, element) {
			ingredients_in_order.push($(element).data("ingredient"));
		});
		var orderData = {"ingredients": ingredients_in_order, "price": price};
		
		$.ajax({
			type: "POST",
			contentType: "application/json",
			url: "./orders/new",
			data: JSON.stringify(orderData),
			success: function(res) {
				alert(res.message);
			},
			error: function(err) {
				console.log(err);
			}
		});
	}
}

function fetchOrders(div_id, content_generator) {
	$.ajax({
		type: "GET",
		url: "./orders",
		success: function(orders, status) {
			$('#' + div_id).html(content_generator(orders));
		},
		error: function(err) {
			console.log(err);
		}
	});
}

function genOrdersList(orders) {
	var list = ''.concat(
		'<table style="width: 100%">',
		'<tr>',
		'<td><strong>Order</strong></td>',
		'<td><strong>Ingredients</strong></td>',
		'<td><strong>Price</strong></td>',
		'<td><strong>Process</strong></td>',
		'</tr>'
	);
	$.each(orders, function(index, order) {
		list += ''.concat(
			'<tr>',
			'<td>', index + 1, '</td>',
			'<td>', order.ingredients, '</td>',
			'<td>', '$', order.price, '</td>',
			'<td>', '<button type="button" onclick="removeOrder(\'', order['_id'], '\')">Fulfill</button>', '</td>',
			'</tr>'
		);
	});
	list += '</table>';
	return list;
}

//Tell the kitchen to remove an order defined by its unique db key
function removeOrder(uid) {
	var order_data = {"id": uid};
	$.ajax({
		type: "DELETE",
		contentType: "application/json",
		url: "./orders/remove",
		data: JSON.stringify(order_data),
		success: function(orders) {
			$('#orders_list').html(genOrdersList(orders));
		},
		error: function(err) {
			console.log(err);
		}
	});
}

$(document).ready(function() {
	$(".various").fancybox({
		maxWidth	: 800,
		maxHeight	: 600,
		fitToView	: false,
		width		: '70%',
		height		: '70%',
		autoSize	: false,
		closeClick	: false,
		openEffect	: 'none',
		closeEffect	: 'none'
	});
});