/*********** 미이지 로더 ***************/
$('body').imagesLoaded()
.done( function( instance ) {
	$(".loader").hide(0);
  console.log('all images successfully loaded');
})
.progress( function( instance, image ) {
  var result = image.isLoaded ? 'loaded' : 'broken';
  console.log( 'image is ' + result + ' for ' + image.img.src );
});


/*********** firebase 초기 변수 ***************/
var config = {
	apiKey: "AIzaSyB7r-0ykSHtt1NRvyC_v9JbcBS5cHsZykM",
	authDomain: "thfql4136-mall.firebaseapp.com",
	databaseURL: "https://thfql4136-mall.firebaseio.com",
	projectId: "thfql4136-mall",
	storageBucket: "thfql4136-mall.appspot.com",
	messagingSenderId: "288504725287"
};
firebase.initializeApp(config);

var db = firebase.database();
var ref = db.ref("root"); //var ref; 이렇게 선언만 해줘도 됨 어차피 값이 바뀔꺼니깐
var key;

/*********** HOME ***************/
(function initHome() { //(function initHome(){})(); = initHome();
	ref = db.ref("root/home");
	ref.on('child_added', homeAdd); //main에서는 child_added만 넣어주면 됨
	ref.on('child_removed', homeRev);
	ref.on('child_changed', homeChg);
})();

function homeAdd(data) {
	var id = data.key;
	var img = data.val().img; //내용(data.val())중에 img를 가져와라
	var src = '../img/main/' + img;
	var title = data.val().title;
	var link = data.val().link;
	var html = '';
	html += '<ul id="' + id + '">';
	html += '<li>';
	html += '<img src ="' + src + '" class="img" onclick="goUrl(\'' + link + '\');">';
	html += '<span>' + title + '</span>';
	html += '</li>';
	html += '</ul>';
	$("#modal0").append(html);

	$("#home_wrap").append(html);
}

function homeRev(data) {
	var id = data.key;
	$("#" + id).remove();
}

function homeChg(data) {
	var id = data.key;
	var ul = $("#" + id);
	$("img", ul).attr("src", "../img/main/" + data.val().img);
	$("span", ul).html(data.val().title);
}

/*********** SHOP ***************/
(function initShop() {
	ref = db.ref("root/shop");
	ref.on('child_added', shopAdd);
	ref.on('child_removed', shopRev);
	ref.on('child_changed', shopChg);
})();

function shopAdd(data) {
	shopMake("C", data);
}

function shopRev(data) {
	var id = data.key;
	$("#" + id).remove();
}

function shopChg(data) {
	shopMake("U", data);
}

function shopMake(chk, data) { //add change 가 되면 이부분이 돈다
	var id = data.key; // shop바로 아래에 있는 키값
	var v = data.val(); //shop > 키(data.key) >안에 있는 값들
	var cnt = 0;
	var wid = 0; //각각의 ul이 가지는 넓이값
	var html = '';
	//여기서의 for문은 돌지 않아도 됨> 왜냐하면 ajax는 한꺼번에 와서 for문이 돌았지만 firebase는 한 달락?씩 오기 때문
	if (chk == "C") html = '<ul id="' + id + '">';
	//1차 카테고리
	html += '<li class="title">';
	html += '<a href="' + v.link + '">' + v.title + '</a>';
	if (v.icon) { //icon이 있으면~ 아래처럼 만들어라
		html += '<div class="tooltips" style="background:' + v.color + '">';
		html += v.icon;
		html += '<div style="background:' + v.color + '"></div>';
		html += '</div>';
	}
	html += '</li>'; //1차 카테고리 끝 
	if (chk == "C") {
		html += '</ul>';
		$("#modal1").append(html);
	} else {
		$("#" + id).html(html);
	}
	//ul의 갯수에 따른 width 변화(ul의 갯수란 > 현재 가지고 있는 ul에 갯수)
	cnt = $("#modal1 > ul").length; //child_added가 돈 만큼의 갯수
	wid = 100 / cnt + '%'; //ul의 넓이
	$("#modal1 > ul").css("width", wid); //css의 wid를 width로 바꿔주세요
/***********여기까지 ul을 만들어놓은 상태*********** */


	//2차 카테고리 생성
	$("#modal1 > ul").each(function (i) { //각각의 ul의 갯수만큼 돌겠습니다 $("#modal1 > ul").each() /ul각각에게 function을 실행하겠습니다.
		var id = $(this).attr("id"); //ul의 id값 > db.ref에 접근하기 위해 id값을 찾아준것
		db.ref("root/shop/" + id + "/sub/").once("value").then(function (snapshot) { //snapshot을 통해 data를 한번 찰칵 가져와라
			$("#"+id).find(".cont").remove(); //한번 비우고 snapshot.forEach를 실행해야한다. 이 구문이 없다면 ul의 갯수만큼 돈다
			snapshot.forEach(function (item) { //snapshot에 있는 data를 각각 돈다
				var id2 = item.key; //지역 변수, 105번째 있는 id랑은 다른 id다
				var v = item.val(); //지역 변수
				var html = '<li class="cont" id="'+id2+'">'; //신규 실행은 =으로 시작해야함
				html += '<a href="' + v.link + '">';
				html += v.title;
				html += '</a>';
				html += '<div class="tooltips" style="background:' + v.color + '">';
				if(v.icon){ //v.icon이 있다면 아래와 같이 실행해주세요
					html += v.icon;
					html += '<div style="background:' + v.color + '"></div>';
					html += '</div>';
				}
				html += '</li>';
				$("#"+id).append(html); //여기서의 id는 105번째의 id랑 같은 거고, ul를 의미한다
			});
		})
	}); 
}

