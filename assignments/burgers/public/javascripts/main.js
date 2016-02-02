
var $insertform = $("#new-ajax-form");
var $addform = $("#Add");
console.log($addform);

var onSuccess = function(data, status) {
  console.log('Test')
  console.log(data[0]);
  console.log(data[1]);
  // var text = "<h1>" + data + "</h1>";
  // $("#result").html(text);

    var text = 
    "<li>Ingredient " + data[0] + " costs "+ data[1] + "!</li>" + 
    "<form id=\"{{this.name}}-ajax-form\" action=\"\" method=\"\">" + 
    "Edit: <input type=\"text\" name=\"name\"/>" +
            "<input type=\"number\" name=\"price\"/> <br/>"+
          "<input type=\"submit\" value=\"Submit\">" +
          "</form>"

    $("#newresult").html(text);
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
  $.get("addIngredient", {
    name: ingrname,
    price: ingrprice,
  }) 
    .done(onSuccess)
    .error(onError);
});