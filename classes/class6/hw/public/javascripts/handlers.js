var HANDLERS = {
	//handles creation of new Twits
	newTwitHandler: function(route, success, id){
		return function(event){
			event.preventDefault();
			var postData = document.getElementById(id);
			if (postData){
				var twit = {
					text: postData.value
				}
				$.post(route, twit).done(success).error(CALLS.error);
			}
		}
	},

	loginHandler: function(route, success){
		return function(event){
			event.preventDefault();
			var $form = $(event.target);
			var usersName = $form.find('#username').val();
			alert(usersName)
			if (usersName) {
				var user = {
					username: usersName,
					test: 'test'
				};
				$.post(route, user).done(success).error(CALLS.error);
			}
		}
	},

	deleteHandler: function(route, success, message){
		return function(event){
			event.preventDefault();
			$.post(route, {text: message}).done(success).error(CALLS.error);
		}
	}


}

