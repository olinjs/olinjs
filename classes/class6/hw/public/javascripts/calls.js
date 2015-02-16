var CALLS = {
	error: function(data, status){
		console.log('ERROR', data);
	},

	success: {
		postHome: function(data, status){
			var out = "<li>"+
				"<div id='author'>"+data.username+"</div>"+
				"<div id='text'>"+data.twit+"</div>"+
				"</li>";
			$("#result").html(out);
		},

		userLogin: function(data, status){
			console.log('Hello'+data)
			// window.location.replace("/")
		},

		deletePost: function(data, status){
			var div = "#"+ data.text;
			$(div).remove();
		},

		postProfile: function(data, status){
			var out = "<div id="+data.text+">"+
				"<li>"+data.text+"</li>"+
				"<button id='deletePost' value="+data.text+" class='btn' type='button'> x </button>"+
				"</div>"
			$("#result").html(out);
		}
	}
};

