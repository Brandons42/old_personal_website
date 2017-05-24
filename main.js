$(document).ready(function() {
	$(".responsive").each(function() {
		if ($(this).width() > 602) {
			$(this).children("img").addClass("logo");
		} else {
			$(this).children("img").css("width", "80%");
		}
	});
	var arr;
	var max;
	$(".sameheight").each(function() {
		arr = [];
		$(this).find(".card").each(function() {
			arr.push($(this).height());
		});
		max = 20 + Math.max.apply(null, arr);
		$(this).find(".card").css("height", max + "px");
	});
	var id;
	var target;
	$("#nav a").click(function(){
		id = $(this).attr("href");
		console.log(id);
		console.log($(id).scrollTop());
		$("html, body").animate(
			{
				scrollTop: $(id).scrollTop()
			}, 2000);
	});
});
