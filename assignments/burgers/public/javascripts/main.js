var $form = $("#Add");
console.log($form);

var onSuccess = function(data, status) {
  console.log('Test')
  console.log(data[0]);
  console.log(data[1]);
  // var text = "<h1>" + data + "</h1>";
  // $("#result").html(text);

    var text = 
    "<li>Ingredient " + data[0] + " costs "+ data[1] + "!</li>" + 
    "<form id=\"{{this.name}}-ajax-form\" action=\"\" method=\"\">" + 
    "Edit: <input type=\"text\" name=\"ingredient\"/>" +
            "<input type=\"number\" name=\"price\"/> <br/>"+
          "<input type=\"submit\" value=\"Submit\">" +
          "</form>"

    $("#addresult").html(text);
};

var onError = function(data, status) {
  console.log("status", status);
  console.log("error", data);
};

$form.submit(function(event) {
  console.log('hello');
  //jquery here, parse request

  var ingrname = $form.find("[name=\"ingredient\"]").val();
  var ingrprice = $form.find("[name=\"price\"]").val();

  console.log([ingrname, ingrprice]);

  event.preventDefault();
  $.get("addIngredient", {
    name: ingrname,
    price: ingrprice,
  }) 
    .done(onSuccess)
    .error(onError);
});