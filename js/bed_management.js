var requestData = {};
requestData.building = "博文苑";
requestData.floor = 1;
requestData.queryContext = 0;
var bedInfo = {
	房间1: {
		bed1: {
			bed_name: "1号床",
			equipment_id: "10011",
			bed_status: 0
		},
		bed2: {
			bed_name: "2号床",
			equipment_id: "10012",
			bed_status: 0
		}
	},
	房间2: {
		bed1: {
			bed_name: "1号床",
			equipment_id: "10013",
			bed_status: 1
		},
		bed2: {
			bed_name: "1号床",
			equipment_id: "10013",
			bed_status: 1
		}
	},
	房间3: {
		bed1: {
			bed_name: "1号床",
			equipment_id: "10013",
			bed_status: -1
		}
	}
};
var numOfFloors = 8;

$(document).ready(function(){
	createSelect(numOfFloors);
	createView(bedInfo);
	$('select[name="building"]').change(function(){
		requestData.building = $(this).val();
	});
	$('select[name="floor"]').change(function(){
		requestData.floor = $(this).val();
	});
	$('input[type="submit"]').click(function(e){
		e.preventDefault();
		requestData.queryContext = $('input[type="search"]').val();
	})
})
function createSelect(num){
	var html = '';
	for(var i = 1; i <= num; i++){
		if(i==1){
			html += '<option checked="checked" value="1">1层</option>';
		} else {
			html += '<option value="' + i + '">' + i + '层</option>';
		}
	}
	$('select[name="floor"]').html(html);
}
function createView(data){
	var html = '';
	$.each(data,function(index,value){
		html += '<fieldset class="item">';
		html += '<legend class="font-size-18">';
		html += index + '</legend>';
		$.each(value,function(key,item){
			var flag = item.bed_status;
			var status = (flag == 1 ? 'bedset-normal' : flag == 0 ? 'bedset-unuse' : 'bedset-inormal');
			html += '<div class="bedset ' + status + '">';
			html += '<p class="font-size-14 center">' + item.bed_name + '</p>';
			html += '<p class="font-size-14 center">设备ID：' + item.equipment_id + '</p>';
			html += '</div>';
		});
		html += '</fieldset>';
	});
	$('#brand-waterfall').html(html);
	$('#brand-waterfall').waterfall();
}
function getData(url,requestData){
	$.post(url,requestData,function(data){
		var json = JSON.parse(data);
		createView(json);
	})
}