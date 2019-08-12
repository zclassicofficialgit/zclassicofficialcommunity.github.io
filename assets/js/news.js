$(document).ready(function() {
	$.getJSON("/services/contents/telegram.php?channel=ZclassicCE_Announcement&callback=?", function(data) {
		if (data) {
			$(".newslist").html(data.content);
			$("i.tgme_widget_message_bubble_tail").remove();
			$("time").timeago();
			$(".news").show();
		}
	});
});