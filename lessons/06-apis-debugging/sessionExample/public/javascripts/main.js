var $form = document.getElementById('login');

$form.addEventListener("submit", function(ev) {
	var data = "name="+ $form.firstElementChild.value;
	var request = new XMLHttpRequest();
	request.open('POST', '/login', true);
	request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
	request.send(data);
})


