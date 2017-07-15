$(document).ready(function(){
	txt = 'alert("hi")';
	eval(txt);
});
function searchInStr(string,target){
	var position = [];
	var pos = string.indexOf(target);
	while(pos>-1){
		position.push(pos);
		pos = string.indexOf(target,pos+1);
	}
	return position;
}