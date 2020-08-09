<?php

$string = get_data("http://www.tokenview.com:8088/coin/marketInfo/zcl");
$json_a = json_decode($string, true);

echo $json_a['data']['circulatingSupply'];


function get_data($url) {
	$ch = curl_init();
	$timeout = 10;
	curl_setopt($ch, CURLOPT_URL, $url);
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
	curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, $timeout);
	$data = curl_exec($ch);
	curl_close($ch);
	return $data;
}

?>