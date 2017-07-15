
<?php
function page_redirect($info,$url,$mode){
		echo "<script>";
		if(!is_null($info)){
			echo "alert(\"$info\");";
		}
		if(!is_null($url)){
			echo "window.location=\"$url\";";
		}
		else{
			if($mode==1){
				echo "window.history.back(-1);";
			}
		}
		echo "</script>";
		if(!is_null($url) || !is_null($mode)) die();
	}
?>