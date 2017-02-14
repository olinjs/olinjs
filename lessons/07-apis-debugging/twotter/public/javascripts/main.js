// login variables
var $loginForm = $('#login-form');
var $loginButton = $('#log-in-out').find('[name="login"]');

// new twote form variables
var $newTwoteForm = $('#new-twote-form');

// display twote variables
var $twoteDiplayList = $('#twotes');
var $twoteTemplate = $('#twote-template');


var onError = function(data, status) {
  console.log("status", status);
  console.log("error", data);
}

var onLogin = function(data, status) {
  if (typeof data.redirect == "string") {
    window.location = data.redirect;
  }
}

var onNewTwote = function(data, status) {
  console.log(data);
  console.log(data._id);
  var $newTwote = $twoteTemplate.clone();
  $newTwote.show();
  $newTwote.attr('id', data.id);
  $newTwote.find('.twote-content').text(data.text);
  $newTwote.find('.twote-author').text(data.username);
  $newTwote.find('[name="delete-twote"]').click(onDeleteTwote);
  $twoteDiplayList.prepend($newTwote);
}

var onDeleteTwote = function(data) {
  var $target = $(data.target); // the checkbox
  var twoteId = $target.parent().attr('id'); // the div
  console.log(twoteId);
  var bodyData = {
    id: twoteId
  };
  $.post('/delete', bodyData);
  $target.parent().remove();
}

$loginForm.submit(function(event) {
  event.preventDefault();

  var username = $loginForm.find('[name="username"]').val();
  var password = $loginForm.find('[name="password"]').val();
  var formData = {
    username: username
    password: password
  };

  $.post("/login", formData)
    .done(onLogin)
    .error(onError);
});

$newTwoteForm.submit(function (event) {
  event.preventDefault();

  var text = $newTwoteForm.find('[name="twote-text"]').val();
  var dt = new Date;
  var time = dt.getTime();

  var formData = {
    text: text,
    time: time
  };

  $.post("/new", formData)
    .done(onNewTwote)
    .error(onError);
})

$loginButton.click(function(data){
  $.get('/login', function() {
    console.log("log in");
    window.location = '/login';
  });
})

$.get('/', function(data) {
  console.log(data);
});
