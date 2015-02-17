var $loginBtn = $("#Login");
var $logoutBtn = $('#Logout');
var $loginForm = $('.login-form');
var $tvveetForm = $('.tvveet-form');
var $tvveetsGroup = $('.tvveet');
var $usersGroup = $('.user-btn');

var user_id = $tvveetForm.attr('user_id');
console.log($usersGroup);

$.material.init();

var deleteTvveet = function (event){
    event.preventDefault();
    var $tvveet = $(this)
    var tvveet_id = $tvveet.attr('tvveet_id')
    var data = {id:tvveet_id}
    $.post('delete', data)
    .done(function (data, status){
        $tvveet.closest('.well').remove();
    })
    .error(function (data, status){
        console.log(status);
        console.log(data);  
    });
}

var enable_delete = function () {
    $tvveetsGroup.each(function (){
        var $tvveet = $(this);
        console.log($tvveet.attr('author_id'));
        if($tvveet.attr('author_id') == user_id){
            $tvveet.find('button').prop('disabled', false);
            console.log('Our users got a tvveet');   
        }
    })
}

$tvveetsGroup.submit(deleteTvveet);
enable_delete();

$loginBtn.click(function (event){
    $.get("/login")
    .done(function (data, status){
        console.log(data);
        document.open();
        document.write(data);
        document.close();
    })
    .error(function (data, status){
        console.log(status);
        console.log(data);  
    });
});

$logoutBtn.click(function (event){
    $.get("/")
    .done(function (data, status){
        console.log(data);
        document.open();
        document.write(data);
        document.close();
    })
    .error(function (data, status){
        console.log(status);
        console.log(data);  
    });
});

$loginForm.submit(function (event){
    event.preventDefault()
    console.log($loginForm);
    var name = $loginForm.find("[name='name']").val();
    var formData = {
        name : name,
    };

    console.log(formData);
    $.post("/login", formData)
    .done(function (data, status){
        console.log(data);
        document.open();
        document.write(data);
        document.close();
    })
    .error(function (data, status){
        console.log(status);
        console.log(data);  
    });
});

$tvveetForm.submit(function (event){
    event.preventDefault();
    var text = $('#text-field').val();
    var author = $tvveetForm.attr("user_name");
    var author_id = $tvveetForm.attr("user_id");

    var formData = {
        text : text,
        author : author,
        author_id : author_id
    }
    
    console.log(formData);
    $.post("/tvveet", formData)
    .done(function (data, status){
        clonedForm =  $tvveetsGroup.first().closest('.well').clone();
        console.log(clonedForm.find('h4'));
        clonedForm.attr("tvveet_id", data.id);
        clonedForm.find("h4").text(author + ":"); 
        clonedForm.find("span").text(text);
        console.log(clonedForm.find('h4').val());
        $(".tvveets-col").append(clonedForm);
        $tvveetsGroup = $('.tvveet');
        $tvveetsGroup.unbind();
        $tvveetsGroup.submit(deleteTvveet);
        enable_delete();
    })
    .error(function (data, status){
        console.log(status);
        console.log(data);  
    });
})



$usersGroup.click(function (){
    var $user_btn = $(this);
    var clicked_user_id = $user_btn.attr('user_id');

    $usersGroup.css("background-color", "#FFF");
    $user_btn.css("background-color", '#e6f9ff');
    
    $tvveetsGroup.each(function (){
        var $tvveet = $(this);
        if($tvveet.attr('author_id') == clicked_user_id){
            $tvveet.closest('.well').css("background-color", "#e6f9ff");
        }
        else{
            $tvveet.closest('.well').css("background-color", "#FFF");
        }
    });
})

