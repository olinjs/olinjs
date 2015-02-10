var onSuccess = function(received_html, status) {
  $("#order_item_list").html(received_html);
};

var onError = function(received_html, status) {
  $("#order_item_list").html("Error world!");
};

// Send an AJAX GET request when page is done loading to get all order items.
$(function() {
  $.get("order").done(onSuccess).error(onError);
});

// Submit order to the server.
var $postOrder = $("#post_order");

$postOrder.submit(function(event) {
  event.preventDefault();

  // Check if the order is valid.
  if($("#input-name").val() === "" || $(':checkbox:checked').val() == undefined) {
    alert("Please fill out the whole order!");
  } else {
    // Find and store all the items that are checked.
    var orderIDs = [];
    $(':checkbox:checked').each(function () {
      orderIDs.push(this.id);
    });

    // Collect the name of the person.
    var personName = $postOrder.find("[name='name']").val();

    $.post("order", {
      personName: personName,
      orderIDs: orderIDs
    }).done(function (received_html, status) {
      $("#post_order").html(received_html);
    }).error(onError);
  }
});