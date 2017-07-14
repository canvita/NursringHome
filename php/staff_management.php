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
//如果没有查询内容,将数据库staff_info表的所有内容都获取  
if(!$query){
	$sql .= " (select * from staff_info where staff_is_use=1 limit $pageStart,$disOption)";
}
//当有查询内容时将查询到的内容返回
else{
	$query = '%'.strtolower($query).'%';
	$sql .= " (select * from staff_info where lower(staff_serial_number) like '$query' or lower(staff_name) like '$query' or lower(staff_phone_num) like '$query' or lower(staff_id_card_no) like '$query' and staff_is_use=1 limit $pageStart,$disOption )";
}
$sql .= " t order by $sortType";
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
$staff_infomation[] = array('staff_serial_number' => $row['staff_serial_number'],'staff_name' => $row['staff_name'],'staff_gender' => $row['staff_gender'],'staff_phone_num' =>$row['staff_phone_num'],'staff_id_card_no' => $row['staff_id_card_no'],'staff_role_id' => $row['staff_role_id'],'staff_create_time' => $row['staff_create_time'],'staff_id' => $row['staff_id']);
}
	//获取数据库staff_info表总记录条数
	$sql = "select count(staff_serial_number) total from staff_info where staff_is_use=1";
	$row = fetchOne($sql);
	//如果数据不为空,回传数据
	if(!empty($staff_infomation)){
		//如果正在查询,将总数设置为查询到的数据总条数
		if($query){
			$staff_infomation[] = array('total' => sizeof($staff_infomation));
		}
		//如果不在查询,将总数设置为表总记录条数
		else{
			$staff_infomation[] = array('total' => $row['total']);
		}
		//将数组以json格式传回
			echo json_encode($staff_infomation,JSOM_UNESCAPED_UNICODE);
	}
	//如果数据为空回传0
	else{
		echo 0;
	}
	
//如果为空传回1
 ?>
