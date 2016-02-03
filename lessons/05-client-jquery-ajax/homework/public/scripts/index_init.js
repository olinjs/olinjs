//Toggle visibility of create ingredient menu
function createIngredient() {
	var element = $('#add_ingredient_menu');
	if (element.css("display") == "none") {
		element.css("display", "block");
	} else {
		element.css("display", "none");
	}
}

function fetchIngredients() {
	$.ajax({
		type: "GET",
		url: "./ingredients",
		success: function(ingredients, status) {
			$('#ingredients_list').html(genIngredientsList(ingredients));
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
				console.log(ingredients);
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
	console.log("Generating Ingredients List");
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
				'<td>',
				ingredient.name,
				'</td><td>',
				'$',
				ingredient.price,
				'</td><td>',
				'<input type="checkbox" onclick="toggleIngredientAvailability(\'',
				index,
				'\',\'',
				ingredient.name,
				'\')"',
				(ingredient.stock ? "" : "checked"),
				'>',
				'</td><td>',
				'<button type="button" onclick="removeIngredient(\'',
				ingredient.name,
				'\')">Remove</button>',
				'</td></tr>'
			);
	});
	list += '</table>';
	return list;
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
		success: function(ingredients, err) {
			console.log(ingredients);
			$('#ingredients_list').html(genIngredientsList(ingredients));
		},
		error: function(err) {
			console.log(err);
		}
	});
}

$(document).ready(function() {
	fetchIngredients();
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