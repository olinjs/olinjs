var onSuccess = function(received_html, status) {
  $("#orders_list").html(received_html);
};

var onError = function(received_html, status) {
  $("#orders_list").html("Error world!");
};

// Send an AJAX GET request when page is done loading to get all order items.
$(function() {
  $.get("kitchen").done(onSuccess).error(onError);
});