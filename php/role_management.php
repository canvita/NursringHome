<?php 
ini_set("display_errors", "On");
error_reporting(E_ALL);
//引入数据库连接php
include('conn.php');
//引入功能
include('function.php');

//获取请求数据
//升序或降序 ,1为降序,0为升序
$ascDesc = $_REQUEST['ascDesc'];
//获取排序关键字
$sortType = $_REQUEST['sortType'];
//获取当前页
$curPage = $_REQUEST['curPage'];
//获取每页显示条数
$disOption = $_REQUEST['disOption'];
//计算每页的开始索引
$pageStart = ($curPage-1) * $disOption;
//获取查询内容,默认为0
$query = $_REQUEST['query'];

//编写sql语句
$sql = "select * from"; 
//如果没有查询内容,将数据库role_info表的所有内容都获取  
if(!$query){
	$sql .= " (select * from role_info where role_is_use=1 limit $pageStart,$disOption)";
}
//当有查询内容时将查询到的内容返回
else{
	$query = '%'.strtolower($query).'%';
	$sql .= " (select * from role_info where lower(role_name) like '$query' and role_is_use=1 limit $pageStart,$disOption )";
}
$sql .= " t order by convert($sortType USING gbk)";
if($ascDesc){
	$sql .= " DESC";
}
else{
	$sql .= " ASC";
}
//执行sql
$rs = mysqli_query($conn,$sql);
//将数据存入数组
while($row = mysqli_fetch_array($rs)){
$role_infomation[] = array('role_name' => $row['role_name'],'role_description' => $row['role_description']);
}
	//获取数据库role_info表总记录条数
	$sql = "select count(role_id) total from role_info where role_is_use=1";
	$row = fetchOne($sql);
	//如果数据不为空,回传数据
	if(!empty($role_infomation)){
		//如果正在查询,将总数设置为查询到的数据总条数
		if($query){
			$role_infomation[] = array('total' => sizeof($role_infomation));
		}
		//如果不在查询,将总数设置为表总记录条数
		else{
			$role_infomation[] = array('total' => $row['total']);
		}
		//将数组以json格式传回
			echo json_encode($role_infomation);
	}
	//如果数据为空回传0
	else{
		echo 0;
	}
	
//如果为空传回1
 ?>