/********UI********/
$(".searchs .hand").click(function () {
	$(".search_catelist").stop().slideToggle(100);
});

$(".menu > ul > li").hover(function () {
	$(".menu_modal").stop().fadeOut(0);
	$(this).children(".menu_modal").stop().fadeIn(100);
}, function () {
	$(".menu_modal").stop().fadeOut(0);
});

/*var homes = new Array();
var homes = [];

var str;
var sites = new Array();
for(var i=0; i<10; i++){
	sites[i] = new Array();
	sites[i][0] = "../img/main/site" +i+ ".jpg";
	sites[i][1] = "사이트" +i+ "번 입니다."
	str = '<li>';
	str += '<div><img src="'+sites[i][0]+'" class="img"></div>'
	str += '<div>'+sites[i][1]+'</div>';
	str += '</li>';
	$(".sites_menu").append(str);
}*/
/**** 카테고리 모달0******/

/* var cates =[
	{img:"../img/main/site0.jpg", title: "Demo Default", link:"#"},
	{img:"../img/main/site1.jpg", title: "Demo Decor", link:"#",},
	{img:"../img/main/site2.jpg", title: "Demo Retail", link:"#",},
	{img:"../img/main/site3.jpg", title: "Demo Books", link:"#",},
	{img:"../img/main/site4.jpg", title: "Demo Fashion Color", link:"#",},
	{img:"../img/main/site5.jpg", title: "Demo Lingerie", link:"#",},
	{img:"../img/main/site6.jpg", title: "Demo Handmade", link:"#",},
	{img:"../img/main/site7.jpg", title: "Demo Fashion", link:"#",},
	{img:"../img/main/site8.jpg", title: "Demo Fashion Flat", link:"#",},
	{img:"../img/main/site9.jpg", title: "Demo Electronics", link:"#",}

]; */

/* var cates=[{
	main:{title:"BLOG TYPES", icon:"", link:"#"},
	sub:[{title:"Alternative", icon:"", link:"#"},{title:"Small images", icon:"", link:"#"},{title:"Blog chess", icon:"", link:"#"},{title:"Masonry grid", icon:"", link:"#"},
	{title:"Infinit scrolling", icon:"FEATURE", color:"red", link:"#"},{title:"With background", icon:"", link:"#"},{title:"Blog flat", icon:"", link:"#"},{title:"Default flat", icon:"", link:"#"},
	{title:"Blog mas", icon:"NEW", color:"orange", link:"#"}]
	},
	{
	main:{title:"SINGLE POSTSEXAMPLES", icon:"", link:"#"},	
	sub:[{title:"Post example #1", icon:"", link:""},{title:"Post example #2", icon:"", link:""},{title:"Post example #3", icon:"", link:""},{title:"Post example #4", icon:"", link:""},{title:"Post example #5", icon:"", link:""},{title:"Post example #6", icon:"", link:""},{title:"Post example #7", icon:"", link:""},{title:"Post example #8", icon:"", link:""},{title:"Post example #9", icon:"", link:""}]
	},
	{
	main:{title:"RECENT POSTS", icon:"", link:"#"},
	sub:[{img:"../img/main/blog1.jpg", title:"A companion for extra sleeping", date:"July 23, 2016", comment:1 },{img:"../img/main/blog2.jpg", title:"Outdoor seating collection inspiration", date:"July 23, 2016", comment:1 },{img:"../img/main/blog3.jpg", title:"Modular seating and table system", date:"July 23, 2016", comment:0 }]
	}
]; */

