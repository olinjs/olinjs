//Error function
var onError = function(data, status) { 
  console.log('status', status);
  console.log('error', data);
}

//jQuery ids and classes
var $newIngForm = $("#add-ingredient");
var $templateLi = $('#hidden-template-li');
var $ingredientList = $('#ingredient-list');
var $addToOrder = $('#orderIngredients');
var $submitOrder = $('#submitOrder');
var $completeOrder = $('.orderList');

//variables used to keep track of orders
var orderIngs = [];
var totalPrice = 0;


$newIngForm.submit(function(event) {
  //Creates a value-key array for form inputs
  event.preventDefault();

  formData = $newIngForm.serializeArray().reduce(function(obj, item) {
    obj[item.name] = item.value;
    return obj;
  }, {});

  var ingredient = formData['ingredient'];
  var price = formData['price'];

  // Fill in the template li with the information from the form
  var $newLi = $templateLi.clone();
  $newLi.removeAttr('style');
  $newLi.find('.ingredient').html(ingredient);
  $newLi.find('.price').html(price);

  // Insert the modified template into the page
  $ingredientList.append($newLi);
  
  // Clear the form fields
  $newIngForm[0].reset();

  $.post('/ingredients/add', formData) 
    .done()
    .error(onError);
});

$('body').on('click', '.remove-button', function(){
  //Changes an ingredient to out of stock when button is clicked
  formId = $(this).parent().attr('id');
  $.post('ingredients/remove', {formId:formId})
    .done()
    .error(onError);
});

$('body').on('click', '.add-button', function(){
  //Changes an ingredient to back in stock when button is clicked
  formId = $(this).parent().attr('id');
  $.post('ingredients/addBack', {formId:formId})
    .done()
    .error(onError);
});

$('body').on('click', '.edit-button', function(){
  //User can edit ingredient when edit button is clicked
  var newName = $(this).siblings("#ingredient").html();
  var newPrice = $(this).siblings("#price").html().slice(1);
  var formId = $(this).parent().attr('id');

  var name = prompt("Please enter the new ingredient name:", newName);
  if (name != "") {
    newName = name;
  }
  var price = prompt("Please enter the new price:", newPrice);
  if (price != "") {
    newPrice = price;
  }

  $("#"+formId).find('#ingredient').html(newName);
  $("#"+formId).find('#price').html("$"+newPrice);
  
  //sends ajax post request
  $.ajax({
    type: 'POST',
    url: '/ingredients/edit',
    data: {
              formId: formId, 
              name: name,
              price: price 
            },
    dataType: 'json',
    cache: false,
    success: function(data) {
      console.log('Successfully added');
    },
    error: function(xhr, status, err) {
      console.error(status, err.toString());
    }
  });
});


// $addToOrder.click(function(event) {
$('body').on('change', ':checkbox', function(){
  // if($addToOrder.attr('checked')) {
  if (this.checked) {
    var price = Number($('#total-price').html()) + Number($(this).parent().children('#price-wrapper').children('#price').html());
    orderIngs.push($(this).parent().children('#ingredient-wrapper').children('#ingredient').html());
  } else {
      var price = Number($('#total-price').html()) - Number($(this).parent().children('#price-wrapper').children('#price').html());
      var index = orderIngs.indexOf($(this).parent().children('#ingredient-wrapper').children('#ingredient').html());
      if (index > -1) {
        orderIngs.splice(index, 1);
      }
  }  
  $('#total-price').html(price);
  totalPrice = price;
});


$submitOrder.submit(function(event) {
  //Creates a new order
  $.post('orders/newOrder', {ingredients: orderIngs, price: totalPrice})
    .done()
    .error(onError);
});

$('li').on('submit', $completeOrder, function(){
  //submits an order to the kitchen when button is clicked
    formId = $(this).attr('id');
    //sends post request to add order to db
    $.post('kitchen/completeOrder', {id: formId})
      .done()
      .error(onError);
});
