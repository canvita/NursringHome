//角色添加
$(document).ready(function(){
	$('input[name^="subBox"]').click(function(){
		var curTarget = $(this);
		var checkAllBox = curTarget.parent().prev().prev();
		var name = checkAllBox.attr('name');
		var subBoxes = curTarget.parent().children('input');
		checkStatus(checkAllBox,subBoxes);
		checkAll(name);
	});
	$('input[name^="checkall"]').click(function(){
		var curTarget = $(this);
		var name = curTarget.attr('name');
		var subBoxes = curTarget.next().next().children();
		curTarget.prop('checked')==true ? subBoxes.prop('checked',true) : subBoxes.prop('checked',false);
		checkAll(name);
	})	
	$('.biankuang1 > div > input').click(function(){
		var allCheckBoxes = $(this).parent().next().find('div input');
		allCheckBoxes.prop('indeterminate',false);
		$(this).prop('checked') == true ? allCheckBoxes.prop('checked',true) : allCheckBoxes.prop('checked',false)
	})
});
var checkStatus = function(checkAll,checkes){	
	var l = checkes.length;
	var count = 0;
	checkAll.prop("indeterminate", false);
	checkes.each(function(){
		if($(this).prop("checked")==true && $(this).prop("indeterminate") == false){
			count ++;
		} else if($(this).prop("indeterminate") == true){
			count += 0.1;
		}
	});
	count==l ? checkAll.prop('checked',true) : count==0 ? checkAll.prop('checked',false) : checkAll.prop("indeterminate", true);
}
var checkAll = function(name){
	if(name=='checkall'){
		var checkAll = $('#enterprise');
		var checkes = $('input[name="checkall"]');
	} else if(name=='checkall1') {
		var checkAll = $('#vip');
		var checkes = $('input[name="checkall1"]');
	}
	checkStatus(checkAll,checkes);
}