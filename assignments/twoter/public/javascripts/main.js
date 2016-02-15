
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

  var text = 
            "<div id='" + data._id +"-" + data.user + "-twote' " +"twoteuser='" + data.user +  "'>" + 
            data.user + " said: \"" + data.text + "\"" + 
            "<form id='" + data._id + "-delete' class='deleteButton' username='" + data.user + "'>" + 
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
  var twoteid = data[0];
  var twoteuser = data[1];
  var text = ""
  //$("#" + data + "-twote").html(text)
  $("#" + twoteid + "-" + twoteuser + "-twote").remove()
}


//DELETING TWOTES
var $alltwoteform = $("#allTwotes")
console.log($alltwoteform)

$alltwoteform.on("click", ".deleteButton", function(event) {
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

//HIGHLIGHTING ON CLICK
var $allusers = $("#allUsers")
// $allusers.on("click", ".user", function(event) {
//   //console.log('You clicked on a user!')

//   //make sure nothing is highlighted before we start!
//   $allusertwotes.removeClass('highlighted')
//   $thisdiv.removeClass('highlighted')

//   var $thisdiv = $(event.target).closest('div')
//   //console.log($thisdiv)
//   var user = $thisdiv.attr('id')
//   user = user.substring(5,user.length)
//   console.log(user)

//   var $allusertwotes = $("[twoteuser="+user +"]")
//   console.log($allusertwotes)

//   $allusertwotes.addClass('highlighted')
//   $thisdiv.addClass('highlighted') //highlight listed user too!

// })


$allusers.on("click", ".user", function(event) {

  var $thisdiv = $(event.target).closest('div')
  if($thisdiv.hasClass('highlighted')) {
    var $highlighted = $('.highlighted')
    //make sure nothing is highlighted before we start!
    $highlighted.removeClass('highlighted')
  } else {
    //console.log('You clicked on a user!')
    var $highlighted = $('.highlighted')
    //make sure nothing is highlighted before we start!
    $highlighted.removeClass('highlighted')


    //console.log($thisdiv)
    var user = $thisdiv.attr('id')
    user = user.substring(5,user.length)
    console.log(user)

    var $allusertwotes = $("[twoteuser="+user +"]")
    console.log($allusertwotes)

    $allusertwotes.addClass('highlighted')
    $thisdiv.addClass('highlighted') //highlight listed user too!
  }



})