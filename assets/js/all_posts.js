---
layout: compress
---
$(document).ready(function(){

	/* Json management data variables*/
	var all_signatories = [];
	var signatories_mold = [];
	var signatories_in_array_count = 0;
	var signatories_molds_in_html_count = 0;
	var signatories_in_json = 0;
	var signatories_processed = 0;

	/* Infinite scroll throttle and functions variables*/
	var scrollTolerance = 700; /* Define range of pixels between scroll position and bottom page as a tolerance to trigger the function */
	var elementsToAppendPerScroll = 5; /* Define the elements to index when user reach bottom of the site */

	$.getJSON( "https:2haas.com/assets/json/all_posts.json", function(data) {
	/*	console.log("json data: " + data.signatories.length); */
		signatories_in_json = data.signatories.length;

		$.each(data.signatories, function(key, val) {
			signatories_processed += 1;

			var signatory_name = val.name;
			var signatory_url = val.url;
			var signatory_image = val.image_url;
			var signatory_date = val.date;
			var signatory_category_name = val.category_name;
			var signatory_category_url = val.category_url;
			var signatory_author_name = val.author_name;
			var signatory_author_url = val.author_url;

			var signatory_card = '<section class="postsblock"><div class="headline-container"><div class="headline"><a href="' + signatory_url + '"><h2 class="wordwrap">' + signatory_name + '</h2></a></div></div><div class="post-img"><a href="' + signatory_url + '"><img src="' + signatory_image +'" alt="' + signatory_name + '"></a></div><div class="byline"><div class="category wordwrap"><div class="text-container"><a href="' + signatory_category_url + '">' + signatory_category_name + '</a></div></div><div class="time"><div class="text-container"><p>' + signatory_date + '</p></div></div></div><div class="post-body wordwrap"><a href="' + signatory_author_url + '">' + signatory_author_name + '</a><br><p><a class="more" href="' + signatory_url + '">React, Comment & Share...</a></p></div> </section>';

			signatories_mold.push(signatory_card);
			signatories_in_array_count += 1;


			if((signatories_in_array_count % elementsToAppendPerScroll) == 0 || signatories_processed == signatories_in_json){
				var signs_left = signatories_processed % elementsToAppendPerScroll;
				var signs_to_index = (signs_left == 0) ? elementsToAppendPerScroll : signs_left;
				
				var last_signs_to_index = signatories_mold.slice(-1 * signs_to_index);
				all_signatories.push(last_signs_to_index);
			}
		});

		/* console.log(all_signatories.length + " posts found"); */
		infiniteScrollAppend();
	});


	

	function infiniteScrollAppend(){
		/* console.log("Executing: infiniteScrollAppend"); */
		var scrollPosition = $(window).scrollTop();
		var scrollTrigger = $(document).height() - $(window).height() - scrollTolerance;

		/* Detect if user is at the bottom of the site */
		if (scrollPosition > scrollTrigger) {
	        if (signatories_molds_in_html_count < all_signatories.length) {
	        	$(".post-div").append(all_signatories[signatories_molds_in_html_count]);
	        	signatories_molds_in_html_count += 1;

	        	if (signatories_molds_in_html_count == all_signatories.length){
	        		$('.post-div').removeClass("loading-posts");
	        	}
	        };
	    }
	}

	var throttle = function throttle(func, limit) {
		var lastFunc = void 0;
		var lastRan = void 0;
		return function () {
			var context = this;
			var args = arguments;
			if (!lastRan) {
				func.apply(context, args);
				lastRan = Date.now();
			} else {
				clearTimeout(lastFunc);
				lastFunc = setTimeout(function () {
					if (Date.now() - lastRan >= limit) {
						func.apply(context, args);
						lastRan = Date.now();
					}
				}, limit - (Date.now() - lastRan));
			}
		};
	};
	$(window).on('scroll', throttle(function (event) {
		infiniteScrollAppend();
	}, 300));
});
