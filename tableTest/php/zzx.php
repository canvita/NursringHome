<?php 	
//引入数据库连接
include("conn.php"); 
//引入类
require_once './Classes/PHPExcel.php';
require_once './Classes/PHPExcel/IOFactory.php';
require_once './Classes/PHPExcel/Reader/Excel5.php';
//获取链接中的input
$input = isset($_REQUEST['input']) ? $_REQUEST['input'] : 0;
//当input为1时,将excel导入数据库
if($input==1){
	//设置要使用的excel版本
	$objReader = PHPExcel_IOFactory::createReader('excel2007');
	//设置要导入的excel的路径
	$excelpath='example.xls';
	//将获取的excel对象赋值给$objPHPExcel
	$objPHPExcel = $objReader->load($excelpath); 
	//获取要获取的表序号
	$sheet = $objPHPExcel->getSheet(0); 
	//获取总行数
	$highestRow = $sheet->getHighestRow();    
	//获取总列数
	$highestColumn = $sheet->getHighestColumn();
	 //从第二行开始读取数据
	for($j=2;$j<=$highestRow;$j++){                      
		$str = '';
		//从A列读取数据
	    for($k='A';$k<=$highestColumn;$k++)           
		{ 	
			//将一行数据存入str中并用|分割
			$str .= $objPHPExcel->getActiveSheet()->getCell("$k$j")->getValue().'|';
		}
		//explode分割str
		$value = explode('|',$str);
		//将数据写入数据库
		$sql="insert into student(id,name,grade) values('$value[0]','$value[1]','$value[2]')";
		mysqli_query($conn,$sql);
	} 
}
//获取要被删除的数据的第一个id
$id0 = isset($_REQUEST['id0']) ? $_REQUEST['id0'] : 0;
if($id0){
	//获取要删除的行数总数
	$length = $_REQUEST['length'];
	//sql语句
	$sql = "delete from student where id='$id0'";
	//将要删除的id连接到sql语句中
	for($i=1;$i<$length;$i++){
		$str = 'id' . $i;
		$id = $_REQUEST[$str];
		$sql .= "or id ='$id'";
	}
	//执行sql语句
	mysqli_query($conn,$sql);	
}
//获取数据库数据
//sql语句
$sql = "select * from student";
$rs = mysqli_query($conn,$sql);
//将获取的数据存入数组
while($row = mysqli_fetch_array($rs)){
	$array[] = array('id' => $row['id'],'name' => $row['name'],'grade' => $row['grade']);
}
//获取排序方式,如果没有设为0
$sortType = isset($_REQUEST['sortType']) ? $_REQUEST['sortType'] : 0;
if($sortType){
	//为multisort排序设置数组
	foreach($array as $key => $row){
	    $id[$key]  = $row['id'];
	   	$name[$key] = $row['name'];
	   	$grade[$key] = $row['grade'];
	}
	//根据不同排序方式进行不同排序
	if($sortType=='sortByIdBtn'){
		array_multisort($id, SORT_ASC,$array);
	}
	if($sortType=='sortByNameBtn'){
		array_multisort($name,SORT_ASC,$array);	
	}
	if($sortType=='sortByGradeBtn'){
		array_multisort($grade,SORT_ASC,$array);	
	}
}
//获取数组长度
$num = sizeof($array);
//将数组最后一个键值对设为数组长度
$array[] = array('num' => $num);
//以json格式输出输出并传到客户端
echo json_encode($array);
?>