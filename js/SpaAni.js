var SpaAni = (function(){
	function SpaAni(_page, _elem, _gap){  //생성자 만들기
		var obj = this;
	this.page = $(_page);
	this.elem = _elem;
	this.scTop = 0; //scroll이 변화한 값들은 여기에 넣어진다.
	this.pos = []; //페이지사이즈가 변화한 값들이 여기에 넣어진다.
	this.now = 0;
	this.gap = _gap;
	$(window).resize(function(){
		for(var i = 0; i<obj.page.length; i++){ //여기서는 this를 쓰면 안됨. 왜냐면 this는 window를 의미해주기 때문에 obj로 써야함
			obj.pos[i] = $(obj.page[i]).position().top;
		}
		//console.log(obj.pos); // 현재페이지가 위로부터 얼마나 떨어져 있는지에 대한 값
	}).trigger("resize");
	$(window).scroll(function(){ //스크롤을 할때마다 init을 실행해라
		obj.scTop = $(this).scrollTop();
		obj.init(obj);
	}).trigger("scroll");
	}
	SpaAni.prototype.init = function(obj){
		for(var i = 0; i<obj.page.length; i++){
			if(obj.scTop+obj.gap > obj.pos[i]) obj.now = i;
		}
		$(obj.page[obj.now]).find(obj.elem).each(function(){
		var cls = $(this).data("ani");
		$(this).addClass(cls);
		});
		console.log(obj.now);
	};
	return SpaAni;
}())
