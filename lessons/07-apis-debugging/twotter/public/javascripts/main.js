// login variables
var $facebookLoginForm = $('#facebook-login');
var $localLoginForm = $('#local-login');
var $registerForm = $('#register');

// new twote form variables
var $newTwoteForm = $('#new-twote-form');

// display twote variables
var $twoteDiplayList = $('#twotes');
var $twoteTemplate = $('#twote-template');
var $deleteBox = $('.delete-button')


var onError = function(data, status) {
  console.log("status", status);
  console.log("error", data);
}

var onLogin = function(data, status) {
  window.location = data;
}
 
var onDeleteTwote = function(data) {
  console.log('delete Twote!!!!!!', data)
  var $target = $(data.target); // the checkbox
  var twoteId = $target.parent().attr('id'); // the div
  var bodyData = {
    id: twoteId
  };
  $.post('/delete', bodyData)
    .done(function(data, status) {
      console.log('delted?', data.deleted);
      if (data.deleted == true) {
        $target.parent().remove();
    }
  })
    .error(onError);
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

// var onDeleteTwote = function(data) {
//   var $target = $(data.target); // the checkbox
//   var twoteId = $target.parent().attr('id'); // the div
//   console.log(twoteId);
//   var bodyData = {
//     id: twoteId
//   };
//   $.post('/delete', bodyData)
//     .done()
//     .error(onError);
//   $target.parent().remove();
// }

$deleteBox.click(onDeleteTwote);

$newTwoteForm.submit(function (event) {
  event.preventDefault();

  var text = $newTwoteForm.find('[name="twote-text"]').val();
  console.log("string");
  var dt = new Date;
  var time = dt.getTime();

  var formData = {
    text: text,
    time: time
  };

  $.post("/new", formData)
    .done(onNewTwote)
    .error(onError);
});

$localLoginForm.submit(function (event) {
  event.preventDefault();

  var username = $localLoginForm.find('[name="username"]').val();
  var password = $localLoginForm.find('[name="password"]').val();

  var formData = {
    username: username,
    password: password
  }

  $.post('/login', formData)
    .done(onLogin)
    .error(onError);
});

$registerForm.submit(function (event) {
  event.preventDefault();

  var username = $registerForm.find('[name="username"]').val();
  var password = $registerForm.find('[name="password"]').val();

  var formData = {
    username: username,
    password: password
  }

  $.post('/register', formData)
    .done(onLogin)
    .error(onError);
})
