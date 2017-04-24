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
  });
});

$(".form-out").submit(function(event){
  event.preventDefault();
  var div = $(this).parent();
  div.hide();
  $.post('outIngredient',{
    id: div.attr('id'),
  }).done(function(data){});
})

$(".form-edit").submit(function(event){
  event.preventDefault();
  var div = $(this).parent();
  var editName = div.children()[0].value;
  var editPrice = parseInt(div.children()[1].value);
  var id = div.attr('id');
  $.post('editIngredient',{
    name: editName,
    price: editPrice,
    id: id
  }).done(function(data){
    var div = $(this).parent();
    div.children()[0].value = data.name;
    div.children()[1].value = data.price.toString();
  });
})

$(".checkbox").change(function(event){
  event.preventDefault();
  var id = $(this).attr('id');
  var checked = this.checked
  $.post('checkbox',{
    id: id,
    state: checked
  }).done(function(data){
    $('#total').text('Total: $' + data.total)
  }).error(function(err){
    console.log(err)
  })
})

$("#addOrder").submit(function(event){
  event.preventDefault();
  var checked = $('.checkbox');
  var ingrs = '';
  for (i=0;i<checked.length;i++){
    if (checked[i].checked){
      ingrs += checked[i].name + ' ';
    }
  }
  $.post('newOrder',{
    ingredients: ingrs
  }).done(function(data){
    $('#submitMessage').text('Order complete!')
    for (i=0;i<checked.length;i++){
      checked[i].checked = false;
    }
  })
})

$(".orderForm").submit(function(event){
  event.preventDefault();
  var button = $(this).attr('id');
  var div = $(this).parent();
  div.hide();
  $.post('removeOrder',{
    id: button
  })
})
