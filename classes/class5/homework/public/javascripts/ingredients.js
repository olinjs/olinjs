//submit button behavior
var $forms = $('form');

var onSuccess = function(data, status){
    console.log('In onSuccess!');
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
