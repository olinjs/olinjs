var $ingredientforms = $(".form-inline.ingredient-form");
var $newIngredientform = $(".form-inline.new-ingredient-form");

var $addBoxes = $(".add-box");
var $orderBtn = $(".btn-order");
var ingredients = [];

var $doneBoxes = $(".done-box");

$ingredientforms.each(function (){
    var $ingredientform = $(this);
    console.log($ingredientform.find("[name='name']").val());
    $ingredientform.submit(function(event) {
        console.log("form submitted");
        event.preventDefault();
        var ingredient_id = $ingredientform.closest(".ingredient-group").attr('id');
        var newName = $ingredientform.find("[name='name']").val();
        var price   = $ingredientform.find("[name='price']").val();
        var available = $ingredientform.find("[name='available']").prop('checked');
        var formData = {
            ingredient_id: ingredient_id,
            newName: newName,
            price: price,
            available: available
        };
        console.log(formData);
        $.post("postIngredient", formData)
        .done(function (data, status){
            console.log(data.name);
            $("#"+ingredient_id).find("small").text(data.name);
            console.log("#"+ingredient_id); 
        })
        .error(function (data, status){
            console.log(status);
            console.log(data);  
        });
    });
});

$newIngredientform.submit(function(event) {
    console.log("new ingredient!!! submitted");
    event.preventDefault();
    //formData = $ingredientform.serialize();
    var newName = $newIngredientform.find("[name='name']").val();
    var price   = $newIngredientform.find("[name='price']").val();
    var available = $newIngredientform.find("[name='available']").prop('checked');
    var formData = {
        newName: newName,
        price: price,
        available: available
    };
    console.log(formData);
    $.post("newIngredient", formData)
    .done(function (data, status){
        clonedForm =  $(".ingredient-group").first().clone();
        clonedForm.attr("id", data.id);
        clonedForm.find("small").text(newName);
        clonedForm.find("[name='name']").val(newName);
        clonedForm.find("[name='price']").val(price);
        clonedForm.find("[name='available']").prop('checked', available);
        console.log(clonedForm.find("[name='name']").val());
        $(".list-group").append(clonedForm);
    })
    .error(function (data, status){
        console.log(status);
        console.log(data);  
    });
});

$addBoxes.each(function() {
    var $addBox = $(this);
   $addBox.change(function(event){
        event.preventDefault();
        if($addBox.prop('checked')){
            $(".cost-group").find("h3").text(Number($(".cost-group").find("h3").text())+Number($addBox.closest(".list-group-item").attr('price')));
            ingredients.push($addBox.closest(".list-group-item").attr('ingredient_name'));
            console.log(ingredients)
            console.log(Number($addBox.closest(".list-group-item").attr('price')));
        } else {
            $(".cost-group").find("h3").text(Number($(".cost-group").find("h3").text())-Number($addBox.closest(".list-group-item").attr('price')));
            var index = $.inArray($addBox.closest(".list-group-item").attr('ingredient_name'), ingredients );
            ingredients.splice(index, 1);
            console.log(ingredients)
            console.log(Number($(".cost-group").find("h3").text())-Number($addBox.closest(".price").text()))
        }
    });
});

console.log($orderBtn);
$orderBtn.click(function (event){
    event.preventDefault();
    console.log("Order submitted");
    formData = {
        ingredientList: ingredients
    };
    console.log(formData);
    $.post("postOrder",formData)
    .done(function (data, status){
        ingredients = [];
        console.log("Adding order")
        $addBoxes.each(function(){
           $(this).prop('checked', false);
        })
        alert("Your Order is submitted!!!");
    })
    .error(function (data, status){
        console.log(status);
        console.log(data);  
    });
});

console.log($doneBoxes);

$doneBoxes.each(function() {
    var $doneBox = $(this);
    $doneBox.change(function(event){
        var order_id = $doneBox.closest('.list-inline').attr('order_id');
        formData = {
            order_id: order_id
        }
        console.log(formData);
        $.post("deleteOrder", formData)
        .done(function (data, status){
            console.log("removing order");
            $doneBox.closest('.list-inline').remove();
        })
        .error(function (data, status){
            console.log(data);
            console.log(status);
        })
    });
});
