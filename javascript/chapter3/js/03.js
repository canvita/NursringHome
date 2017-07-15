$(document).ready(function(){
	$('p').click(function(){
		var count = 0;
		var all = $('#cb').children()
		all.each(function(){
			if($(this).prop('checked')==true){
				count ++;
			}
		});
		all.prop('checked',true);
	});
	$('#cb1').prop('checked').change(function(){
		alert(22);
	})
});