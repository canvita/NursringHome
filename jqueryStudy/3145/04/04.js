// This is the custom JavaScript file referenced by index.html. You will notice
// that this file is currently empty. By adding code to this empty file and
// then viewing index.html in a browser, you can experiment with the example
// page or follow along with the examples in the book.
//
// See README.txt for more information.
var hideBody = function(){
	$('body').hide();
}
$(document).ready(hideBody);	
$(document).ready(function(){
	$('body').fadeIn('slow');
});
var q2nd = function(){
	var defaultColor = $('p').css('backgroundColor');
	$('p').hover(function(){
		$(this).css({backgroundColor:'yellow'});
	},function(){
		$(this).css({backgroundColor:defaultColor});
	});
}
$(document).ready(q2nd);
var q3rd = function(){
	$('h2').click(function(){
		$(this).fadeTo('slow',0.25).css({marginLeft:'20px'}).queue(function(){
			$('div.speech p').fadeTo('slow',0.5);
		});
	})
}
$(document).ready(q3rd);
var q4th = function(){
	var switcher = $('div#switcher');
	switcher.css('position','relative');
	var top = 0;
	var left = 0;
	$('div#controler li').click(function(){
		switch(this.id){
			case 'top':
			top -=20;
			switcher.css('top',top + 'px');
			break;
			case 'bottom':
			top +=20;
			switcher.css('top',top +'px');
			break;
			case 'left':
			left -=20;
			switcher.css('left',left + 'px');
			break;
			case 'right':
			left +=20;
			switcher.css('left',left +'px');
			break;
		}
	})
}
$(document).ready(q4th);
var fun = function(){
	var speech = $('div.speech');
	var defaultSize = speech.css('font-size');
	$('#switcher button').click(function(){
		var num = parseFloat(speech.css('font-size'));
		switch (this.id){
			case 'switcher-large':
			num *=1.4;
			break;
			case 'switcher-small':
			num /=1.4;
			break;
			default:
			num = parseFloat(defaultSize);
		}
		speech.animate({fontSize : num+'px'},'slow');
	});
	var firstPara = $('p').eq(1);
	firstPara.slideUp('slow');
	$('a.more').click(function(){
		firstPara.animate({height :'toggle',opacity :'toggle'},'slow');
		var link = $(this);
		if(link.text() == 'read more'){	
			link.text('read less');
		}
		else{
		link.text('read more');
		}
		return false;
	});
	$('div.label').click(function(){
		var paraWidth = firstPara.outerWidth();
		var parent = $(this).parent();
		var switcherWidth = parent.outerWidth();
		parent
		.fadeTo('fast',0.5)
		.css('position','relative')
		.animate({left : paraWidth - switcherWidth},{
			duration: 'slow',
			queue :false})
		.fadeTo('fast',1)
		.slideUp('slow',function(){
			parent.css('backgroundColor','red');
		})
		.slideDown();
	});
	var thirdPara = $('p').eq(2);
	var forthPara = $('p').eq(3);
	thirdPara.css('border','1px solid #000').click(function(){
		var curLink = $(this);
		curLink.next().slideDown('slow',function(){
			curLink.slideUp();
		})
	});
	forthPara.css('backgroundColor','#ccc').hide();

}
$(document).ready(fun);