/* $.ajax({   //modal0부분 위에 붙여서 여기부분은 사용안함(homeAdd부분 안에 넣은 거임), 주석 처리 안하면 여기서 가져오는 10개 밑으로 db에 저장된 것들이 보여짐, 
	url:"../json/cate0.json",
	type:"get",
	dataType:"json",
	data:{},
	success: function(data){
		var total = data.result.length;
		
		var html = '';
		for(var i = 0; i<total; i++){
			
			var html = '<ul>';
			html += '<li>';
			html += '<img src ="'+data.result[i].img+'" class="img" onclick="goUrl(\''+data.result[i].link+'\');">';
			html += data.result[i].title;
			html += '</li>';
			html += '</ul>';
			$("#modal0").append(html);
		}
	},
	error: function(xhr, status, error){
		console.log(xhr, status, error);
	}
}); */

/* $.ajax({  //선생님이 하신 것
	url: "../json/cate0.json",
	type: "get",
	dataType: "json",
	data: {},
	success: function(data){
		var html;
		for(var i=0; i<data.result.length; i++) {
			var html = '<ul>';
			html += '<li><img src="'+data.result[i].img+'" class="img" onclick="goUrl(\''+data.result[i].link+'\');">'+data.result[i].title+'</li>';
			html += '</ul>';
			$("#modal0").append(html);
		}
	},
	error: function(xhr, status, error) {
		console.log(shr, status, error);
	}
}); */

/* 
function modalMake0(){
	var html ='';
	var sites = [];
	for(var i=0; i<10; i++){
		sites[i] = [];
		sites[i][2] = 'https://daum.net';
		sites[i][0] = '<li><img src ="../img/main/site'+i+'.jpg" class="img" onclick="goUrl(\''+sites[i][2]+'\');"></li>';
		
	}
	sites[0][1] = '<li>Demo Default</li>';
	sites[1][1] = '<li>Demo Decor</li>';
	sites[2][1] = '<li>Demo Retail</li>';
	sites[3][1] = '<li>Demo Books</li>';
	sites[4][1] = '<li>Demo Fashion Color</li>';
	sites[5][1] = '<li>Demo Lingerie</li>';
	sites[6][1] = '<li>Demo Handmade</li>';
	sites[7][1] = '<li>Demo Fashion</li>';
	sites[8][1] = '<li>Demo Fashion Flat</li>';
	sites[9][1] = '<li>Demo Electronics</li>';

	for(i=0; i<sites.length; i++){
		html = '<ul>'+sites[i][0]+sites[i][1]+'</ul>'
		$("#modal0").append(html);
	}	
}
modalMake0(); */

/* function goUrl(url){
	location.href = url;
} */


/*****카테고리1******/

/* $.ajax({
	url:"../json/cate1.json", //여기서 가져오겠습니다.
	type: "get", //get방식으로 통신하겠습니다.
	dataType:"json",  //데이터타입은 json으로 사용하겠습니다. dataType에서 T만 대문자
	data:{}, //보낼 데이터가 없어서 빈값으로 준다.
	success: function(data){  //callback 함수  //modalmake1에 있는 내용들이 실행된다
		var cnt = data.result.length;
		var style = 'style="width:'+(100/cnt +'%')+';"';
		var html = '';
		for(var i = 0; i<cnt; i++){
			// console.log(data.result[i].main.title);
			html = '<ul '+style+'>';
			html += '<li class="title">';
			html += '<a href="'+data.result[i].main.link+'">';
			html += data.result[i].main.title;
			html += '</a>';
			html += '<div class="tooltips" style="background:'+data.result[i].main.color+'">';
			html += data.result[i].main.icon;
			html += '<div style="background:'+data.result[i].main.color+'"></div>';
			html += '</div>';
			html += '</li>';
			for(var j = 0; j<data.result[i].sub.length; j++){
				// console.log(data.result[i].sub[j].title);
				html +='<li class="cont">';
				html += '<a href="'+data.result[i].sub[j].link+'">';
				html +=data.result[i].sub[j].title;
				html += '</a>';
				html += '<div class="tooltips" style="background:'+data.result[i].sub[j].color+'">';
				html += data.result[i].sub[j].icon;
				html += '<div style="background:'+data.result[i].sub[j].color+'"></div>';
				html +='</div>';
				html +='</li>';
			}
			// console.log(data.result[0].sub[0].title); 자바스크립트와 json은 출력하는 방법은 똑같다 (다른점은 객체에 변수에 ""를 쓰냐 안쓰냐 )
			html += '</ul>';
			$("#modal1").append(html);
		}	
	},
	error: function(xhr, status, error){
		console.log(xhr, status, error);
	}
}); */

