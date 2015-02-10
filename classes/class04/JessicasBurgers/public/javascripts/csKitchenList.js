$('button').click(function (){
	console.log(this.id);

	// Send a DELETE request
	$.post("kitchen", {
    orderID: this.id
  }).done(onSuccess).error(onError);
});