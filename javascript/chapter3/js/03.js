$(document).ready(function(){
	function Person(name, age, job){
		this.name = name;
		this.age = age;
		this.job = job;
		this.friends = ["shelby","court"];
		if(typeof this.sayName != "function"){
			Person.prototype.sayName = function(){
				alert(this.name);
			};
		}
	}
	var person1 = new Person("nico", 29, "Software Engineer");
	var person2 = new Person("greg", 30, "Doctor");
	person1.friends.push("van");
	alert(person2.friends);
	alert(person1.friends);
	alert(person1.friends === person2.friends);
	alert(person1.sayName === person2.sayName);
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
function hasPrototypeProperty(object,name){
	return !object.hasOwnProperty(name) && (name in object);
}