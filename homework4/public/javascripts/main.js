var $form = $("#ajax-form");

$form.submit(function(event) {
  event.preventDefault();
  var myName =$form.find("[name='addName']").val();
  var myPrice=$form.find("[name='addPrice']").val();
  $.post("postIngredient", {
    name: myName,
    price: myPrice
  }).done(function(data){
    var div =$('div').first().clone();
    div.attr('id', data._id);
    console.log(div.children())
    div.children()[0].value = data.name;
    div.children()[1].value = data.price.toString();
    div.children()[3].value = data._id;
    div.children()[4].value = data._id;
    $('#ingredientList').append(div);
  })
});

$(".form-out").submit(function(event){
  event.preventDefault();
  var div = $(this).parent();
  div.hide();
})

$(".form-edit").submit(function(event){
  event.preventDefault();
  var div = $(this).parent();
  var editName = div.children()[0].value;
  var editPrice = parseInt(div.children()[1].value);
  $.post('editIngredient',{
    name: editName,
    price: editPrice
  }).done(function(data){
  });
})
