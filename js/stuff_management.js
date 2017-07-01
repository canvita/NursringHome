/*
  Function  :table test
  Author    :zzx
  Build_Date:2017-07-01
  Version   :1.0
  tips: 函数放置顺序为函数首字母字典序
  执行顺序为firstLoad -> intoTable -> paging -> operate
*/

/*定义全部变量部分*/

//定义传到php的数据对象
var requestData={};
//定义存放当前页面变量的对象
var pageInfo = {};

/*函数部分*/

/*选择每页显示条数函数*/
var displayOption = function(){
  //当select控件发生变化时触发
  $('select').change(function(){
    //获取选择的每页显示条数选项
    requestData.disOption = $(this).val();
    //当发生变化时跳转至第一页
    requestData.curPage = 1;
    intotable(requestData);
  });   
}

/*为初次载入时设置参数*/
var firstLoad = function(){
  //默认按照工号排序
  requestData.sortType = 'staff_serial_number';
  //默认每页显示10条
  requestData.disOption = 10;
  //默认为第一页开始
  requestData.curPage = 1;
  //默认搜索内容无并赋值0
  requestData.query = 0;
  //默认为升序排序
  requestData.ascDesc = 0;
  intotable(requestData);
}

//向表插入数据函数
var intotable = function(requestData){ 
  //从php获取json形式的数据,requestData为需要传到php的数据对象,得到的json数据存放在data中
  $.post('../php/staff_management.php',requestData,function(data){
  //将json数据解析为js可读的数组形式
  json =  JSON.parse(data);  
  //初始化需要写入页面的html段落 
  var html = '';
  //遍历数组
  $.each(json,function(index,value){ 
    //写入html,并得到数据库的数据总数   
    if(!value.total){
         html += '<tr>';
         html += '<td>' + value.staff_serial_number + '</td>';
         html += '<td>' + value.staff_name + '</td>';
         html += '<td>' + numToString('gender',value.staff_gender) + '</td>';
         html += '<td>' + value.staff_phone_num + '</td>';
         html += '<td>' + value.staff_id_number+ '</td>';
         html += '<td>' + numToString('role_id',value.staff_role_id) + '</td>';
         html += '<td>' + value.staff_create_time + '</td>';
         html += '<td>';
         html += '<a class="icon_a sys-color"><i class="fa fa-edit operateBtn"></i></a>';
         html += '<a class="icon_a sys-color operateBtn"><i class="fa fa-info-circle operateBtn"></i></a>';
         html += '<a class="icon_a warning-color operateBtn"><i class="fa fa-user-times operateBtn"></i></a>';
         html += '</td>';
         html += '</tr>';  
      }      
    else{
      pageInfo.total = value.total;
    }       
  });
  //插入html段落
  $('tbody').html(html);
  //执行分页函数
  paging();
  //执行操作函数
  operate();
  });
}

/*将从数据库得到的数字信息转化为可读信息,type为该数字要转化的信息类型,num为信息对应数字*/
var numToString = function(type,num){
  if(type == 'gender'){
    if(num==1){
      return '男';
    }
    else{
      return '女';
    }
  }
  else if(type == 'role_id'){
    if(num ==1){
      return '一般管理员';
    }
    else if(num == 2){
      return '普通护工';
    }
    else if(num == 3){
      return '高级护工';
    }
    else{
      return '超级管理员';
    }
  }
}

/*操作函数*/
var operate = function(){
  //点击每行对应图标,获取该行唯一标识工号staff_serial_number
  $('td i.operateBtn').click(function(e){
    e.preventDefault();
    var staff_serial_number = $(this).parent().parent().siblings(':nth-child(1)').text(); 
  });
}

