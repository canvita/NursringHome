var showPic = function(whichPic){
	var source = whichPic.getAttribute('href');
	var text = whichPic.getAttribute('title');
	var placeholder = document.getElementById('placeholder');
	placeholder.setAttribute('src',source);	
	var description = document.getElementById('description');
	description.firstChild.nodeValue = text;
}
$(document).ready(function(){
	var links = document.getElementsByTagName('a');
	for(var i=0;i<links.length;i++){
		links[i].onclick = function(){
			showPic(this); 
			return false;
		}
	}
})
