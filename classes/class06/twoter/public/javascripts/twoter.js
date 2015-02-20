function getFormObj(formId) {
	//Gets form data as object for client use
    var formObj = {};
    var inputs = $(formId).serializeArray();
    $.each(inputs, function (i, input) {
        formObj[input.name] = input.value;
    });
    return formObj;
}
function registerAll(){
	$('.twote').submit(function(event){
		//Allows deleting of twote
		event.preventDefault();
		$(this).detach();
		formSerial = $(this).serialize();
		$.post("/twoter/delete",formSerial).done(function(data,status){
		}).error(function(data,stats){
			console.log("Delete error");
		});
	});
	$('.user').click(function(event){
		//Fades unselected users' twotes
		if($(this).hasClass("selected")){
			$('.twote').css('opacity','1');
			$(this).toggleClass("selected");
		}else{
			$('.twote').css('opacity','.5');
			$('.user-'+$(this).attr('userid')).css('opacity','1');
			$('.user').removeClass("selected");
			$(this).addClass("selected");
		}
	
	});
}
registerAll();

$('#addTwote').submit(function(event){
	//Adds twote both on page and in database
	event.preventDefault();
	formSerial = $('#addTwote').serialize();
	$.post("/twoter/add",formSerial).done(function(data,status){
		formData = getFormObj("#addTwote");
		console.log(data.username)
		$($.parseHTML('<form class = "twote user-'+data.userid+'" action="Blanks" method="Post"><input type="text" name="id" value="'+data._id+'" style="display: none;"/><input type = "submit" value="Delete"/><h3>'+data.username+'</h3><p>'+data.text+'</p></form>')).prependTo('#twotes');
		registerAll();
	}).error(function(data,stats){
		console.log("addTwote error");
	});
});



