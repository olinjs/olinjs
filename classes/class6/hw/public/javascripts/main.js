//Elements to handle
var $newTwitHome;
var $loginForm;
var $deleteTwit;
var $newTwitProfile;


setHandlers();

function setHandlers(){
	$newTwitHome = $("button#postHome").unbind();
	$loginForm = $("form.login").unbind();
	$deleteTwit = $("button#deletePost").unbind();
	$newTwitProfile = $("button#postProfile").unbind();

	$newTwitHome.click(HANDLERS.newTwitHandler('homeTwit', CALLS.success.postHome, '#twitMessage'));
	$loginForm.submit(HANDLERS.loginHandler('loginUser', CALLS.success.userLogin));
	$deleteTwit.click(HANDLERS.deleteHandler('deleteTwit', CALLS.success.deletPost, $(this).val));
	$newTwitProfile.click(HANDLERS.newTwitHandler('profilePost', CALLS.success.postProfile,'#twitMessage'));

}
