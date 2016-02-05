
var $addform = $("#Add");
console.log($addform);


var onAddSuccess = function(data, status) {
  console.log('Test')
  console.log(data[0]);
  console.log(data[1]);
  console.log(data[2]);
  // var text = "<h1>" + data + "</h1>";
  // $("#result").html(text);

    var text = 
    "<div id=\"" + data[2] + "-ingredientform\">" + 
    "<div id=\"" + data[2] + "-editresult\">" + 
    "<li>Ingredient " + data[0] + " costs "+ data[1] + "!</li>" + 
    "<form id=\"" + data[2] + "-ajax-form\" class=\"editForm\" action=\"editIngredient\" method=\"GET\">" + 
    "Edit: <input type=\"text\" name=\"name\"/>" +
            "<input type=\"number\" name=\"price\"/> <br/>"+
          "<input type=\"submit\" value=\"Submit\">" +
          "</form>"+
        "</div>"+

    "<div id=\"" + data[2] + "-remove\">" + 
      "<form id = \"" + data[2] + "-instock\" class=\"inStockForm\" action=\"removeIngredient\" method=\"GET\">" + 
          "Out Of Stock: <input type=\"submit\" value=\"Out of Stock\">"+
      "</form>"+
    "</div>" + 
    "</div>"

    //$("#newresult").html(text);
    $("#Alldaforms").append(text);
};

var onError = function(data, status) {
  console.log("status", status);
  console.log("error", data);
};

$addform.submit(function(event) {
  console.log('hello');
  //jquery here, parse request

  var ingrname = $addform.find("[name=\"name\"]").val();
  var ingrprice = $addform.find("[name=\"price\"]").val();

  console.log([ingrname, ingrprice]);

  event.preventDefault();
  $.get("addIngredient", {  //!!!!!
    name: ingrname,
    price: ingrprice,
  }) 
    .done(onAddSuccess)
    .error(onError);
});



var onEditSuccess = function(data, status) {
  console.log('Test')

  console.log(data[0]);
  console.log(data[1]);
  console.log(data[2]);
  // var text = "<h1>" + data + "</h1>";
  // $("#result").html(text);

    var text = 
  "<li>Ingredient " + data[0] + " costs "+ data[1] + "!</li>" + 
    "<form id=\"" + data[2] + "-ajax-form\" class=\"editForm\" action=\"editIngredient\" method=\"GET\">" + 
      "Edit: <input type=\"text\" name=\"name\"/> " + 
            "<input type=\"number\" name=\"price\" /> <br/>" +
      "<input type=\"submit\" value=\"Submit\">" +
    "</form>" 

  console.log(text);

  $("#"+data[2]+"-editresult").html(text);
  console.log("#"+data[2]+"-editresult");

};

//how to find which form????
var $editform = $("#Alldaforms");
//console.log($editform);

$editform.on("submit", ".editForm", function(event) {
  console.log('editing');

  var $thisform = $(event.target).closest('form');

  var ingrname = $thisform.find("[name=\"name\"]").val();
  var ingrprice = $thisform.find("[name=\"price\"]").val();
  var ingrid = $thisform.attr('id');

  console.log([ingrname, ingrprice, ingrid]);

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
  console.log('Test');
  console.log(data);

  var text = ""
  $("#"+data+"-ingredientform").html(text);

};

$editform.on("submit", ".inStockForm", function(event) {
  console.log('Removing');
  var $thisform = $(event.target).closest('form');

  var ingrid = $thisform.attr('id');

  console.log(ingrid);

  event.preventDefault();
  $.get("removeIngredient", {
    id: ingrid
  })
  .done(onRemoveSuccess)
  .error(onError);

});