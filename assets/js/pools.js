$(document).ready( function () {
   $.get("//zclassic.mindland.it/services/contents/json.php?wrapjson=false&url=https://miningpoolstats.stream/data/time?t="+new Date().getTime(), function(time) {
	$.getJSON("//zclassic.mindland.it/services/contents/json.php?wrapjson=true&url=https://data.miningpoolstats.stream/data/zclassic.js?t="+time+"&callback=?", function(data) {
		if (data) {
			$(".algo").html(data.algo);
			$(".height").html(data.height);
			$(".difficulty").html((data.difficulty/1000).toFixed(4));	
			$(".hashrate").html((data.hashrate/1000).toFixed(4));
			$(".poolshash").html((data.poolshash/1000).toFixed(4));
			$(".avgBlock24h").html(data.block_time_average);
			$(".unit").html(data.unit);
			$(".poolminers").html(data.poolsminers)
			var poolHtml = '<thead><tr><th></th><th></th><th>pool</th><th>country</th><th>% hash</th><th>hashrate (KSol/s)</th></tr></thead><tbody>';
			var pools = data.data.sort(function(a,b) { return b.hashrate - a.hashrate});
			var poolhashrate = 0;
			for (var i=0; i < pools.length; i++) {
				var pool = data.data[i];
				poolhashrate += pool.hashrate;
			}
			for (var i=0; i < pools.length; i++) {
				var pool = data.data[i];
				if (pool.hashrate > 0) {
					poolHtml += '<tr><td class="center"><img width="20px" src="/assets/images/flags/'+pool.country.split('|')[0].toLowerCase()+'.png" alt="'+pool.country.split('|')[0]+'"/></td><td><img class="'+(''+pool.pool_id).substring(0, (''+pool.pool_id).indexOf('.'))+'" style="display:none;" width="20px" src="/assets/images/gold_medal.png"/></td><td><a href="'+pool.url+'" target="_blank">' + pool.pool_id + '</a></td><td>' + pool.country.split('|')[1] +'</td><td class="right">'+((pool.hashrate/poolhashrate)*100).toFixed(2)+'%</td><td class="right">' + (pool.hashrate/1000).toFixed(4) + '</td></tr>';
				}
			}
			poolHtml += '</tbody>';
			$(".pools").show();
			$("#poolstable").html(poolHtml);
			$("#poolstable").DataTable({responsive: true, paging: false, searching: false, info: false, ordering: false});	
		}
	});
   });
});
