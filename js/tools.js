// 专门放一些工具
// 添加样式
function addClass(obj,aClass){
	var nowClass = obj.className.split(' ');
	if(!obj.className){
		obj.className  = aClass;
		return;
	}
	for(var i=0;i<nowClass.length;i++){
		if(nowClass[i]==aClass) return;
	}
	obj.className +=' '+aClass;
}

//移除样式
function removeClass(obj,rClass){
	var nowClass = obj.className.split(' ');
	if(!obj.className) return;
	for(var i=0;i<nowClass.length;i++){
		if(nowClass[i] == rClass){
			nowClass.splice(i,1);
			obj.className = nowClass.join(' ');
			return;
		}
	} 
}

// 替换样式
function replaceClass(obj,oldClass,newClass){
	var nowClass = obj.className.split(' ');
	if(!obj.className) return;
	nowClass.splice(nowClass.indexOf(oldClass),1,newClass);
	obj.className = nowClass.join(' ');
	return;
}

// 获取一个范围内的数
function getNum(min,max){
	return Math.random()*(max-min)+min;
}

//找出代码中的数字
function findNum(num){
	var str = num.split('/')
	return str[str.length-1].match(/\d+/g)
}