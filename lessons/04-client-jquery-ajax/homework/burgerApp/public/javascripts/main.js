// var $form = $("#ajax-form");
var $ingForm = $('#new-ingredient');
var $ingredientList = $('#ingredient-list');
var $template = $('#ingredient-template');

var onOutOfStock = function(data) {
  console.log(data);
  var $target = $(data.target);
  var ingId = $target.attr("ing-id");
  $.post("/stock", {ingId: ingId})
    .done(onStockSuccess)
    .error(onError);
}

var onSuccess = function(data, status) {
  $('#result-new').html("<p>Success!</p>");
  var $newIngredient = $template.clone();

  $newIngredient.show();
  console.log(data);
  $newIngredient.find('.name').text("Ingredient: "+data.name);
  $newIngredient.find('.price').text("Price: "+data.price);
  $newIngredient.find('.stock').attr("ing-id", data._id).click(onOutOfStock);
  $newIngredient.attr('id', data._id);
  $ingredientList.append($newIngredient);
};

var onStockSuccess = function(data, status) {
  if (data.amount == false) {
    $('#'+data._id).css('color', 'red');
  }
  else {
    $('#'+data._id).css('color', 'black');
  }
}


var onError = function(data, status) {
  console.log("status", status);
  console.log("error", data);
};

$ingForm.submit(function(event) {
  event.preventDefault();
  var name = $ingForm.find("[name='ingredient']").val();
  var price = $ingForm.find("[name='price']").val();

  var formData = {
    name: name,
    price: price
  };

  $.post("/ingredients", formData)
    .done(onSuccess)
    .error(onError);
});
