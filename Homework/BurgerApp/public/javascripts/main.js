var $newIngForm = $("#add-ingredient");
var $outOfStockForm = $(".remove-ingredient");
var $templateLi = $('#hidden-template-li');
var $ingredientList = $('#ingredient-list');


// $outOfStockForm.submit(function(event) {
//   event.preventDefault();
  
// });

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

  // Get the information from the form
  var ingredient = formData.ingredient;
  var price = formData.price;
  
  // Fill in the template li with the information from the form
  var $newLi = $templateLi.clone();
  $newLi.removeAttr('style');
  $newLi.find('.ingredient').html(ingredient);
  $newLi.find('.price').html(price);


  // Insert the modified template into the page
  $ingredientList.append($newLi);
  
  // Clear the form fields
  $newIngForm[0].reset();

});



var onAddSuccess = function(data, status) {

};

var onError = function(data, status) {
  console.log("status", status);
  console.log("error", data);
};

