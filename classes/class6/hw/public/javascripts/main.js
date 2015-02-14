var HANDLERS = require('./handlers');
var CALLS = require('./calls');
//Elements to handle
var $newTwitHome;
var $loginForm;



setHandlers();

function setHandlers(){
	$newTwitHome = $("#postHome").unbind();
	$loginForm = $("#loginBtn").unbind();

	$newTwitHome.click(HANDLERS.newTwitHandler('homeTwit', CALLS.success.postHome, 'twitMessage'));
	$loginForm.click(HANDLERS.loginHandler('loginUser', CALLS.success.userLogin));

}