/*分页设置函数*/
var paging = function(){
  //获取需要显示的总条数
  var total = pageInfo.total;
  //获取当前页面每页显示条数
  var disOption = requestData.disOption;
  //计算得到总页数
  totalPage = Math.ceil(total/disOption); 
  //初始化html
  var html = '';
  //插入前一页按钮
  html += '<li id="previousPage">';        
  html += '<a href="#" aria-label="Previous">';              
  html += '<span aria-hidden="true">前一页</span>';             
  html += '</a></li>'; 
  //当总页数小于6页时页码全部显示
  if(totalPage<=5){
    for(var i=1;i<=totalPage;i++){
      html += '<li><a href="#">' + i + '</a></li>';
    }
  } 
  //当总页数大于5时,部分显示页码           
  else{
    for(var i=1;i<=totalPage;i++){
      if(i==1 || i==2){
        html += '<li><a href="#">' + i + '</a></li>';
      }
      else if(i==3){
        html += '<li><a>...</a></li>';
      }
      else if(i==totalPage){
        html += '<li><a href="#">' + i + '</a></li>';
      }
    }
  }
  //插入后一页按钮
  html += '<li id="nextPage">'
  html += '<a href="#" aria-label="Next">'  
  html += '<span aria-hidden="true">后一页</span>';            
  html += '</a></li>';
  //插入分页html段落
  $('ul.pagination').html(html);
  //获取当前页面
  var curPage = requestData.curPage;
  //禁用和启用前一页后一页
  //当当前页为第一页时禁用前一页按钮
  if(curPage == 1){
    $('#previousPage').addClass('disabled');
    //如果总页数为1,禁用后一页按钮
    if(totalPage == 1){
      $('#nextPage').addClass('disabled');
    }
  }
  //如果当前页为最后一页,禁用后一页按钮
  else if(curPage == totalPage){
    $('#nextPage').addClass('disabled');
  }
  //不是首页和尾页,移除前一页和后一页的禁用
  else{
    $('a[aria-label]').removeClass('disabled');
  }
  //为按钮设置对应功能
  $('ul.pagination a[href]').click(function(){
    //获取页码并存入page变量
    var page = $(this).text();
    //当非首页时,点击前一页当前页码-1
    if(page == '前一页' && curPage != 1){
      requestData.curPage --;
    }
    //当为首页时,保持为首页
    else if(page == '前一页' && curPage == 1){
      requestData.curPage = 1;
    }
    //当非尾页时,点击后一页当前页码+1
    else if(page == '后一页' && curPage != totalPage){
      requestData.curPage ++;
    }
    //当为尾页时,保持为尾页
    else if(page == '后一页' && curPage == totalPage){
      requestData.curPage = totalPage;
    }
    //跳转至对应页码
    else{
      requestData.curPage = page; 
    }   
    intotable(requestData);
  });
}

/*查询函数*/
var query = function(){
  //当输入内容时触发
  $('#searchInput').keyup(function(){
    //获取输入内容
    requestData.query = $(this).val();
    //当查询时跳转至第一页
    requestData.curPage = 1;
    intotable(requestData);   
  })
}

/*排序函数*/
var sort = function(){
  //点击非操作列表头触发
  $('thead th[data-type]').click(function(e){
    //将获取到的排序关键字存入type变量
    var type = $(this).attr('data-type');
    //在页面插入上下箭头,升序时使用向上箭头表示,降序使用向下箭头表示
    //去除原有的箭头
    $(this).siblings().children().html('');
    //如果已经为该列且为升序则改为降序
    if(type == requestData.sortType && requestData.ascDesc < 1){
      requestData.ascDesc += 1;
      $(this).children().html('&#9660;')
    }
    //如果为降序或切换到该列排序时设置为升序,并且设置排序关键字为该列表头
    else{
      requestData.ascDesc = 0;
      requestData.sortType = type;
      $(this).children().html('&#9650;')
    }   
    //执行向表插入数据函数
    intotable(requestData);
  });
}

/*注册函数部分*/

$(document).ready(displayOption);
$(document).ready(firstLoad);
$(document).ready(query);
$(document).ready(sort);