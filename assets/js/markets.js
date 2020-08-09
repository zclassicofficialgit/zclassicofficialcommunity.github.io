$(document).ready(function() {
	$.getJSON("//zclassic.mindland.it/services/contents/json.php?url=https://coinmarketcap.com/currencies/zclassic/&callback=?", function(data) {
		if (data) {

			var marketHtmlIdx = data.content.indexOf('<table id="markets-table"');
			var marketHtml = data.content.substring(marketHtmlIdx,data.content.indexOf('</table>',marketHtmlIdx) + 8);
			marketHtml = marketHtml.replace(/data-src=\"http/g,'src="http');
			marketHtml = marketHtml.replace(/src=\"data/g,'data-src="data');
			$(".markets").show();
			$("#marketstable").html(marketHtml);
			$("#marketstable").DataTable({responsive: true, paging: false, searching: false, info: false, ordering: false});	


			var summaryHtmlIdx = data.content.indexOf('<div class="cmc-table__table-wrapper-outer"><div><table>');
			var summaryHtml = data.content.substring(summaryHtmlIdx ,data.content.indexOf('</table>',summaryHtmlIdx) + 8);
			$(".summary").show();
			$("#summarytable").html(summaryHtml);
			$("#summarytable").DataTable({responsive: true, paging: false, searching: false, info: false, ordering: false});	

		}
	});
});