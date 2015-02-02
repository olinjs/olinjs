var $ingredientform = $(".form-group.ingredient-form");

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
  formData = $ingredientform.serialize();
  var oldName = $ingredientform.attr('id');
  var newName = $ingredientform.find("[name='name']").val();
  var price   = $ingredientform.find("[name='price']").val();
  var available = $ingredientform.fin("[name='available']:checked").val() 
  formData = {
    oldName: oldName,
    newName: newName,
    price: price,
    available: available
   }
  $.get("postIngredient",formData)
    .done(onSuccess)
    .error(onError);
});
