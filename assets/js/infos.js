$(document).ready( function () {
	$.getJSON("//zclassic.mindland.it/services/contents/json.php?wrapjson=true&url=https://widgets.coinmarketcap.com/v1/ticker/zclassic/&callback=?", function(dataArr) {
		if (dataArr && dataArr.length > 0) {
			var data = dataArr[0];
			$(".rank").html(data.rank);
			$(".available_supply").html(numeral(+data.available_supply).format('0,0'));
			$(".symbol").html(data.symbol);
			$(".price_usd").html(numeral(+data.price_usd).format('0,0[.]00 $'));
			$(".price_btc").html(data.price_btc + ' <i class="fab fa-btc"></i>');
			$(".market_cap_usd").html(numeral(+data.market_cap_usd).format('0,0[.]00 $'));	
			$(".total_volume_24h").html((+data.total_volume_24h).toFixed(2));	
			$(".percent_change_1h").html((+data.percent_change_1h).toFixed(2));	
			$(".percent_change_24h").html((+data.percent_change_24h).toFixed(2));	
			$(".percent_change_7d").html((+data.percent_change_7d).toFixed(2));	
			$(".24h_volume_usd").html(numeral(+data['24h_volume_usd']).format('0,0[.]00 $'));	
			$(".infos").show();

			// crowdfounding
			var btcCrowdAddress = '19CYTo2oXXPFCRmWWpn4FEFBZXFwgTZK8T';
			var zclCrowdAddress = 't1Wx6YG4db5RdQxpBFj1CMZrshQ2wQPEgDE';
			$.getJSON("//zclassic.mindland.it/services/contents/json.php?url=https://blockchain.info/address/19CYTo2oXXPFCRmWWpn4FEFBZXFwgTZK8T?format=json&wrapjson=true&callback=?", function(databtc) {
					if (databtc) {
						var btc = 0;			
						console.log(databtc.final_balance/100000000);
						btc += databtc.final_balance/100000000;
						
						$.getJSON("//zclassic.mindland.it/services/contents/json.php?url=https://explorer.zcl.zelcore.io/api/addr/t1Wx6YG4db5RdQxpBFj1CMZrshQ2wQPEgDE/?noTxList=1&wrapjson=true&callback=?", function(datazcl) {
								if (datazcl) {
									var zcl = 0;
									console.log(datazcl.balance);
									zcl += datazcl.balance;
										
									btc += zcl * data.price_btc;
									zcl  = btc / data.price_btc;									

									$(".crowdfounding-addr-btc").html('<a href="https://www.blockchain.com/btc/address/'+btcCrowdAddress+'" target="_blank">'+btcCrowdAddress+'</a>');
									$(".crowdfounding-addr-zcl").html('<a href="https://explorer.zcl.zelcore.io/address/'+zclCrowdAddress+'" target="_blank">'+zclCrowdAddress+'</a>');									$(".crowdfounding-btc").html(btc.toFixed(4));
									$(".crowdfounding-zcl").html(zcl.toFixed(4));										
								}
						});
					}
			});

		}
	});
});