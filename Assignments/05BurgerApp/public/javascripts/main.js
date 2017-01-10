
//----------------------------------------------------------------------------------
var $form = $("#add");
var totalAmount = 0;

var onSuccess = function(data, status) {
  var $ingredientsList = $('#ingredients-list');
  var $template = $('#template');
  var $templateLi = $template.children()[0];
  $templateLi = $($templateLi);
  var $newLi = $templateLi.clone();
  // console.log("onSuccess");
  // console.log(data["_id"]);
  $newLi.attr("id", data["_id"]);

  ($newLi.find(".delete")).find("input:button").attr("onclick", "deleteFunction('"+data["_id"]+"')");
  ($newLi.find(".update")).find("input:button").attr("onclick", "updateFunction('"+data["_id"]+"')");
  ($newLi.find(".outofstock")).find("input:button").attr("onclick", "outofStockFunction('"+data["_id"]+"')");
  ($newLi.find(".instock")).find("input:button").attr("onclick", "inStockFunction('"+data["_id"]+"')");

  $updateForm = $newLi.find(".update");
  $updateForm.attr("class", data["_id"]);
  $newLi.find('span.name').html(data['name']);
  $newLi.find('span.price').html(data['price']);
  $ingredientsList.append($newLi);
};

var onError = function(data, status) {
  console.log("status", status);
  console.log("error", data);
};

$form.submit(function(event) {
  event.preventDefault();
  formData = $form.serialize();
  var name = $form.find("#name").val();
  var price = $form.find("#price").val();
  formData = {
     name: name,
     price: price 
  }

$.post("addIngredients", formData)
    .done(onSuccess)
    .error(onError);
});


//----------------------------------------------------------------------------------

var updateFunction = function (id) {
  var $updateForm = $("." + id );
  formData = $updateForm.serialize();
  var name = $updateForm.find("#name").val();
  var price = $updateForm.find("#price").val();
  console.log(name);
  console.log(price);
  
  formData = {
     id: id,
     name: name,
     price: price
  }

$.post("updateIngredients", formData)
    .done(updateonSuccess)
    .error(onError);
}


var updateonSuccess = function(data, status) {
  
  var $newLi = $("#"+ data["_id"]);
  console.log("updateonSuccess");
  console.log(data["_id"]);
  // var name = $newLi.children("span.name").html();
  // var price = $newLi.children("span.price").html();
  
  var name = $newLi.find("span.name").html(data['name']);
  var price = $newLi.find("span.price").html(data['price']);
  

  // console.log(name);
  // console.log(price);
};


//----------------------------------------------------------------------------------


var deleteFunction = function (id) {

  console.log("deleteFunction");

  formData = {
     id: id
  }

$.post("deleteIngredients", formData)
    .done(deleteonSuccess)
    .error(onError);
}


var deleteonSuccess = function(data, status) {
  console.log("deleteonSuccess");
  console.log(data); 
  $( "#" + data).remove(); 
};


//----------------------------------------------------------------------------------


var outofStockFunction = function (id) {

  console.log("outofStockFunction");
  console.log(id);
  var $newLi = $("#"+ id);
  // var name = $newLi.children("span.name").html();
  // var price = $newLi.children("span.price").html();
  
  var name = $newLi.find("span.name").html();
  console.log(name)
  $newLi.find("span.name").html(name.strike()); 
  var price = $newLi.find("span.price").html();
  console.log(price);
  $newLi.find("span.price").html(price.strike()); 
  
  formData = {
     id: id
  }

$.post("outofStockIngredients", formData)
    .done(outofStockSuccess)
    .error(onError);
}


var outofStockSuccess = function(data, status) {
  console.log("outofStockSuccess");
  // console.log(data.status); 
  // $( "#" + data).remove(); 
};

//----------------------------------------------------------------------------------


var inStockFunction = function (id) {

  console.log("inStockFunction");
  console.log(id);


  formData = {
     id: id
  }

$.post("inStockIngredients", formData)
    .done(inStockSuccess)
    .error(onError);
}


var inStockSuccess = function(data, status) {
  console.log("inStockSuccess");
  //console.log(data["status"]); 
  console.log(data["_id"]);

  var $newLi = $("#"+ data["_id"]);
  console.log(data['name']);
  console.log(data['price']);

  $newLi.find("span.name").html(data['name']);
  $newLi.find("span.price").html(data["price"]); 
};
//----------------------------------------------------------------------------------

var placeOrder = function(){
  
  $ingredients = $(".inStock");
  $name = $("#name").val();
  $("#name").val("");
  // console.log($name);
  // $ingredients.each(function(){console.log($(this).find(".name").html())});
  
  // $ingredients.each(function(){console.log($(this).find(".price").html())});
  var ingredients = [];

  $ingredients.each(function(){
    $checkbox = $(this).find("input:checkbox")
    if ($checkbox.prop('checked')){
      ingredients.push($(this).find(".name").html());
      $checkbox.attr('checked', false);
    }
    
  });
  // console.log(ingredients);
  $totalPrice = $("#price");
  var totalAmount = $totalPrice.find(".price").html(); 
  $totalPrice.find(".price").html(0);

  $notificationMessage =$("#message")
  $notificationMessage.html("Thank you for your order!");

  formData = {
     name: $name,
     price: totalAmount,
     ingredients: ingredients
  }

$.post("placeOrders", formData)
    .done()
    .error(onError);
}


var updateOrder = function(id){
  // console.log("updateOrder");
  // console.log(id);
  $ingredient = $("#"+id);
  // console.log($ingredient.html());
  $name = $ingredient.find("span.name").html();
  $price = $ingredient.find("span.price").html();
  totalAmount += parseFloat($price);
  // console.log(totalAmount);
  $totalPrice = $("#price");
  $totalPrice.find(".price").html(totalAmount);

}



//----------------------------------------------------------------------------------

var completeOrders = function(id){
  console.log("completeOrder");
  console.log(id);

  formData = {
     id: id
  }

$.post("completeOrders", formData)
    .done(completeOrderSuccess)
    .error(onError);
}


var completeOrderSuccess = function(data, status) {
  console.log("completeOrderSuccess");
  $( "#" + data).remove();   
};
