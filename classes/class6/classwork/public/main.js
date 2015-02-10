$('#hello-button1').click(function() {
  $.post('/hello', {
    text: 'data';
  });
  .done(function(data) {
    $('body').append(data);
  });
  .error(console.error);
  confirm('What is this?');
});