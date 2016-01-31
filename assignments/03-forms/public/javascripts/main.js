//console.log("hello world");

var $form = $("#ajax-form");

var onSuccess = function(data, status) {
  var img = "<img src='"+data+"'/>";
  $("#result").html(img);
};

var onError = function(data, status) {
  console.log("status", status);
  console.log("error", data);
};

$form.submit(function(event) {
  event.preventDefault();
  var mood = $form.find("[name='mood']:checked").val();
  var name = $form.find("[name='name']").val();
  $.get("getCat", {
    mood: mood,
    name: name
  })
    .done(onSuccess)
    .error(onError);
});