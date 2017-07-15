// This is the custom JavaScript file referenced by index.html. You will notice
// that this file is currently empty. By adding code to this empty file and
// then viewing index.html in a browser, you can experiment with the example
// page or follow along with the examples in the book.
//
// See README.txt for more information.
var fun = function(){
	$('div.chapter a[href*=wikipedia]').attr({rel :'external',
		title :function(){
			return 'Learn more about '+$(this).text()+' at wikipedia.'
		},
		id:function(index,oldValue){
			return 'wikipedia' + index;
		}
	});
	$('div.chapter p').each(function(index){
		if(index>2){
			$(this).after('<a href="#top">Back to top</a>');
		}
	})
	$('div.chapter a[href^="#top"]').click(function(){
		$('p.location').remove();
		$(this).after('<p class="location">You were here</p>');
	})
	$('<a id="top"></a>').prependTo('body');
	var notes = $('<ol id="notes"></ol>').insertBefore('#footer');
	$('span.footnote').each(function(index){
		$(this).before(['<a href="#footnote-',index+1,'" id="context-',index+1,'" class="context">',
			'<sup>',index+1,'</sup></a>'].join(''))
		.appendTo(notes).append(['&nbsp;<a href="#context-',index+1,'">context</a>'].join(''))
		.wrap('<li id="footnote-'+(index+1)+'"></li>');
	})
	$('span.pull-quote').each(function(index){
		var parentPara = $(this).parent('p');
		parentPara.css('position','relative');
		var clonedCopy = $(this).clone();
		clonedCopy.addClass('pulled')	
		.find('span.drop').html('&hellip;').end()
		.text(clonedCopy.text())
		.prependTo(parentPara);
	});
	$('div#f-author').click(function(){
		parent=$(this).parent();
		if(parent.is('div#container')){
			$(this).wrap('<strong></strong>');
		}
		if(parent.is('strong')){
			$(this).clone().insertAfter(parent);
			parent.remove();
		}
		
	})
}

$(document).ready(fun);