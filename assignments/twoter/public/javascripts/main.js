
var $loginform = $("#login");
console.log($loginform);

var onLoginSuccess = function(data, status) {
  //console.log('User logged in: ' + data.username)
  window.location.href = '/home'
  //currentuser = data.username;
}

var onError = function(data, status) {
  console.log("status", status);
  console.log("error", data);
};

$loginform.submit(function(event) {

  var username = $loginform.find("[name=\"username\"]").val();

  event.preventDefault()
  $.post("auth", {  
    name: username,
  }) 
    .done(onLoginSuccess)
    .error(onError);
});

var onNewTwoteSuccess = function(data, status) {
  console.log('New twote successfully added!')
  console.log('User: ' + data.user)
  console.log('Text: ' + data.text)
  console.log('Date: ' + data.datetime)

  var text = "<div id='" + data._id + "-twote'>" + 
            "<li>User " + data.user + " said " + data.text + "</li>" + 
            "<input type='submit' value='Delete'>"
            "</div>"

  // $("#allTwotes").append(text);
  $("#allTwotes").prepend(text);

}

var currentuser = $("#userLoggedIn").attr('username')
console.log('Current user logged in: ' + currentuser);

var removeDeleteButtons = function(usrname) {
  console.log("Removing delete button!")
  $("#" + usrname + "-twote-delete").remove();
}

removeDeleteButtons(currentuser);

var $newtwoteform = $("#new");
console.log($newtwoteform);

$newtwoteform.submit(function(event) {
  var twotetext = $newtwoteform.find("[name=\"twotetext\"]").val();
home
  console.log(twotetext);

  event.preventDefault()
  $.post("newTwote", {
    text: twotetext,
  })
  .done(onNewTwoteSuccess)
  .error(onError)
});