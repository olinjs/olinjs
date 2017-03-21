var $newIngForm = $("#add-ingredient");
var $outOfStockForm = $(".remove-ingredient");
var $editForm = $("input.edit-button");
var $templateLi = $('#hidden-template-li');
var $templateLiOut = $('#hidden-template-li-out');
var $ingredientList = $('#ingredient-list');
var $outOfStockList = $('#out-of-stock-list');
var $addToOrder = $('#orderIngredients');

$outOfStockForm.submit(function(event) {
  event.preventDefault();
  var formId = event.target.id;
  console.log(formId);
  $.post('/ingredients/remove', formId)
  // .done(outOfStock)
  // .error(onError);
});

$editForm.submit(function(event) {
  event.preventDefault();
  // var formId = '#'+data;
  console.log(event.target);
  $.post('/ingredients/remove', event.target.id)
  // .done(outOfStock)
  // .error(onError);
});

$addToOrder.click(function(event) {
  if($addToOrder.attr('checked')) {
    var price = Number($('#total-price').html()) + Number(event.target.value);
  } else {
    var price = Number(event.target.value) - Number($('#total-price').html());
  }  
  $('#total-price').html(price);
})


$newIngForm.submit(function(event) {
  //Creates a value-key array for form inputs
  event.preventDefault();
  formData = $newIngForm.serializeArray().reduce(function(obj, item) {
    obj[item.name] = item.value;
    return obj;
}, {});

  $.post("/ingredients/add", formData) 
    .done(onAddSuccess)
    .error(onError);
});


var outOfStock = function(data, status) {
  // Get the information
  var id = data.id;
  console.log($('#'+id));
  // Fill in the template li with the information from the form
  // var $newLiOut = $templateLiOut.clone();
  // $newLiOut.removeAttr('style');
  // $newLiOut.find('.ingredient').html(ingredient);
  // $newLiOut.find('.price').html(price);

  // // Insert the modified template into the page
  // $outOfStockList.append($newLi);
};

var onAddSuccess = function(data, status) {
  // Get the information from the form
  var ingredient = data.ingredient;
  var price = data.price;
  
  // Fill in the template li with the information from the form
  var $newLi = $templateLi.clone();
  $newLi.removeAttr('style');
  $newLi.find('.ingredient').html(ingredient);
  $newLi.find('.price').html(price);

  // Insert the modified template into the page
  $ingredientList.append($newLi);
  
  // Clear the form fields
  $newIngForm[0].reset();
};

var onError = function(data, status) {
  console.log("status", status);
  console.log("error", data);
};

