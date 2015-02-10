var $inStock = $('#in form');
var $outOfStock = $('#out form');

$

$inStock.submit(function(event) {
  event.preventDefault();
  var $curForm = $(this);
  var id = $curForm.attr('id');

  $.post('inStock', {id: id})
  .done(function(data) {
    $curForm.remove();
    $curForm.find("[type='submit']").attr('value', "Resupply");
    $('#out').append($curForm);
  });
});

$outOfStock.submit(function(event) {
  event.preventDefault();
  var $curForm = $(this);
  var id = $curForm.attr('id');

  $.post('outOfStock', {id: id})
  .done(function(data) {
    $curForm.remove();
    $curForm.find("[type='submit']").attr('value', "Out of Stock");
    $('#in').append($curForm);
  });
});