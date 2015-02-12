(function() {
	var $flash = function($el, className) {
		$el.addClass(className);
		setTimeout(function() {
			$el.removeClass(className);
		}, 200);

		return $el;
	}
	
	var $tweetForm = $('#tweet-form');

	$tweetForm.submit(function(event) {
		event.preventDefault();

		var $tweetInput = $tweetForm.find('[name="tweettext"]');
		
		var text = $tweetInput.val();
		if (!text) {
			$flash($tweetInput, 'new').focus();
			return;
		}

		$.post('/tweet/', {
			tweettext: text
		})
		.success(function(tweet) {
			$('#tweet-container')
			.prepend($flash($(tweet), 'new'));

			$('.tweet-delete').one('click', tweetDelete);

			$tweetInput.val('').focus();
		})
		.error(console.error);
	});

	function tweetDelete() {
		var $tweet = $(this).parent();

		var tweetId = $tweet.attr("id");

		if (!tweetId)
			return;

		$.ajax('/tweet/', {
			type: 'DELETE',
			data: { tweetId: tweetId }
		})
		.success(function(status) {
			if (status === 'success')
				$tweet.remove();
		})
		.error(console.error);
	};

	$('.tweet-delete').one('click', tweetDelete);

	$('.user').click(function(event) {
		event.preventDefault();

		var $user = $(this);

		if ($user.hasClass('highlight')) {
			$('*').removeClass('highlight');
			return;
		}

		$('*').removeClass('highlight');

		$.get('/tweet/'+$user.html())
		.success(function(tweets) {
			tweets.forEach(function(tweet) {
				$('#'+tweet._id).addClass('highlight');
			});
			$user.addClass('highlight');
		})
		.error(console.error);
	});
})()