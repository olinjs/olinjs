
var $addform = $("#Add");
console.log($addform);


var onAddSuccess = function(data, status) {
  //console.log('Test')
  var ingrname = data[0];
  var ingrprice = data[1];
  var ingrid = data[2];

    var text = 
    "<div id=\"" + ingrid + "-ingredientform\">" + 
    "<div id=\"" + ingrid + "-editresult\">" + 
    "<li>Ingredient " + ingrname + " costs "+ ingrprice + "!</li>" + 
    "<form id=\"" + ingrid + "-ajax-form\" class=\"editForm\" action=\"editIngredient\" method=\"GET\">" + 
    "Edit: <input type=\"text\" name=\"name\"/>" +
            "<input type=\"number\" name=\"price\"/> <br/>"+
          "<input type=\"submit\" value=\"Submit\">" +
          "</form>"+
        "</div>"+

    "<div id=\"" + ingrid + "-remove\">" + 
      "<form id = \"" + ingrid + "-instock\" class=\"inStockForm\" action=\"removeIngredient\" method=\"GET\">" + 
          "Out Of Stock: <input type=\"submit\" value=\"Out of Stock\">"+
      "</form>"+
    "</div>" + 
        "<br></br>" + 
    "</div>"

    //$("#newresult").html(text);
    $("#Alldaforms").append(text);
};

var onError = function(data, status) {
  console.log("status", status);
  console.log("error", data);
};

$addform.submit(function(event) {
  //console.log('hello');
  //jquery here, parse request

  var ingrname = $addform.find("[name=\"name\"]").val();
  var ingrprice = $addform.find("[name=\"price\"]").val();

  //console.log([ingrname, ingrprice]);

  event.preventDefault();
  $.get("addIngredient", {  //!!!!!
    name: ingrname,
    price: ingrprice,
  }) 
    .done(onAddSuccess)
    .error(onError);
});



var onEditSuccess = function(data, status) {
  //console.log('Test')

  var ingrname = data[0];
  var ingrprice = data[1];
  var ingrid = data[2];

  // var text = "<h1>" + data + "</h1>";
  // $("#result").html(text);

    var text = 
  "<li>Ingredient " + ingrname + " costs "+ ingrprice + "!</li>" + 
    "<form id=\"" + ingrid + "-ajax-form\" class=\"editForm\" action=\"editIngredient\" method=\"GET\">" + 
      "Edit: <input type=\"text\" name=\"name\"/> " + 
            "<input type=\"number\" name=\"price\" /> <br/>" +
      "<input type=\"submit\" value=\"Submit\">" +
    "</form>" 

  //console.log(text);

  $("#"+ingrid+"-editresult").html(text);
  //console.log("#"+ingrid+"-editresult");

};

//how to find which form????
var $editform = $("#Alldaforms");
//console.log($editform);

$editform.on("submit", ".editForm", function(event) {
  //console.log('editing');

  var $thisform = $(event.target).closest('form');

  var ingrname = $thisform.find("[name=\"name\"]").val();
  var ingrprice = $thisform.find("[name=\"price\"]").val();
  var ingrid = $thisform.attr('id');

  //console.log([ingrname, ingrprice, ingrid]);

  event.preventDefault();
  $.get("editIngredient", {  //!!!!!
    name: ingrname,
    price: ingrprice,
    id: ingrid,
  }) 
  .done(onEditSuccess)
  .error(onError);

});

var onRemoveSuccess = function(data, status) {
  //console.log('Test');
  //console.log(data);

  var text = ""
  $("#"+data+"-ingredientform").html(text);

};

$editform.on("submit", ".inStockForm", function(event) {
  //console.log('Removing');
  var $thisform = $(event.target).closest('form');

  var ingrid = $thisform.attr('id');

  //console.log(ingrid);

  event.preventDefault();
  $.get("removeIngredient", {
    id: ingrid
  })
  .done(onRemoveSuccess)
  .error(onError);

});

var $neworder = $("#NewOrder");

var onOrderSuccess = function(data, status) {
  //console.log('Testing');
  ordername = data[0];
  components = data[1];
  orderid = data[2];
  //console.log();

  var text = "Thanks for submitting! Your order is as follows: <br></br>"+
  "Order Name: " + ordername + "<br></br>" + 
  "Order Components: " + components + "<br></br>" + 
  "Order ID: " + orderid
  $("#submitted").html(text);
}


$neworder.submit(function(event) {
  //console.log('submitting');

  var ordername = $neworder.find("[name=\"name\"]").val();

  var selected = [];
  $('#checkboxes input:checked').each(function() {
      selected.push($(this).attr('id'));
  });

  event.preventDefault();
  $.get("createOrder", {
    name: ordername,
    ingredients: selected
  })
  .done(onOrderSuccess)
  .error(onError);

})

var onItemAddSuccess = function(data, status) {
  //console.log("Cost count")
  //console.log(data)

  var text = "Current order cost: " + data;
  $("#costcount").html(text);
}


$(".checkbox").change(function(event) {
  //console.log("Adding item to order")

  var selected = [];
  $('#checkboxes input:checked').each(function() {
      selected.push($(this).attr('id'));
  });
  //console.log(selected);

  event.preventDefault();
  $.get("addItemToOrder", {
    ingredients: selected
  })
  .done(onItemAddSuccess)
  .error(onError)
})


var $completeform = $("#AllOrders");

var onOrderCompleteSuccess = function(data, status) {
  //console.log('Test');
  //console.log(data);

  var text = ""
  $("#"+data+"-order").html(text);

};

$completeform.on("submit", ".completeForm", function(event) {
  //console.log('Removing');
  var $thisform = $(event.target).closest('form');

  var orderid = $thisform.attr('id');

  //console.log(orderid);

  event.preventDefault();
  $.get("orderComplete", {
    id: orderid
  })
  .done(onOrderCompleteSuccess)
  .error(onError);

});