/* function modalMake1() {
	var html = '';
	var wid = 100/cates.length + "%";    //100/6
	for(var i=0; i<cates.length; i++){
		html = '<ul style="width:'+wid+'">';
		html += '<li class="title">';
		html += '<a href="'+cates[i].main.link+'">'+cates[i].main.title+'</a>';
		if(cates[i].main.icon !=""){
			html += '<div class="tooltips" style="background:'+cates[i].main.color+'">';
			html += cates[i].main.icon;
			html += '<div style="background:'+cates[i].main.color+'"></div>';
			html += '</div>';
		}
		html += '</li>';
		for(var j=0; j<cates[i].sub.length; j++){
			html += '<li class="cont">';
			html += '<a href="'+cates[i].sub[j].link+'">'+cates[i].sub[j].title+'</a>';
			if(cates[i].sub[j].icon !=""){
			html += '<div class="tooltips" style="background:'+cates[i].sub[j].color+'">';
			html += cates[i].sub[j].icon;
			html += '<div style="background:'+cates[i].sub[j].color+'"></div>';
			html += '</div>';
			}
			html += '</li>';
		}
		html += '</ul>';
		$("#modal1").append(html);
	}
	$("#modal1 .tooltips").each(function(){
		var n = $(this).prev().html().length; //div.tooltips에 전(a태그 = .prev)에 a태그안에 text(.html)에 길이(.length))
		$(this).css({"left":n*5+"px"});
	});
}
modalMake1();
 */

/*****카테고리2**** */
$.ajax({
	url: "../json/cate2.json",
	type: "get",
	dataType: "json",
	data: {},
	success: function (data) {
		var html;
		var blogs = data.result.blog;
		var posts = data.result.recent;
		//blog 생성
		for (var i = 0; i < blogs.length; i++) {
			html = '<ul>';
			html += '<li class="title">';
			html += '<a href="' + blogs[i].main.link + '">' + blogs[i].main.title + '</a>';
			if (blogs[i].main.icon != "") {
				html += '<div class="tooltips" style="background:' + blogs[i].main.color + '">';
				html += blogs[i].main.icon;
				html += '<div style="background:' + blogs[i].main.color + '"></div>';
				html += '</div>';
			}
			html += '</li>';
			for (var j = 0; j < blogs[i].sub.length; j++) {
				html += '<li class="sub">';
				html += '<a href="' + blogs[i].sub[j].link + '">' + blogs[i].sub[j].title + '</a>';
				if (blogs[i].sub[j].icon != "") {
					html += '<div class="tooltips" style="background:' + blogs[i].sub[j].color + '">';
					html += blogs[i].sub[j].icon;
					html += '<div style="background:' + blogs[i].sub[j].color + '"></div>';
					html += '</div>';
				}
				html += '</li>';
			}
			html += '</ul>';
			$("#modal2 > .blogs").append(html);
		}
		//recent 생성
		for (var i = 0; i < posts.length; i++) {
			html = '<ul>';
			html += '<li class="post clear" onclick="goPost(\'' + posts[i].link + '\');">';
			html += '<img src="' + posts[i].img + '" class="img post_img hover">';
			html += '<div>';
			html += '<div class="post_title">' + posts[i].title + '</div>';
			html += '<span class="post_date">' + posts[i].date + '</span>';
			html += '<span class="post_cnt">' + posts[i].comment + '</span>';
			html += '<span class="post_comment">Comment</span>';
			html += '</div>';
			html += '</li>';
			html += '</ul>';
			$("#modal2 > .recents").append(html);
		}
	},
	error: function (xhr, status, error) {
		alert("통신이 원활하지 않습니다.\n 잠시후 다시 시도해주세요.");
		console.log(xhr, status, error);
	}
}); {
	/* 
	<ul>
	  <li class="title"><a href="#">BLOG TYPES</a></li>
	  <li class="sub"><a href="#">Alternative</a></li>
	</ul>
	<ul>
	  <li class="title"><a href="#">BLOG TYPES</a></li>
	  <li class="sub"><a href="#">Alternative</a></li>
	</ul>


	<ul>
	  <li class="post clear" onclick="goPost('#');">
		<img src="../img/main/blog-11-75x65.jpg" class="img post_img">
		<div>
		  <div class="post_title">A companion for extra sleeping</div>
		  <span class="post_date">July 23, 2018</span>
		  <span class="post_cnt">1</span>
		  <span class="post_comment">Comment</span>
		</div>
	  </li>
	</ul>
	 */
}


