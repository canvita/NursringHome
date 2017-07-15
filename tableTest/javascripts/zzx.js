//定义全局变量


//显示表格函数
var sortTable = function(requestData){
	//将服务端传来的json数据存入jquery可以解析的data中
	$.post('php/zzx.php',requestData,function(data){
		json = JSON.parse(data);
		var html = '';
		//遍历data并将数据插入到tbody中
		$.each(json,function(key,value){
			if(value.num!=0){
				if(!value.num){
				html += '<tr>';
				html += '<td><input type="checkbox"></td>';
				html += '<td>' + value.id + '</td>';
				html += '<td>' + value.name + '</td>';
				html += '<td>' + value.grade + '</td>';
				html += '</tr>';
				}
			}
			//显示共有多少条数据	
			$('#sumNum').html('共有' + value.num + '条记录');
			countAll = value.num;
		});
		$('tbody').html(html);
	});
}

//选择和删除列表行函数
var selAndDel = function(){	
	//全选按钮单击函数
	$('#sltAllBtn').click(function(){
		//获得当前所有的checkbox
		var checkboxes = $('tbody input:checkbox')	
		//如果没有所有的按钮都被选中,则全选
		if(checkboxes.prop('checked') == true){
			checkboxes.prop('checked',false);
		}
		//如果都选中了,则全不选
		else{
			checkboxes.prop('checked',true);		
		}
		return false;
	});
	//删除按钮
	$('#deleteBtn').click(function(){
		//选中当前所有选中的checbox
		var checkboxes = $('tbody input').filter(function(){
			return $(this).prop('checked') == true;
		});
		var requestData = {};
		//获取所有checkbox对应的学号并将它们连接到参数parameter上
		$.each(checkboxes,function(index){
			var id = $(this).parent().next().text();
			var term = 'id' + index;
			requestData[term] = id;
		})
		if(checkboxes.length!=0){
			requestData.length = checkboxes.length;
		}
		sortTable(requestData);
	});
	return false;
}
//在href参数值设置是否要导入excel,设置方法同删除按钮
var input = function(){
	$('#inputBtn').click(function(){
		var requestData = {};
		requestData.input = 1;
		sortTable(requestData);
		return false;
	})
}
//sort and load table
var load = function(){
	//load table
	sortTable();
	//按学号,姓名,成绩排序按钮
	$('a.sortBtn').click(function(e){
		//阻止默认行为
		e.preventDefault();
		//获得按钮的href值
		var requestData={sortType :  $(this).attr('id')};
		//将href传入到sortTable中
		sortTable(requestData);	
	});	
}

//注册函数
$(document).ready(load);
$(document).ready(selAndDel);
$(document).ready(input);
