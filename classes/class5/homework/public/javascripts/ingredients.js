
var onEditSuccess = function(data, status){
    if (data.success){
        var req = data.req;
        var form_to_update = data.form_to_update;
        if (data.req === 'delete'){
            $('[id="'+data.form_to_update+'"]').remove();
        } else {
            var new_info = '<p id="ajax-'+data.ringredient+'" name="info_display"> '+data.ringredient+' x '+data.rstock+' price: '+data.rprice+' </p>';
            $('[id="'+data.form_to_update+'"][name="info_display"]').replaceWith(new_info);
            if (parseInt(data.rstock) === 0){
                $('[id="'+data.form_to_update+'"][name="info_display"]').css('color','grey');
            } else {
                $('[id="'+data.form_to_update+'"][name="info_display"]').css('color','black');
            }
        }
    } else{
        console.log('invalid input!');
        console.log(data);
    }
}

var onAddSuccess = function(data, status){
    if (data.success){
        var html = '<p id="ajax-'+data.ingredient_name+' name="info_display"> '+data.ingredient_name+' x '+data.stock+' price: '+data.price+' </p>'+
        '<form id="ajax-'+data.ingredient_name+'" action="delete" method="POST">'+
         '<input type="submit" name="delete" value="Delete this ingredient forever!" ><br>'+
        '</form>'+
        '<form id="ajax-'+data.ingredient_name+'" action="edit_stock" method="POST">'+
         '<input type="text" value="" name="edit_stock" ><br>'+
         '<input type="submit" name="edit_stock" value="Edit stock!" ><br>'+
        '</form>'+
        '<form id="ajax-'+data.ingredient_name+' action="edit_name" method="POST">'+
         '       <input type="text" value="" name="edit_name" ><br>'+
         '       <input type="submit" name="edit_name" value="Edit name!" ><br>'+
        '</form>'+
        '<form id="ajax-'+data.ingredient_name+' action="edit_price" method="POST">'+
         '       <input type="text" value="" name="edit_price" ><br>'+
         '       <input type="submit" name="edit_price" value="Edit price!"><br>'+
        '</form>';

        $(html).insertBefore($('#ingredient_header'));
        make_forms_interactive();
        console.log(data);
    } else {
        console.log('invalid input!');
    }
}

var onError = function(data, status) {
    console.log("status", status);
    console.log("error", data);
}

function make_forms_interactive(){
    var $forms = $('form[id!=add_ingredient]');
    $forms.each(function(){
        var form = $(this);
        console.log('creating forms',form);
        form.submit(function(event) {
            event.preventDefault();
            post_obj = {form_text:form.serialize(), 
                        form_submitted:form.attr('id'),
                        form_type:form.attr('action')};
            console.log(post_obj);
            $.post("edit_ingredients", post_obj)
                .done(onEditSuccess)
                .error(onError);
        });
    });
}

//add ingredients behavior

var $submit_form = $('#add_ingredient');

$submit_form.submit(function(event){
    var form_data = $submit_form.serialize()
    event.preventDefault();
    console.log(form_data);
    $.post("add_ingredient", $submit_form.serialize())
        .done(onAddSuccess)
        .error(onError);
});

//make forms interactive
make_forms_interactive();

//grey out items with zero stock
$info_displays = $('[name="info_display"]');
$info_displays.each(function(){
    var display_num = $(this).text().split(' ').splice(-4,1)[0];
    console.log(display_num);
    if (display_num === '0,'){
        $(this).css('color','grey');
    }
});