$.ajax({
	url: "../json/cate3.json",
	type: "get",
	dataType: "json",
	data: {},
	success: function (data) {
		var html;
		var cnt = data.result.length;
		for (var i = 0; i < cnt; i++) {
			html = '<ul>';
			html += '<li class="title">';
			html += '<a href="' + data.result[i].main.link + '">' + data.result[i].main.title + '</a>';
			if (data.result[i].main.icon != "") {
				html += '<div class="tooltips" style="background:' + data.result[i].main.color + '">';
				html += data.result[i].icon;
				html += '<div style="background:' + data.result[i].main.color + '"></div>';
				html += '</div>';
			}
			html += '</li>';
			for (var j = 0; j < data.result[i].sub.length; j++) {
				html += '<li class="cont">';
				html += '<a href="' + data.result[i].sub[j].link + '">' + data.result[i].sub[j].title + '</a>';
				html += '</li>'
			}
			html += '</ul>';
			$("#modal3 > .demo").append(html);
		}
	},

	error: function (xhr, status, error) {
		console.log(xhr, status, error);
	}
});

$.ajax({
	url: "../json/cate4.json",
	type: "get",
	dataType: "json",
	data: {},
	success: function (data) {
		var html;
		var cnt = data.result.length;
		for (var i = 0; i < cnt; i++) {
			html = '<ul>';
			html += '<li class="title">';
			html += '<a href="' + data.result[i].main.link + '">' + data.result[i].main.title + '</a>';
			if (data.result[i].main.icon != "") {
				html += '<div class="tooltips" style="background:' + data.result[i].main.color + '">';
				html += data.result[i].main.icon;
				html += '<div style="background:' + data.result[i].main.color + '"></div>';
				html += '</div>';
			}
			html += '</li>';
			for (var j = 0; j < data.result[i].sub.length; j++) {
				html += '<li class="cont">';
				html += '<a href="' + data.result[i].sub[j].link + '">' + data.result[i].sub[j].title + '</a>';
				if (data.result[i].sub[j].icon != "") {
					html += '<div class="tooltips" style="background:' + data.result[i].sub[j].color + '">';
					html += data.result[i].sub[j].icon;
					html += '<div style="background:' + data.result[i].sub[j].color + '"></div>';
					html += '</div>';
				}
				html += '</li>'

			}
			html += '</ul>';
			$("#modal4 > .theme").append(html);
		}

	},
	error: function (xhr, status, error) {
		console.log(xhr, status, error);
	}
});

