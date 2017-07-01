<?php
	$conn=mysqli_connect("localhost","zzx","123456","nursinghome");
	if(!$conn) die("db connect fail!");
	$sql="set names utf8";
	mysqli_query($conn,$sql);
?>