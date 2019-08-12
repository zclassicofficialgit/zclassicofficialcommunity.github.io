<?php
	header("Content-type:text/javascript");
	$p_url = isset($_POST['channel'])? $_POST['channel'] : $_GET['channel'];
	$p_callback = isset($_POST['callback'])? $_POST['callback'] : $_GET['callback'];
	$p_wrapjson = isset($_POST['wrapjson'])? $_POST['wrapjson'] : $_GET['wrapjson'];
	$p_encoding = isset($_POST['encoding'])? $_POST['encoding'] : $_GET['encoding'];

	$content = get_data('https://t.me/s/'.$p_url);
	$content = substr($content,strpos($content,'<section class="tgme_channel_history js-message_history">'));
	$content = substr($content,strpos($content,'</a>')+4);
	$content = substr($content,0,strrpos($content,'</section>'));
	$encoding = mb_detect_encoding($content);
	$callback = $p_callback;
	//echo $content;
	$contentText = "";

	if (isset($p_wrapjson)) {
		echo ($callback == null ? '' : $callback.'(').$content.($callback == null ? '' : ');');
	}
	else {
		if (isset($p_encoding)) {
			if ($p_encoding == 'base64') {
				$contentText = base64_encode($content);		
			}
			else {
				$contentText = utf8_encode_all($content); // default encoding
			}
		}
		else {
			$contentText = utf8_encode_all($content); // default encoding
		}
		echo ($callback == null ? '' : $callback.'(').'{ "url" : '.json_encode($p_url).', "encoding" : "'.$encoding.'", "content" : '.json_encode($contentText).'}'.($callback == null ? '' : ');');
	}
	
	function get_data($url) {
		$ch = curl_init();
		$timeout = 5;
		curl_setopt($ch, CURLOPT_URL, $url);
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
		curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, $timeout);
		$data = curl_exec($ch);
		curl_close($ch);
		return $data;
	}

	function utf8_encode_all($dat) { 
	  if (is_string($dat)) utf8_encode($dat); 
	  if (!is_array($dat)) return $dat; 
	  $ret = array(); 
	  foreach($dat as $i=>$d) $ret[$i] = utf8_encode_all($d); 
	  return $ret; 
	} 
?>