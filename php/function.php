<?php
// Function  :table test
// Author    :ldy
// Build_Date:2017-7-3
// Version   :1.0

//错误跳转类
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

//数据库操作类

//数组传入形式为
/* array(
'username'=>'ldy',
'password'=>'123',
'email'=>'ldy@163.com'
) */
//数据库插入函数，传入形式为数组，分别传入数组及表名
function insert($array,$table){
    include "conn.php";
    if(!is_array($array)){echo "it is not  an array";}
    if(!is_null($table)){echo "table is null";}
    $keys=join(',',array_keys($array));
    $values="'".join("','", array_values($array))."'";
    $sql="insert {$table}({$keys}) VALUES ({$values})";
    $res=mysqli_query($conn,$sql);
    if($res){
        return mysqli_insert_id();
    }else{
        return false;
    }
}
//数据库更新函数，分别写入数据（数组），表名及条件
function update($array,$table,$where=null){
    include "conn.php";
    if(!is_array($array)){echo "it is not an array";}
    if(!is_null($table)){echo "table is null";}
    foreach ($array as $key=>$val){
        $sets.=$key."='".$val."',";
    }
    $sets=rtrim($sets,','); //去掉SQL里的最后一个逗号
    $where=$where==null?'':' WHERE '.$where;
    $sql="UPDATE {$table} SET {$sets} {$where}";
    $res=mysqli_query($conn,$sql);
    if ($res){
        return mysqli_affected_rows();
    }else {
        return false;
    }
}
//数据库删除函数，分别写入表名及条件
function delete($table,$where=null){
    include "conn.php";
    if(!is_null($table)){echo "table is null";}
    $where=$where==null?'':' WHERE '.$where;
    $sql="DELETE FROM {$table}{$where}";
    $res=mysqli_query($conn,$sql);
    if ($res){
        return mysqli_affected_rows();
    }else {
        return false;
    }
}
//查询一条记录
function fetchOne($sql_row){
    include "conn.php";
    $result=mysqli_query($conn,$sql_row);
    if ($result){
        $row=mysqli_fetch_array($result);
        return $row;
    }else {
        return false;
    }
}
//得到表中所有数据
function fetchAll($sql_row){
    include "conn.php";
    $result=mysqli_query($conn,$sql_row);
    if ($result){
        while ($row=mysqli_fetch_array($result)){
            $rows[]=$row;
        }
        return $rows;
    }else {
        return false;
    }
}
//取得表中记录条数
function getTotalRows($sql_row){
    include "conn.php";
    $result=mysqli_query($conn,$sql_row);
    if($result){
        return mysqli_num_rows($result);
    }else {
        return false;
    }
    
}
//关闭数据库连接
function close($link=null){
    return mysqli_close($link);
}
?>