// This is the custom JavaScript file referenced by index.html. You will notice
// that this file is currently empty. By adding code to this empty file and
// then viewing index.html in a browser, you can experiment with the example
// page or follow along with the examples in the book.
//
// See README.txt for more information.
var fun = function(){
	$('#letter-a a').click(function(){
		$('#dictionary').load('a.html');
		//$.getScript('c.js');
		return false;
	});
	$('#letter-b a').click(function(event){
		event.preventDefault();
		$.getJSON('b.json',function(data){
			var html = '';
			$.each(data,function(key,value){
				html += '<div class="entry">';
				html += '<h3 class="term">' + value.term + '</h3>';
				html += '<div class="part">' + value.part + '</div>';
				html += '<div class="definition">' + value.definition;
				if(value.quote){
					html += '<div class="quote">';
					$.each(value.quote,function(lineIndex,line){
						html += '<div class="quote-line">' + line + '</div>';
					})
					if(value.author){
						html += '<div class="quote-author">' + value.author + '</div>';
					}
					html += '</div>';
				}
				html += '</div>';
				html += '</div>';
			}); 
			$('#dictionary').html(html);
		});
	});
};
	
$(document).ready(fun);