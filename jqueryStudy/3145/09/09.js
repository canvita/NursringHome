// This is the custom JavaScript file referenced by index.html. You will notice
// that this file is currently empty. By adding code to this empty file and
// then viewing index.html in a browser, you can experiment with the example
// page or follow along with the examples in the book.
//
// See README.txt for more information.
var fun = function(){
	var stripe = function(){
		$('#news').find('.alt').removeClass('alt');
		$('#news tbody').each(function(){
			$(this).children(':visible').has('td').filter(function(index){
				return (index % 4) < 2;
			}).addClass('alt');
		})
	}
	stripe();
	$('#topics a').click(function(event){	
		event.preventDefault();
		$('#topics a.selected').removeClass('selected');
		$(this).addClass('selected');
		topic = $(this).text();
		$('tr').show();
		if(topic != 'All'){
			$('#news td:nth-child(4):not(:contains("' + topic + '"))').parent().hide();
			/*$('#news tr:has(td):not(:contains("' + topic + '"))').hide();*/
		}
		stripe();
	})
}
$(document).ready(fun);