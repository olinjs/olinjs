$(".authors").click(function (event){
	// Clear all highlights to have a fresh start.
	$(".signature").each(function (index){
		$(this).parent().removeClass("highlighted");
	});

	// Highlight the twotes of the chosen Author.
	var chosenAuthor = $.trim($(this).text());
	$(".signature").each(function (index){
		if ($(this).text().slice(2) === chosenAuthor){
			$(this).parent().toggleClass("highlighted");
		}
	});
});