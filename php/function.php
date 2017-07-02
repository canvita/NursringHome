<?php
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
function fetchOne($sql,$result_type=MYSQL_ASSOC){
    include "conn.php";
    $result=mysqli_query($conn,$sql);
    if ($result && mysqli_num_rows($result)>0){
        return mysqli_fetch_array($result,$result_type);
    }else {
        return false;
    }
}
function fetchAll($sql,$result_type=MYSQL_ASSOC){
    include "conn.php";
    $result=mysqli_query($conn,$sql);
    if ($result && mysqli_num_rows($result)>0){
        while ($row=mysqli_fetch_array($result,$result_type)){
            $rows[]=$row;
        }
        return $rows;
    }else {
        return false;
    }
}
function close($link=null){
    return mysqli_close($link);
}
?>