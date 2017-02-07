var $ingForm = $('#new-request');
var $ingredientList = $('#ingredient-list');
var $ingredientTemplate = $('#ingredient-template');
var $checkboxTemplate = $('#box');
var $orderList = $('#boxes');
var $orderForm = $('#order-form');
var $kitchenTemplate = $('#kitchen-template');
var $orders = $('#all-orders');

var onOutOfStock = function(data) {
  // called when out of stock button is clicked
  var $target = $(data.target); // the checkbox
  var ingId = $target.attr("ing-id"); // finds the id of the ingredient
  $.post("/stock", {ingId: ingId})
    .done(onStockSuccess) // calls function to determine text color of the list item
    .error(onError);
}

var onCheckIng = function(data) {
  var $total = $("#total");
  var total = Number($total.attr('value'))
  var $checkBox = $("#" + data._id).find(".ingredient-choice");
  console.log($checkBox.is(":checked"));
  if (($checkBox).is(":checked")) {
    total += data.price;
  }
  else {
    total -= data.price;
  }
  console.log(total);
  $total.attr('value', total);
  $total.text("$"+total.toFixed(2));
}

var onCheckOrder = function(data) {
  var $target = $(data.target); // the checkbox
  var checkId = $target.parent().attr('id');
  $.post("/checked", {checkId: checkId}).done(onCheckIng).error(onError);
}

var onHomeLoad = function(data) {
  // populates page with all ingredients in database
  // data is a list of ingredient objects
  for (var i = 0; i < data.length; i++) {
    // create a new list item in ingredient list
    var $newIngredient = $ingredientTemplate.clone();
    $newIngredient.show();  // make the item visible
    if (data[i].amount == false) {
      // turn text red and check box if the item is out of stock
      $newIngredient.css('color', 'red');
      $newIngredient.find('.stock').attr('checked', true);
    }
    // display name in name div
    $newIngredient.find('.name').text("Ingredient: "+data[i].name);
    // display price in price div
    $newIngredient.find('.price').text("Price: $"+data[i].price.toFixed(2));
    // assign ing-id of checkbox of id number of data object
    $newIngredient.find('.stock').attr("ing-id", data[i]._id).click(onOutOfStock);
    // assign id of list item to id number of data object
    $newIngredient.attr('id', data[i]._id);

    // add new list item to the ingredient list
    $ingredientList.append($newIngredient);
  }
}

var onOrderUpdate = function(data) {
  // adds new checkbox to order form when new ingredient requested
  for (var i = 0; i < data.length; i++) {
    // create a new checkbox from template
    var $newCheckbox = $checkboxTemplate.clone();
    // make checkbox visible
    $newCheckbox.show();
    // assign the id to be the id of the new ingredient
    $newCheckbox.attr('id', data[i]._id);
    // designate label for the new checkbox
    $newCheckbox.find(".ing-name").attr('for', data[i]._id);
    // label checkbox with new ingredient name and price
    $newCheckbox.find(".ing-name").text(data[i].name+" $"+data[i].price.toFixed(2));
    if (data[i].amount == false) {
      // disable checkbox if the ingredient is out of stock
      $newCheckbox.find(".ingredient-choice").attr("disabled", true);
    }
    // add new checkbox to order list
    $orderList.append($newCheckbox);
    $newCheckbox.find(".ingredient-choice").click(onCheckOrder);
  }
}

var onSuccess = function(data, status) {
  // create a new ingrdient list item from template
  var $newIngredient = $ingredientTemplate.clone();
  //make it visible
  $newIngredient.show();
  // add text that shows name and price of the ingredient
  $newIngredient.find('.name').text("Ingredient: "+data.name);
  $newIngredient.find('.price').text("Price: "+data.price.toFixed(2));
  // assign the ingredient id of the checkbox to be the ingredient id
  $newIngredient.find('.stock').attr("ing-id", data._id).click(onOutOfStock);
  // assign the id of the list item to be the ingredient id
  $newIngredient.attr('id', data._id);
  // add new list item to the list
  $ingredientList.append($newIngredient);
}

var onKitchenLoad = function(data, status){
  for (var i = 0; i < data.length; i++) { 
    if (data[i].completed == false) {

      var ingredientIds = {
        ids: JSON.stringify(data[i].ingredients)
      };

      $.post("kitchen/refs", ingredientIds)
        .done(refIngredients)
        .error(onError);
      }
  }
}

var refIngredients = function(data, status) {
  var names = [];
  for (var j = 0; j < data.names.length; j++) {
    names.push(data.names[j].name);
  } 
  $listItem = $kitchenTemplate.clone()
  $listItem.removeAttr('id');
  $listItem.show();
  $listItem.find(".one-ingredient").text(JSON.stringify(names));
  $listItem.find(".completed").click(onCompleted);
  $orders.append($listItem);
}

var onCompleted = function(data) {
  var $target = $(data.target);
  var $toDelete = $target.parent();
  $toDelete.remove();
}

var onStockSuccess = function(data, status) {
  // determines the text color of the list item in ingredient-list
  if (data.amount == false) {
    $('#'+data._id).css('color', 'red');
  }
  else {
    $('#'+data._id).css('color', 'black');
  }
}


var onError = function(data, status) {
  // handles request errors
  console.log("status", status);
  console.log("error", data);
};

$(document).ready(function() {
  // updates the pages with database information
  $.post("/order", {})  // updates with new ingredients
    .done(onOrderUpdate)
    .error(onError);
  $.post("/", {})
    .done(onHomeLoad) //loads all ingredients in the database to page
    .error(onError);
  $.post("/kitchen", {})
    .done(onKitchenLoad)
    .error(onError);
});

$ingForm.submit(function(event) {
  // when the request ingredient form is submitted
  event.preventDefault();
  //from the name field
  var name = $ingForm.find("[name='ingredient']").val();
  //from the price field
  var price = $ingForm.find("[name='price']").val();

  // create an object to pass to the post request
  var formData = {
    name: name,
    price: price
  };

  // post request to ingredients route
  $.post("/ingredients", formData)
    .done(onSuccess)  // adds new ingredient to ingredient list
    .error(onError);
});

$orderForm.submit(function(event) {
  event.preventDefault();
  var listOrder = [];
  orderIngredients = $(".ingredient-choice:checkbox:checked").each(function() {
    listOrder.push($(this).parent().attr('id'));
  });
  
  var formData = {
    ingredients: JSON.stringify(listOrder)
  };

  $.post("/order/new", formData)
    .done(function(data) {
      console.log(data);
    })  // adds new ingredient to ingredient list
    .error(onError);
});
