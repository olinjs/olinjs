//disable checkboxes if ingredients are not in stock
$('input').each(function(){
    var ingredient_name = $(this).attr('name');
    //there are hidden html paragraphs that tell us whether an ingredient is in stock or not
    var in_stock =  ($('*[id*="stock"]:hidden[ingredient="'+ingredient_name+'"]').attr('in_stock') === 'true');
    var is_submit_button = ($(this).attr('type') === 'submit');
    if (!in_stock && !is_submit_button){
        $(this).attr('disabled',true);
    }
});

//update add-on total prices
$('input').click(function() {
    total = 0.0;
    $('input').each(function(){
        if ($(this).is(':checked')) {
        total += parseFloat($(this).attr('price'));
        total = Math.floor(total * 100) / 100;
        } 
    });
    $('#total_price').text('$'+total);
})
 
//submit button behavior
var $form = $("#ajax-form");

var onSuccess = function(data, status){
    $('#success_message').html(
        "Your order was submitted. Have a cat picture!" 
    );
    var image = "<img src='images/order_submit_cat.jpg'/>";
    $('#success_image').html(image);
}

var onError = function(data, status) {
    console.log("status", status);
    console.log("error", data);
}

$form.submit(function(event) {
    event.preventDefault();
    $.post("order_submit", $form.serialize())
        .done(onSuccess)
        .error(onError);
});
