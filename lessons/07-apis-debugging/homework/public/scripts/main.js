// This is terrible
// Controls which user's twotes to highlight
var a_terrible_var = '';

// Submit new twote
function makeTwote() {
	var text = $('#new_twote').val();
	$('#new_twote').val('');
	var cookie = document.cookie;
	var author = cookie.substring(cookie.indexOf('=')+1); // Todo, fetch from cookies!
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

// Add user
function addUser(username) {
	var user_data = {"name": username};
	$.ajax({
		type: "POST",
		contentType: "application/json",
		url: "./users/new",
		data: JSON.stringify(user_data),
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
			$('#twoteslist').html(genTwotesList(twotes.reverse()));
		},
		error: function(err) {
			console.log(err);
		},
		complete: function(data) {
			setTimeout(updateTwotesList, 1000); // Repeat every 3 seconds
		}
	});
}

function updateUserList() {
	$.ajax({
		type: "GET",
		url: "./users",
		success: function(users, status) {
			$('#userlist').html(genUsersList(users));
		},
		error: function(err) {
			console.log(err);
		},
		complete: function(data) {
			setTimeout(updateUserList, 5000); // Repeat every 3 seconds
		}
	});
}

// Generate html to populate the twotes table
function genTwotesList(twotes) {
	var list = '';
	$.each(twotes, function(index, twote) {
		list += ''.concat(
			'<tr class="twote" style="background-color: ',
			(twote.author == a_terrible_var) ? "#E6F2FF" : "#E6E6E6",
			'"><td class="twote">',
			'<div class="twote_text">',
			twote.text,
			'</div><div class="twote_author">- ',
			twote.author,
			'</div>',
			'</td></tr>'
		);
	});
	return list;
}

// Generate html to populate the users table
function genUsersList(users) {
	var list = '';
	$.each(users, function(index, user) {
		list += ''.concat(
			'<tr class="user" onclick="highlightUserTwotes(\'',
			user.name,
			'\')""><td class="user">',
			'<div class="user">',
			user.name,
			'</div>',
			'</td></tr>'
		);
	});
	return list;
}

function highlightUserTwotes(name) {
	a_terrible_var = name;
}

// Put a cooky on our user that says their username
function login() {
	var username = prompt("What is ur username?");
	if (username.length) {
		document.cookie="username=" + username + "; expires=" + $.now() + 217321621;
		$('#make_twote').css("display", "block");
		$('#login').css("display", "none");
		$('#logout').css("display", "block");
		addUser(username);
	}
}

// Eat the cookie mentioned above ^^
function logout() {
	var cookie = document.cookie;
	document.cookie="username=" + cookie.substring(cookie.indexOf('=')+1) + "; expires=Thu, 18 Dec 2013 12:00:00 UTC; path=/";
	$('#make_twote').css("display", "none");
	$('#login').css("display", "block");
	$('#logout').css("display", "none");
}

$(document).ready(function() {
	var cookie = document.cookie;
	var user = cookie.substring(cookie.indexOf('=')+1);
	if (user.length) {
		$('#make_twote').css("display", "block");
		$('#login').css("display", "none");
		$('#logout').css("display", "block");
	} else {
		$('#make_twote').css("display", "none");
		$('#login').css("display", "block");
		$('#logout').css("display", "none");
	}
	updateTwotesList(); // Kick off our endless loop of ajax calls (;_;)
	updateUserList(); // Same for users
});

// Make twote request when user is typing in text box and presses 'enter'
// "Newlines are absolutely haram" -Joey, founder of Twoter Inc.
$(document).keypress(function(e) {
    if(e.which == 13 && $('#new_twote').is(":focus")) {
        makeTwote();
    }
});