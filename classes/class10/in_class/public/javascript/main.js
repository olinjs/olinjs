$( document ).ready(function(){
	$.get('/catsJson', function(json){
		var source   = $("#cats-template").html();
		console.log(source);
		var template = Handlebars.compile(source);
		var htmlOutput    = template(json);
		$('#content').html(htmlOutput);
	});
});