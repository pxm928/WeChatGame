//阻止默认事件
document.addEventListener('touchstart', function(e) {
	e.preventDefault();		
});	
//计算rem
(function(){
	var html = document.documentElement;
	var htmlW = html.clientWidth;
	html.style.fontSize = htmlW/16+'px';
})();
//预加载
function loading(){
	var loadingArr = [
		'../images/arrow2.png',
		'../images/human2.png',
		'../images/human3.png',
		'../images/human4.png',
		'../images/human5.png',
		'../images/human6.png',
		'../images/lighthouse.png',
		'../images/miaov.png',
		'../images/pirate.png',
		'../images/pirate2.png',
		'../images/planet.png',
		'../images/rocket.png',
		'../images/rocket2.png',
		'../images/rocket3.png',
		'../images/run.png',
		'../images/smork.png',
		'../images/smork2.png',
		'../images/smork3.png',
		'../images/smork4.png',
		'../images/starLine.png',
		'../images/starotund.png',
		'../images/starSmall.png',
		'../images/stop.png',
		'../images/sun.png',
		'../images/text1.png',
		'../images/text2.png',
		'../images/text3.png',
		'../images/thanks.png',
		'../images/widthyou.png'
	]
	var bImgLoad = false;

	var count = 0;
	for(var i=0;i<loadingArr.length;i++){
		var oImg = new Image();
		oImg.src = loadingArr[i];
		oImg.onload = function(){
			count++;
			if(count==loadingArr.length){
				bImgLoad = true;
			}
		}
	}
}

//进入游戏
function playgame(){
	var pagefourbtn = document.querySelector('.pagefourbtn');
	pagefourbtn.addEventListener('touchend',function(){
		window.location.href = 'game.html'
	})
}

//开始游戏
function startgame(){
	var stargame = document.querySelector('.stargame');
	var drop = document.querySelector('.drop')
	stargame.addEventListener('touchend',function(e){
		addClass(drop,'hiddentip')
		page.bindEvent();
		page.next();
		e.stopPropagation();
	})
}

//再来一次
function repeatgame(){
	var repeatgame = document.querySelector('.repeatgame');
	var drop1 = document.querySelector('.drop1');
	repeatgame.addEventListener('touchend',function(e){
		removeClass(drop1,'showtip')
		var page = new gamepage();
		page.bindEvent();
		page.next();
		e.stopPropagation();
	})
}


// 切换页面
function change(){
	var pages = document.querySelectorAll('.page');
	var now = 0;
	var next = 0;
	var isshow = false;
	MTouch('#wrap').swipeUp(function(){
		if(isshow)return;
		next = now+1;
		isshow = true;
		if(next==pages.length){
			window.location.href='game.html';
			isshow = false;
			return;
		}
		// 下一张显示在下方位置
		replaceClass(pages[next],'sectionout','sectionstart');
		replaceClass(pages[now],'sectionstart','sectionout');
		setTimeout(function(){
			isshow = false;
			replaceClass(pages[now],'sectionout','sectionHid');		
			now = next;
		},1000)
	});
	MTouch('#wrap').swipeDown(function(){
		if(isshow)return;		
		next = now-1;
		isshow = true;
		if(next<0){
			isshow = false;
			return;
		}
	// 	// 下一张显示在下方位置
	replaceClass(pages[next],'sectionout','sectionstart')
	replaceClass(pages[now],'sectionstart','sectionout')
		setTimeout(function(){		
			isshow = false;
			replaceClass(pages[now],'sectionout','sectionHid')		
			now = next;
		},1000)
	});
}
// 音乐播放
function musicplay(){
	var bgmusic = document.querySelector('.music');
	var bgaudio = document.querySelector('.music audio');
	bgmusic.addEventListener('touchstart',function(){
		if(!bgaudio.paused){
			bgaudio.pause();
			replaceClass(bgmusic,'music','musicstop')
		}else{
			bgaudio.play();
			replaceClass(bgmusic,'musicstop','music')
		}
	})
}


