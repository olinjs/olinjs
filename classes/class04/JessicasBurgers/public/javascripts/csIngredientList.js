// Toggles between being in stock and running out of stock.
$(".toggle-stock").click(function(event){
  var idClicked = $(event.target).attr('class').split(/\s+/)[1];

  event.preventDefault();
  $.post("toggle-ingredient", {
    id: idClicked 
  })
    .done(onSuccess)
    .error(onError);
});

// Collect the new information of an edit of a changed ingredient.
function getEdits(itemName, itemPrice) {
  var newName = prompt('Please enter your new name', itemName);
  var newPrice = prompt('Please enter your new price', itemPrice);

  if (name != null && name != "") {
      alert(name);
  }
  return [newName, newPrice];
}

// Set success and error actions of our AJAX request.
var onSuccess = function(data, status) {
  $("#ingredient_list").html(data);
};

var onError = function(data, status) {
  $("#ingredient_list").html("Error world!");
};

// Post the changed infromation to the server and update the database.
$(".edit-ingredient").click(function(event){

  // Collect the information needed for an edit.
	var idClicked = $(event.target).attr('id');
	var itemName = $(event.target).attr('name');
	var itemPrice = $(event.target).attr('price');


  // Then collect information from the prompt.
	var editedInfo = getEdits(itemName, itemPrice);
	var newName = editedInfo[0];
	var newPrice = editedInfo[1];

  console.log(newName);
  console.log(newPrice);
  console.log(newName || newPrice);

  if (newName === null) {
    if (newPrice === null) {
      console.log("Oh shit.");
      return; //break out of the function early
    }
  }

  // Send updated ingredient information back to the server.
  event.preventDefault();
  $.post("ingredients", {
  	id: idClicked,
  	name: newName,
  	price: newPrice  		
  })
  	.done(function (data, status){
      $("#ingredient_list").html(data);
    })
  	.error(onError);
});

// Format money into currency.
$(".money").currency();