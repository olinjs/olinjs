$( document ).ready(function(){
	$.get('/catsJson', function(json){
		var source   = $("#cats-template").html();
		var template = Handlebars.compile(source);
		console.log(template);
		console.log(json);
		var htmlOutput    = template(json);
		console.log(htmlOutput);
		$('#content').html(htmlOutput);
	});
});