function gamepage(){
	var gamecanvas = document.querySelector('#gamecanvas');
	var cxt = gamecanvas.getContext("2d");
	gamecanvas.width = document.documentElement.clientWidth;
	gamecanvas.height = document.documentElement.clientHeight;


	var _this = this;
	_this.monster = {
		// 怪物类型以及死亡时图片大小
		mon1:function(option){
			var img = new Image();
			img.src="images/monster1.png";
			img.onload = function(){
				jc.start(option.canvas,true);
				jc.image(img,-100,-100,109/1.5,114/1.5).id(option.id).level(2);
				jc.start(option.canvas,true);
			}
		},
		mon2:function(option){
			var img = new Image();
			img.src="images/monster2.png";
			img.onload = function(){
				jc.start(option.canvas,true);
				jc.image(img,-100,-100,109/1.5,113/1.5).id(option.id).level(2);
				jc.start(option.canvas,true);
			}
		},
		mon3:function(option){
			var img = new Image();
			img.src="images/monster3.png";
			img.onload = function(){
				jc.start(option.canvas,true);
				jc.image(img,-100,-100,107/1.5,129/1.5).id(option.id).level(2);
				jc.start(option.canvas,true);
			}
		},
		mon4:function(option){
			var img = new Image();
			img.src="images/monster4.png";
			img.onload = function(){
				jc.start(option.canvas,true);
				jc.image(img,-100,-100,125/1.5,110/1.5).id(option.id).level(2);
				jc.start(option.canvas,true);
			}
		},
		monDie:[[180/1.5,138/1.5],[146/1.5,84/1.5],[103/1.5,94/1.5],[92/1.5,107/1.5]]
	};

	_this.time = 10;//每关时间
	_this.arrNum = [];//怪物个数
	
	//每关显示怪物个数
	var num = 1;
	createNum();
	function createNum(){
		for(var i=0;i<num;i++){
			_this.arrNum.push(num);
		}
		num++;
		if(num<30){
			createNum();
		}
	}

	_this.passNum = 0;//关数
	_this.MinX = 50;//最小X
	_this.MinY = 50;//最小Y
	_this.MaxX = document.documentElement.clientWidth-123;//最大X
	_this.MaxY = document.documentElement.clientHeight-123;//最大Y

	_this.roundT = 10000;//绕场一圈要的事件
	_this.speed = 30;//变换的间隔时间
	_this.off = true;//控制是否shake

	_this.monM = {}//怪物对象
	_this.position = {}//坐标
	_this.score = 0;//分数
	//初始分数
	var scorepage = document.querySelector('.score');
	scorepage.innerHTML = 'X' + _this.score;

	//初始时间
	var timepage = document.querySelector('.time');
	timepage.innerHTML = 'X' + _this.time;


	var i=0;
	//怪物的生成位置
	function monMove(option){
		var _that = this;
		_that.obj = option.obj;//id
		_that.R = option.R || 200;//半径
		_that.Ang = 300;//角度
		_that.angChange = option.angChange || 3

		//周长／速度
		_that.changeNum = ((_this.MaxX - _this.MinX) + (_this.MaxY - _this.MinY))*2/(_this.roundT/_this.speed);

		//随机怪物的生成位置
		var firstPositionArea = Math.floor(Math.random()*4+1);

		switch(firstPositionArea){
			case 1:
				_that.X = Math.floor(getNum(_this.MinX,_this.MaxX));
				_that.Y = _this.MinY;
				break;
			case 2:
				_that.X = _this.MinX;
				_that.Y = Math.floor(getNum(_this.MinY,_this.MaxY));
				break;
			case 3:
				_that.X = Math.floor(getNum(_this.MinX,_this.MaxX));
				_that.Y = _this.MaxY;
				break;
			case 4:
				_that.X = _this.MaxX;
				_that.Y = Math.floor(getNum(_this.MinY,_this.MaxY));
				break;
		}
		_that.timer = setInterval(function(){
			_that.run();
		},_this.speed)

	}
	//怪物运动
	monMove.prototype.run = function(){
		var _that = this;
		_that.Ang = _that.Ang + _that.angChange;
		// console.log(_that.X,_that.Y)
		//控制xy的取值范围
		if(_that.X<=_this.MaxX&&_that.Y==_this.MinY&&_that.X>_this.MinX){

				_that.X = _that.X - _that.changeNum; 
				if(_that.X<_this.MinX){_that.X = _this.MinX}

		}else if(_that.X == _this.MinX&&_that.Y<_this.MaxY){

				_that.Y = _that.Y + _that.changeNum;
				if(_that.Y>_this.MaxY){_that.Y=_this.MaxY}

		}else if(_that.X<_this.MaxX && _that.Y == _this.MaxY){

				_that.X = _that.X + _that.changeNum; 
				if(_that.X>_this.MaxX){_that.X = _this.MaxX}

		}else if(_that.X == _this.MaxX&&_that.Y<=_this.MaxY){

				_that.Y = _that.Y - _that.changeNum;
				if(_that.Y<_this.MinY){_that.Y = _this.MinY}
		}

		_this.x = _that.X - _that.R * Math.cos(_that.Ang*Math.PI/180)
		_this.y = _that.Y - _that.R * Math.sin(_that.Ang*Math.PI/180)
		jc('#'+_that.obj).animate({x:_this.x,y:_this.y},1)


		_this.position[_that.obj] = [];
		_this.position[_that.obj][0] = _this.x;
		_this.position[_that.obj][1] = _this.y;
	};

	monMove.prototype.stop = function(option){	

		var _that = this;

		clearInterval(_that.timer)
		//获取点击的怪物图片内的数字
		var num = Number(findNum(jc('#'+_that.obj)._img.src)[0]);

		_this.score++;//点击正确分数++
		var scorepage = document.querySelector('.score');
		scorepage.innerHTML = 'X' + _this.score;

		//创建尸体图片
		var img = new Image();
		img.src='images/monster1'+num+'.png';
		img.onload = function(){

			jc.start('gamecanvas',true);
			// console.log(_that.x,_that.y)
			jc.image(img,option.x-(_this.monster.monDie[num-1][0]/2),option.y-(_this.monster.monDie[num-1][1]/2),_this.monster.monDie[num-1][0],_this.monster.monDie[num-1][1]).id('die'+_that.obj).level(1)
			jc.start('gamecanvas',true);

			//自执行尸体消失透明度--
			_that.changeO = function(){
				var changeNum = 2000/30;
				var i=0;
				_that.timeO=setInterval(function(){
					i = i+1/changeNum;
					jc('#die'+_that.obj).opacity(1-i);
					if(i>=1){
						//清除定时器
						clearInterval(_that.timeO);
						//删除尸体
						jc('#die'+_that.obj).del();
					}
				},30)
			}();
				
			//清除怪物
			jc('#'+_that.obj).del();

			//初始
			_this.monM[option.a] = undefined;
			_this.position[option.a][0] = 0;
			_this.position[option.a][1] = 0;

			for( a in _this.monM ){
				if(_this.monM[a]){
					return false;
				}
			}
			
			clearTimeout(_this.timeC);
			clearInterval(_this.timeDown);

			//控制关数++
			if(option.next){
				_this.passNum ++;
				_this.next();
			}	
		}
	}
	_this.next = function(){
		var _this = this;
	
		clearTimeout(_this.timeC);
		clearInterval(_this.timeDown);

		//限制的游戏时间
		var t = _this.time;
		_this.timeDown = setInterval(function(){
			var timepage = document.querySelector('.time');
			t--;
			timepage.innerHTML = t+'秒'
		},1000)

		//清除游戏时间
		_this.timeC = setTimeout(function(){
			clearInterval(_this.timeDown);
			//错误捕获
			for( a in _this.monM){
				try{
					_this.monM[a].stop({a:a});
				}catch(err){
					console.log(err.message)
				}	
			}
			_this.off  = false;
			_this.arrNum = []//清空怪物
			var drop1 = document.querySelector('.drop1');
			addClass(drop1,'showtip');
			// 提示信息
			var thisscore = document.querySelector('.thisscore');
			if(_this.score<1){
				thisscore.innerHTML = '一个都没有再来一次吧'
			}else{
				thisscore.innerHTML = '恭喜你击败了'+_this.score+'只怪物'
			}		
		},_this.time*1000)

		//清空
		_this.monM = {};
		_this.position = {};


		var i=0
		//创建怪物
		createMonster();
		function createMonster(){

			if(i<_this.arrNum[_this.passNum]){
				setTimeout(function(){
					var R = Math.floor(getNum(200,300));
					var angChange = Math.floor(getNum(2,4))
					var mon = Math.floor(Math.random()*4+1);
					// console.log('mon'+i+_this.passNum)		
					_this.monster['mon'+ mon]({canvas:'gamecanvas',id:'mon'+i+_this.passNum});	

					_this.monM['mon'+i+_this.passNum]  = new monMove({obj:'mon'+i+_this.passNum,R:R,angChange:angChange});
					i++;
					createMonster();
				},200)
			}
		}
	}
	// var img = new Image();
	// img.src = "1.jpg";
	// img.src="images/monster1.png";
	// img.onload = function(){
	// 	cxt.drawImage(img,20,20,109/1.5,114/1.5)
	// }
}
//判断点击怪物
gamepage.prototype.bindEvent = function(){
	var _this = this;
	document.addEventListener('touchstart',function(ev){
		var ev = ev || event;
		var touch = ev.changedTouches[0];
		var touchX = touch.pageX;
		var touchY = touch.pageY;
		// console.log(touchX,touchY)
		
		for(a in _this.position){
			if(touchX>_this.position[a][0]&&touchX<_this.position[a][0]+73&&touchY>_this.position[a][1]&&touchY<_this.position[a][1]+75){
				_this.monM[a].stop({a:a,next:true,x:touchX,y:touchY});
				return false;
			}
		}
		if( _this.off ){
			shake();
		}
		//点击错误时的摇晃
		function shake(){
			addClass(document.body,'shake')
			setTimeout(function(){
				removeClass(document.body,'shake');
			},1000)
		}
	})
}