
var $loginform = $("#login");
console.log($loginform);

var onLoginSuccess = function(data, status) {
  //console.log('User logged in: ' + data.username)
  console.log('On Login Success...')
  console.log(data)
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
  $.get("auth", {  
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
            data.user + " said: \"" + data.text + "\"" + 
            "<form id='" + data._id + "-delete' class='deleteButton' username=" + data.user + ">" + 
            "<input type='submit' value='Delete' class='delete'></form>" + 
            "</div>"

  // $("#allTwotes").append(text);
  $("#allTwotes").prepend(text);

}

var currentuser = $("#userLoggedIn").attr('username')
console.log('Current user logged in: ' + currentuser);

var removeDeleteButtons = function(usrname) {
  if(usrname) {
    console.log("Removing delete button!")
    var selectbuttons = $("[username=" + usrname + "].deleteButton")//$("#" + usrname + "-twote-delete");
    console.log('Select thingy ' + selectbuttons)

    //select.remove();
    //var deletebuttons = "<input type='submit' value='Delete'>"

    var deletebuttons = 
    //"<form id = '{{this.id}}-delete-twote' class='delete' action='deleteTwote' method='POST'>" + 
                        "<input type='submit' value='Delete' class='delete'>" //+ 
                        //"</form>"
    selectbuttons.append(deletebuttons);
  }

}

removeDeleteButtons(currentuser);

var $newtwoteform = $("#new");
console.log($newtwoteform);

$newtwoteform.submit(function(event) {
  var twotetext = $newtwoteform.find("[name=\"twotetext\"]").val();
//home
  console.log(twotetext);

  event.preventDefault()
  $.post("newTwote", {
    text: twotetext,
  })
  .done(onNewTwoteSuccess)
  .error(onError)
});

var $logoutform = $("#logOutButton")
console.log($logoutform)

var onLogoutSuccess = function(data, status) {
  //console.log('Logged out ' + data)
  window.location.href = '/home'
}

$logoutform.submit(function(event) {
  console.log('Log out button pressed!')
  event.preventDefault()
  $.get("logOut", {}).done(onLogoutSuccess).error(onError)
})

//do stuff to delete twotes here
//added html to identify twote delete removeDeleteButtons
//added simple printout for /deleteTwote

var onDeleteSuccess = function(data, status) {
  var text = ""
  //$("#" + data + "-twote").html(text)
  $("#" + data + "-twote").remove()
}

var $deleteform = $("#allTwotes")
console.log($deleteform)

$deleteform.on("click", ".deleteButton", function(event) {
  var $thisform = $(event.target).closest('form')
  var twoteid = $thisform.attr('id')
  console.log(twoteid)

  event.preventDefault()
  $.post('deleteTwote',{
    id: twoteid
  })
  .done(onDeleteSuccess)
  .error(onError)
})
