//edit ingredients behavior
var $forms = $('form');

var onSuccess = function(data, status){
    var id_del = data.id_deleted;
    $('#'+id_del).slideUp("fast", function(){$(this).remove});
}

var onError = function(data, status) {
    console.log("status", status);
    console.log("error", data);
}

$forms.each(function(){
    var form = $(this);
    form.submit(function(event) {
        event.preventDefault();
        post_obj = {id_to_delete:form.attr('id')};
        console.log(post_obj);
        $.post("order_remove", post_obj)
            .done(onSuccess)
            .error(onError);
    });
});
