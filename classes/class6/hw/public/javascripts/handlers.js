var HANDLERS = {
	//handles creation of new Twits
	newTwitHandler: function(route, success, id){
		var postData = document.getElementById(id);
		if (postData){
			var twit = {
				text: postData.value
			}
			$.post(route, twit).done(success).error(CALLS.error);
		}
	},

	loginHandler: function(route, success){
		var usersName = document.getElementById("#username");
		if (usersName) {
			var user = {
				username: usersName
			};
			$.post(route, user).done(success).error(CALLS.error);
		}
	}


}

module.exports = HANDLERS;