/*********** 왼쪽 카테고리 패널0번(furniture) ***************/
var furniture = [];
furniture[0] = [];
furniture[1] = [];
furniture[2] = [];
furniture[3] = [];
furniture[0][0] = "../img/main/menu-product-1-118x118.jpg";
furniture[1][0] = "../img/main/menu-product-3-118x118.jpg";
furniture[2][0] = "../img/main/menu-product-3-2-118x118.jpg";
furniture[3][0] = "../img/main/menu-product-5-2-118x118.jpg";
furniture[0][1] ="CLOCKS";
furniture[1][1] ="TABLETOP";
furniture[2][1] ="KITCHEN";
furniture[3][1] ="LIGHTING";
furniture[0][2] ="Mantel Clocks";
furniture[1][2] ="Pepper Shakers";
furniture[2][2] ="Oil Vineager Sets";
furniture[3][2] ="Interior Lighting";
furniture[0][3] ="Anniversary Clocks";
furniture[1][3] ="Spice Jars";
furniture[2][3] ="Bottle Racks";
furniture[3][3] ="Celling Lamps";
furniture[0][4] ="Wall Clocks";
furniture[1][4] ="Dish Drainers";
furniture[2][4] ="Chopping Boards";
furniture[3][4] ="Wall Lamps";
furniture[0][5] ="Digital Clocks";
furniture[1][5] ="Cocktail Shakers";
furniture[2][5] ="Vacuum Flasks";
furniture[3][5] ="Floor Lamps";
furniture[0][6] ="Travel and Alarm";
furniture[1][6] ="Utensil Holders";
furniture[2][6] ="Utensil Holders";
furniture[3][6] ="Celling Lamps";
var furnitureBrand = [];
furnitureBrand[0] ="../img/main/brand-alessi.png";
furnitureBrand[1] ="../img/main/brand-Eva-Solo.png";
furnitureBrand[2] ="../img/main/brand-PackIt.png";
furnitureBrand[3] ="../img/main/brand-witra.png";

/********** 왼쪽 카테고리 생성 **************/
var sFn = function(data){
	console.log(data);
	if(data.result) {
		for(var i=0, html = '', rs=''; i<data.result.cates.length; i++){
			rs = data.result.cates[i];
			html = '<li>';
			html += '<span class="'+rs.icon+'"></span>';
			html += '<a href="'+rs.link+'"><span>'+rs.title+'</span></a>';
			if(rs.ajax !== '') {
			html += '<span class="fas fa-angle-right"></span>';
			html+= '<div class="cate_panel clear">';
			/********** 패널 생성.시작 **************/
			if(i==0) {
				for(var j=0; j<furniture.length; j++){
					html+='<ul id="fur_panel'+i+'" class="fur_panel">';
					html+='<li><img src="'+furniture[j][0]+'" class="img"></img></li>';
					html+='<li>'+furniture[j][1]+'</li>';
					html+='<li>'+furniture[j][2]+'</li>';
					html+='<li>'+furniture[j][3]+'</li>';
					html+='<li>'+furniture[j][4]+'</li>';
					html+='<li>'+furniture[j][5]+'</li>';
					html+='<li>'+furniture[j][6]+'</li>';
					html+='</ul>';
				}	
				html+= '<ul class="fur_brand_panel clear">';
				for(var j=0; j<furnitureBrand.length; j++){
					html +='<li><img src="'+furnitureBrand[j]+'" class="img w3-grayscale-max w3-opacity"></li>';
					
				}
				html +='</ul>';
			}
			/********** 패널 생성.종료 **************/
			html +='</div>';
			}
			html +='</li>';
			$(".banners .cate").append(html);
		}
		$(".cate > li").hover(function(){
			$(this).find(".cate_panel").show();
		}, function(){
			$(this).find(".cate_panel").hide();
		});
		$(".fur_brand_panel img").hover(function(){
			$(this).removeClass("w3-grayscale-max w3-opacity");
		}, function(){
			$(this).addClass("w3-grayscale-max w3-opacity");
		});
	}
}


var cateAjax = new Ajax("../json/cate_left.json");
//cateAjax.addData({chk:0}); //괄호안에 내용이 있으면 data를 보낸다
cateAjax.send(sFn);

/* $(".banner > li").each(function(i){
	$(this).children("div").each(function( ){   //0번째있는 div, each는 delay를 먹지 않아
		$(this).css("animation-delay", i/5+"s").addClass("ban_ani");
	});
}); */

var banNow = 0;
$(".banners .rt_arrow").click(function(){
	$(".banner").children("li").hide();
	$(".banner").children("li").eq(banNow).show();
	$(".banner").children("li").eq(banNow).children(".ban_img").addClass("img_ani");
	$(".banner").children("li").eq(banNow).children("div").each(function(i){
	$(this).css("animation-delay", i/5+"s").addClass("ban_ani"); //현재 0번째를 보이게 하고 css를 준다
});
	if(banNow == 2) banNow = -1;
	banNow++;
	
}).trigger("click");

