var $ingredientform = $(".ingredient-form");

var onSuccess = function(data, status) {
  var img = "<img src='"+data+"'/>";
  $("#result").html(img);
};

var onError = function(data, status) {
  console.log("status", status);
  console.log("error", data);
};

$ingredientform.submit(function(event) {
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
