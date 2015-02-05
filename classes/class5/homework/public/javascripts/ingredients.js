//edit ingredients behavior
var $forms = $('form[id!=add_ingredient]');

var onSuccess = function(data, status){
    console.log(data);
}

var onError = function(data, status) {
    console.log("status", status);
    console.log("error", data);
}

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
            .done(onSuccess)
            .error(onError);
    });
});

//add ingredients behavior

var $submit_form = $('#add_ingredient');

$submit_form.submit(function(event){
    var form_data = $submit_form.serialize()
    event.preventDefault();
    console.log(form_data);
    $.post("add_ingredient", $submit_form.serialize())
        .done(onSuccess)
        .error(onError);
});
