$(".oneTwote").each(function (){
	var chosenTwote = $($(this).children('.signature')[0]).text().slice(2);
	var loggedInUser = $("#authorName").text();
	if (chosenTwote === loggedInUser){
		console.log("test");
		$($(this).children('.deleteTwote')[0]).addClass("deleteOn");
	}
});

$(".deleteTwote").click(function (){
	var deleteThisTwote = $(this).attr('id');
	console.log(deleteThisTwote);
	$.post("/deleteTwote", {
		deleteThisTwote: deleteThisTwote
	}).success(onSuccess).error(onError);
});

$("#logout").click(function (event) {
	$.get("/logout").success(function(data) {
       window.location = data;
    }).error(onError);
});