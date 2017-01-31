// Submit new twote
function makeTwote() {
	var text = $('#new_twote').val();
	var author = "placeholder"; // Todo, fetch from cookies!
	var curr_time = $.now(); // Current time in millis
	var twote_data = {"text": text, "author": author, "time": curr_time};
	$.ajax({
		type: "POST",
		contentType: "application/json",
		url: "./twotes/new",
		data: JSON.stringify(twote_data),
		error: function(err) {
			console.log(err);
		}
	});
}

// This is a really bad way to do this, instead you should send the timestamp of your most recent twote and only get the new ones
// But who cares lets just finish this
function updateTwotesList() {
	$.ajax({
		type: "GET",
		url: "./twotes",
		success: function(twotes, status) {
			$('#twoteslist').html(genTwotesList(twotes));
		},
		error: function(err) {
			console.log(err);
		},
		complete: function(data) {
			setTimeout(updateTwotesList, 3000); // Repeat every 3 seconds
		}
	});
}

// Generate html to populate the twotes table
function genTwotesList(twotes) {
	var list = '';
	$.each(twotes, function(index, twote) {
		list.concat(
			'<tr><td>',
			'<div class="twote_text">',
			twote.text,
			'</div><div class="twote_author">- ',
			twote.author,
			'</div>',
			'</td></tr>'
		);
	});
}

$(document).ready(function() {
	updateTwotesList(); // Kick off our endless loop of ajax calls (;_;)
});

// Make twote request when user is typing in text box and presses 'enter'
// "Newlines are absolutely haram" -Joey, founder of Twoter Inc.
$(document).keypress(function(e) {
    if(e.which == 13 && $('#new_twote').is(":focus")) {
        makeTwote();
    }
});