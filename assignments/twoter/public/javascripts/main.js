
var $loginform = $("#login");
console.log($loginform);



var onError = function(data, status) {
  console.log("status", status);
  console.log("error", data);
};

$loginform.submit(function(event) {

  var username = $loginform.find("[name=\"username\"]").val();

  $.post("auth", {  
    name: username,
  }) 
    .done()
    .error(onError);
});