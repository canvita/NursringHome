<?php 
ini_set("display_errors", "On");
error_reporting(E_ALL);
//引入数据库连接php
include('conn.php');

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
$sql = "select * from staff_info"; 
//如果没有查询内容,将数据库staff_info表的所有内容都获取  
if(!$query){
	$sql .= " limit $pageStart,$disOption";
}
//当有查询内容时将查询到的内容返回
else{
	$query = '%'.$query.'%';
	$sql .= " where staff_serial_number like '$query' or staff_name like '$query' or staff_gender like '$query' or staff_phone_num like '$query'
	or staff_id_number like '$query' or staff_role_id like '$query' or staff_create_time like '$query'";
}
//执行sql
$rs = mysqli_query($conn,$sql);
//将数据存入数组
while($row = mysqli_fetch_array($rs)){
$staff_infomation[] = array('staff_serial_number' => $row['staff_serial_number'],'staff_name' => $row['staff_name'],'staff_gender' => $row['staff_gender'],'staff_phone_num' =>$row['staff_phone_num'],'staff_id_number' => $row['staff_id_number'],'staff_role_id' => $row['staff_role_id'],'staff_create_time' => $row['staff_create_time']);
}
//如果获取数据非空,为排序获取数组
if(!empty($staff_infomation)){
	foreach($staff_infomation as $key => $value){
		$staff_serial_number[$key] = $value['staff_serial_number'];
		$staff_name[$key] = $value['staff_name'];
		$staff_gender[$key] = $value['staff_gender'];
		$staff_create_time[$key] = $value['staff_create_time'];
		$staff_phone_num[$key] = $value['staff_phone_num'];
		$staff_id_number[$key] = $value['staff_id_number'];
		$staff_role_id[$key] = $value['staff_role_id'];
	}
	//$ascDesc为1,则降序排序
	if($ascDesc){
		switch ($sortType) {
			case 'staff_serial_number':
				array_multisort($staff_serial_number,SORT_DESC,$staff_infomation);
				break;
			case 'staff_name':
				array_multisort($staff_name,SORT_DESC,$staff_infomation);
				break;
			case 'staff_gender':
				array_multisort($staff_gender,SORT_DESC,$staff_infomation);
				break;
			case 'staff_create_time':
				array_multisort($staff_create_time,SORT_DESC,$staff_infomation);
				break;
			case 'staff_phone_num':
				array_multisort($staff_phone_num,SORT_DESC,$staff_infomation);
				break;
			case 'staff_id_number':
				array_multisort($staff_id_number,SORT_DESC,$staff_infomation);
				break;
			case 'staff_role_id':
				array_multisort($staff_role_id,SORT_DESC,$staff_infomation);
				break;
		}
	}
	//$ascDesc为0,升序排序
	else{
		switch ($sortType) {
			case 'staff_serial_number':
				array_multisort($staff_serial_number,SORT_ASC,$staff_infomation);
				break;
			case 'staff_name':
				array_multisort($staff_name,SORT_ASC,$staff_infomation);
				break;
			case 'staff_gender':
				array_multisort($staff_gender,SORT_ASC,$staff_infomation);
				break;
			case 'staff_create_time':
				array_multisort($staff_create_time,SORT_ASC,$staff_infomation);
				break;
			case 'staff_phone_num':
				array_multisort($staff_phone_num,SORT_ASC,$staff_infomation);
				break;
			case 'staff_id_number':
				array_multisort($staff_id_number,SORT_ASC,$staff_infomation);
				break;
			case 'staff_role_id':
				array_multisort($staff_role_id,SORT_ASC,$staff_infomation);
				break;
	}
	}
	//获取数据库staff_info表总记录条数
	$sql = "select count(staff_serial_number) total from staff_info";
	$rs = mysqli_query($conn,$sql);
	$row = mysqli_fetch_array($rs);
	//如果正在查询,将总数设置为查询到的数据总条数
	if($query){
		$staff_infomation[] = array('total' => sizeof($staff_infomation));
	}
	//如果不在查询,将总数设置为表总记录条数
	else{
		$staff_infomation[] = array('total' => $row['total']);
	}
	//将数组以json格式传回
	echo json_encode($staff_infomation);
}
//如果为空传回1
else{
	echo 1;
}
 ?>
