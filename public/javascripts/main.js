var $ingredientform = $(".form-inline.ingredient-form");

console.log("javascript");

var onSuccess = function(data, status) {
};

var onError = function(data, status) {
  console.log("status", status);
  console.log("error", data);
};

$ingredientform.submit(function(event) {
  console.log("form submitted");
  event.preventDefault();
  //formData = $ingredientform.serialize();
  var id      = $ingredientform.attr('id');
  var newName = $ingredientform.find("[name='name']").val();
  var price   = $ingredientform.find("[name='price']").val();
  var available = $ingredientform.find("[name='available']").prop('checked');
  var formData = {
    id: id,
    newName: newName,
    price: price,
    available: available
   };
  console.log(formData);
  $.post("postIngredient", formData)
    .done(onSuccess)
    .error(onError);
});
