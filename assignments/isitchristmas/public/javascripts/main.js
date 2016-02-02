var $form = $("#ajax-form");
console.log($form);

var onSuccess = function(data, status) {
  console.log('Test')
  var text = "<h1>" + data + "</h1>";
  $("#result").html(text);
};

var onError = function(data, status) {
  console.log("status", status);
  console.log("error", data);
};

$form.submit(function(event) {
  console.log('hello');
  event.preventDefault();
  $.get("isItXmas")
    .done(onSuccess)
    .error(onError);
});