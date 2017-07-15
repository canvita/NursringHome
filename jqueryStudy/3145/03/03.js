// This is the custom JavaScript file referenced by index.html. You will notice
// that this file is currently empty. By adding code to this empty file and
// then viewing index.html in a browser, you can experiment with the example
// page or follow along with the examples in the book.
//
// See README.txt for more information.
function fun(){
	var setBodyClass = function(className){
		$('body').removeClass().addClass(className);
		$('#switcher button').removeClass('selected');
		$('#switcher-' + className).addClass('selected');
		$('#switcher').off('click',hide);
		if(className == 'default'){
			$('#switcher').on('click',hide);
		}	
	}
	var hide = function(e){
		if(!$(e.target).is('button')){
			$('#switcher button').toggleClass('hidden');
		}	
	}
	$('#switcher').hover(function(){
		$(this).addClass('hover');
	},function(){
		$(this).removeClass('hover');
	});
	$('#switcher-default').addClass('selected');
	$('#switcher').on('click',hide);
	$('#switcher').click();
	$('#switcher button').click(function(){
		var className = this.id.split('-')[1];
		setBodyClass(className);
	});
}
var exam = function(){
	$('div.author').click(function(){
		$(this).toggleClass('selected');
	});
	$('h3.chapter-title').dblclick(function(){
		$(this).parent().find('p').toggleClass('hidden');
	})
}
$(document).ready(exam);
$(document).ready(fun);