$(".banner").mousemove(function (evt) {  //클래스배너에서 마우스가 움직이면 이벤트가 발생하겠습니다.
    var delta = 50;
    var cX = evt.clientX;
    var cY = evt.clientY;
    var iX = $(this).find(".ban_img").width() / 2;
    var iY = $(this).find(".ban_img").height() / 2;
    var mX = (iX - cX)/delta;
    var mY = (iY - cY)/delta;
    $(this).find(".ban_img").css("transform", "translate("+mX+"px, "+mY+"px)");
    
});

/********** Featured ***********/
/********** 밑에꺼라 같은 의미 ***********/
/* $(".featured_item").hover(function(){
	$(this).find("h5").stop().slideDown(200);
}, function(){
	$(this).find("h5").stop().slideUp(200);
}); */
$(".featured_item").hover(function(){
	$(this).find("div").stop().animate({"bottom":0}, 200);
	$(this).find("img").css({"animation-name":"featuredAni"});
}, function(){
	$(this).find("div").stop().animate({"bottom":"-3rem"},200);
	$(this).find("img").css({"animation-name":"featuredAniBack"});
}
);


/********** Featured Products ***********/
var prdNum = 0;

	

/* $(".prd").hover(function(){
$(this).children(".prd_hover").stop().fadeIn(300, function(){ //콜백기능
$(this).children(".prd_img").children("img").css({"animation-name":"prdImg"})
})
},function(){
	$(this).children(".prd_hover").stop().fadeOut(300)}); */
/* $(".prd").hover(function(){
	$(this).children(".prd_hover").stop().fadeIn(300);
	$(this).children(".prd_hover").children(".prd_img").children("img").css({"animation-name":"prdImg"})

}, function(){
	$(this).children(".prd_hover").stop().fadeOut(300)}); */


$.ajax({
	url:"../json/prds.json",
	datatype:"json",
	type:"post",
	data:{id:0},
	success: function(data){
		console.log()
	},
	error: function(xhr, status, error){// 통신 상태, 지금 상태, 에러
		alert("통신이 원할하지않습니다. \n 잠시후 다시 시도해주세요.");
		console.log(xhr, status, error);
	}
});

//위에꺼랑 똑같은 구문(아래는 객체화 시킨것)
/* var prds = new Ajax("../json/prds.json");
prds.addData({id:0});
prds.send(function(data){
	console.log(data)
}); */

