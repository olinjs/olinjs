$(document).ready(function() {
	$(".various").fancybox({
		maxWidth	: 800,
		maxHeight	: 600,
		fitToView	: false,
		width		: '70%',
		height		: '70%',
		autoSize	: false,
		closeClick	: false,
		openEffect	: 'none',
		closeEffect	: 'none'
	});
});

var possible_names = ["bob", "joey", "cat", "dog"];
var possible_colors = ["red", "green", "blue", "yellow", "orange", "purple"];

function addCat() {
	var cat_info = {
		"name": possible_names[Math.floor(Math.random()*possible_names.length)],
		"age": Math.floor((Math.random() * 10) + 1),
		"color": [possible_colors[Math.floor(Math.random()*possible_colors.length)], possible_colors[Math.floor(Math.random()*possible_colors.length)]]
	};
	$.ajax({
		type: "POST",
		contentType: "application/json",
		url: "./cats/new",
		data: JSON.stringify(cat_info),
		success: function(res, status) {
			console.log(res);
			$('#add_notifications').html("Random cat generated, check console for details");
		},
		error: function(err) {
            console.log(err);
            alert("Add failed, check console for error");
        }
	});
}

function sortCatsByAge(a, b) {
	if (a.age < b.age) {
		return 1;
	} else if (a.age > b.age) {
		return -1;
	} else {
		return 0;
	}
}

function fetchCats(color) {
	$.ajax({
		type: "GET",
		url: "./cats",
		success: function(res, status) {
			console.log(res);
			var catlist_array = res.sort(sortCatsByAge);
			var catlist = '<ul>';
			$.each(catlist_array, function(index, cat) {
				if (color == undefined || cat.color.indexOf(color) >= 0) {
					catlist += ''.concat(
						'<li>',
						cat.name,
						'</li><ul><li>Age: ',
						cat.age,
						'</li><li>Colors: ',
						cat.color.toString(),
						'</li></ul>'
					);
				}
			});
			catlist += '</ul>';
			console.log(catlist);
			if (color == undefined) {
				$('#disp_div').html(catlist);
			} else {
				$('#filtered_results').html(catlist);
			}
		},
		error: function(err) {
            console.log(err);
            alert("Fetch failed, check console for error");
        }
	});
}

function killOldestCat() {
	$.ajax({
		type: "POST",
		url: "./cats/killoldest",
		success: function(res, status) {
			if (res.error != undefined) {
				$('#killconfirmed').html(res.error);
			} else {
				$('#killconfirmed').html("Oldest cat (" + res.name + ") was taken out back and shot, he was only " + res.age + " years old ;_;");
			}
		},
		error: function(err) {
			console.log(err);
            alert("Kill failed, check console for error");
		}
	});
}