//위에꺼랑 똑같은 구문(아래는 객체화시키고 function을 밖으로 빼고 변수 이름을 줘서 send에 넣어준것)
/* var prds = new Ajax("../json/prds.json");
prds.addData({id:0});
prds.send(resultFn);
function resultFn(data){
	console.log(data)} */

	//{"result":[{"title":"best","data":[{},{}]},{...},{...}]} -->json에 data 구조 입니다.
	var prds = new Ajax("../json/prds.json");
	prds.send(resultFn);
	function resultFn(data){
		var html = '';
		var li;
		for(var i = 0; i<data.result.length; i++){
			html = '<ul class="prd_wrap clear">';
			for(var j=0; j<data.result[i].data.length; j++){
				li = data.result[i].data[j];
				html += '<li class="prd">';
				html += '<div class="prd_img">';
				html += '<img src="'+li.img[0]+'" class="img">';
				html += '</div>';
				html += '<div class="prd_tit">'+li.title+'</div>';
				html += '<div class="prd_cate">'+li.cate+'</div>';
				html += '<div class="prd_price">';
				html += '<span>'+li.price[0]+'</span>';
				html += '<span>'+li.price[1]+'</span>';
				html += '</div>';
				html += '<div class="prd_hover">';
				html += '<div class="prd_img">';
				html += '<img src="'+li.img[1]+'" class="img prd_hover_img">';
				html += '</div>';
				html += '<ul>';
				html += '<li class="prd_compare">';
				html += '<div>';
				html += '<img src="../img/main/baseline-compare_arrows-24px.svg">';
				html += '</div>';
				html += '</li>';
				html += '<li class="prd_tit">'+li.title+'</li>';
				html += '<li class="prd_cate">'+li.cate+'</li>';
				html += '<li class="prd_price">';
				html += '<span>'+li.price[0]+'</span>';
				html += '<span>'+li.price[1]+'</span>';
				html += '</li>';
				html += '<li class="prd_cont">';
				html += li.cont;
				html += '<div><i class="fa fa-ellipsis-h"></i></div>';
				html += '</li>';
				html += '<li class="prd_detail clear">';
				html += '<div>';
				html += '<a href="#" data-toggle="tooltip" data-placement="top" title="Add to Wishlist">';
				html += '<img src="../img/main/baseline-favorite_border-24px.svg">';
				html += '</a>';
				html += '</div>';
				html += '<ul>';
				html += '<li>VIEW PRODUCTS</li>';
				html += '<li><i class="fa fa-shopping-cart"></i></li>';
				html += '</ul>';
				html += '<div>';
				html += '<a href="#" data-toggle="tooltip" data-placement="top" title="Search">';
				html += '<img src="../img/main/baseline-search-24px.svg">';
				html += '</a>';
				html += '</div>';
				html += '</li>';
				html += '</ul>';
				html += '</div>';
				if(li.pct > 0) html += '<div class="prd_pop">-'+li.pct+'%</div>';
				html += '</li>';
		}
			html += '</ul>';
			$(".prd_out_wrap").append(html);
		}
		$(".prd_nav > li").click(function(){ //이벤트 선언
			$(".prd_wrap").eq(prdNum).stop().animate({"top":"5rem", "opacity":0}, 500 , function(){
				$(this).css({"display":"none"});
			});
		 prdNum = $(this).index(); //클릭 된 애 값을 받아올꺼야, index는 값을 가져올때 사용
		 $(".prd_wrap").eq(prdNum).css({"display":"block"}).stop().animate({"top":0, "opacity":1}, 500 );
		 $(".prd_nav > li").css({"color":"#666"});
		$(".prd_nav div").css({"width":0});
		$(this).css({"color":"#222"});
		$(this).children("div").css({"width":"100%"});
		});
		
		$(".prd_nav > li").hover(function(){//이벤트 선언
			if($(this).index() !=prdNum){ //현재 선택된 애는 제외 시킨다
				$(this).css({"color":"#222"});
				$(this).children("div").stop().animate({"width":"100%"}, 100);
			}
		},function(){
			if($(this).index() !=prdNum){
				$(this).css({"color":"#666"});
				$(this).children("div").stop().animate({"width":"0%"}, 100);
			}
		});
		$(".prd_nav > li").eq(0).trigger("click");//이벤트 실행, eq는 나의 순서를 달라고 할때 사용
		
		//그냥 가져다가 붙인거야
		// for(var i = 0; i<7; i++){
		// 	$(".prd_wrap").append($(".prd").eq(0).clone());
		// }
		
		
		
		$(".prd").hover(function(){
			$(this).children(".prd_hover").stop().fadeIn(300);
			$(this).find(".prd_compare").find("div").stop().animate({"top":"-43px"},300);
			if($(this).find(".prd_cont")[0].offsetHeight < $(this).find(".prd_cont")[0].scrollHeight){ //실제 높이 = scrollHeight, 주어진 높이 =offsetHeight
				//$(".prd_cont")[0] >이부분은 html을 의미한다
				 //overflow가 발생한 상태
				 console.log("overflow");
				 $(this).find(".prd_cont").children("div").stop().animate({"bottom":0}, 200);
				 $(this).find(".prd_cont").children("div").click(function(){
					 $(this).parent().css({"height":"auto"});
					 $(this).hide(0);
				 });
			}
			$(this).find(".prd_detail").children("ul").hover(function(){
				$(this).children(":first-child").stop().animate({"margin-top":"-38px"}, 200);
			}, function(){
				$(this).children(":first-child").stop().animate({"margin-top":0}, 200);
			});
		
			},function(){
				$(this).children(".prd_hover").stop().fadeOut(300);
				$(this).find(".prd_compare").find("div").stop().animate({"top":0},300);
				if($(this).find(".prd_cont")[0].offsetHeight < $(this).find(".prd_cont")[0].scrollHeight){ //실제 높이 = scrollHeight, 주어진 높이 =offsetHeight
					//$(".prd_cont")[0] >이부분은 html을 의미한다
					 //overflow가 발생한 상태
					 console.log("overflow");
					 $(this).find(".prd_cont").children("div").stop().animate({"bottom":"-20px"}, 200);
				}
			});
			$(".prd_hover_img").hover(function(){
				$(this).stop().animate({"opacity":1}, 200).css({"animation-name":"prdImg"});
			}, function(){
				$(this).stop().animate({"opacity":0}, 200).css({"animation-name":"prdImgBack"});
			});
			$('[data-toggle="tooltip"]').tooltip(); 
	}