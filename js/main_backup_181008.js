$(".searchs .hand").click(function(){
	$(".search_catelist").stop().slideToggle(100);
});

$(".menu li").hover(function(){
	$(".menu_modal").stop().hide(0);
	$(this).children(".menu_modal").stop().fadeIn(100);
}, function(){
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
	sites[5][1] = '<ui>Demo Lingerie</>';
	sites[6][1] = '<li>Demo Handmade</li>';
	sites[7][1] = '<li>Demo Fashion</li>';
	sites[8][1] = '<li>Demo Fashion Flat</li>';
	sites[9][1] = '<li>Demo Electronics</li>';


	for(i=0; i<sites.length; i++){
		html = '<ul>'+sites[i][0]+sites[i][1]+'</ul>'
		$("#modal0").append(html);
	}
}
modalMake0();

function goUrl(url){
	location.href = url;
}

var cates=[{
	main:{title:"BLOG TYPES", icon:"", link:"#"},
	sub:[{title:"Alternative", icon:"", link:"#"},
	{title:"Small images", icon:"", link:"#"},
	{title:"Blog chess", icon:"", link:"#"},
	{title:"Masonry grid", icon:"", link:"#"},
	{title:"Infinit scrolling", icon:"FEATURE", color:"red", link:"#"},
	{title:"With background", icon:"", link:"#"},{title:"Blog flat", icon:"", link:"#"},
	{title:"Default flat", icon:"", link:"#"},
	{title:"Blog mas", icon:"NEW", color:"orange", link:"#"}]
	},
	{
	main:{title:"SINGLE POSTSEXAMPLES", icon:"", link:"#"},	
	sub:[{title:"Post example #1", icon:"", link:""},
		{title:"Post example #2", icon:"", link:""},
		{title:"Post example #3", icon:"", link:""},
		{title:"Post example #4", icon:"", link:""},
		{title:"Post example #5", icon:"", link:""},
		{title:"Post example #6", icon:"", link:""},
		{title:"Post example #7", icon:"", link:""},
		{title:"Post example #8", icon:"", link:""},
		{title:"Post example #9", icon:"", link:""}]
	},
	{
	main:{title:"RECENT POSTS", icon:"", link:"#"},
	sub:[{img:"../img/main/blog1.jpg", title:"A companion for extra sleeping", date:"July 23, 2016", comment:1 },
	{img:"../img/main/blog2.jpg", title:"Outdoor seating collection inspiration", date:"July 23, 2016", comment:1 },
	{img:"../img/main/blog3.jpg", title:"Modular seating and table system", date:"July 23, 2016", comment:0 }]
	}
];

/*****카테고리 모달1******/
var cates = [{
	main:{title:"SHOP PAGES", icon:"", link:"#"},
	sub:[
		{title:"Filters area", icon:"", link:"#"},
		{title:"Hidden sidebar", icon:"HOT", color:"green",link:"#"},
		{title:"No page heading", icon:"",link:"#"},
		{title:"Small categories menu", icon:"",link:"#"},
		{title:"Masonry grid", icon:"", link:"#"},
		{title:"Products list view", icon:"", link:"#"},
		{title:"With background", icon:"", link:"#"},
		{title:"Category description", icon:"", link:"#"},
		{title:"Only categories", icon:"", link:"#"},
		{title:"Header overlap", icon:"", link:"#"},
		{title:"Default shop", icon:"", link:"#"}
		]
		},
	{
    main:{ title:"PRODUCT HOVERS", icon:"EFFECTS", color:"orange", link:"#"},
    sub:[
	    {title:"Summary on hover", icon:"", link:"#"},
   	    {title:"Icons on hover", icon:"HOT", color:"red", link:"#"},
  	    {title:"Icons & Add to cart", icon:"", link:"#"},
   	    {title:"Full info on image", icon:"", link:"#"},
        {title:"All info on hover", icon:"", link:"#"},
    	{title:"Button on image", icon:"", link:"#"},
   		{title:"Quick shop", icon:"", link:"#"},
   		{title:"Tiled hover", icon:"", link:"#"},
   		{title:"Categories hover #1", icon:"",link:"#"},
   		{title:"Categories hover #2", icon:"", link:"#"}
		]
		},
	{
    main:{title:"PRODUCT PAGES", icon:"UNLIMITED", color:"orange", link:"#" },
    sub:[{title:"Default", icon:"", link:"#"},
		{title:"Centered", icon:"", link:"#"},
		{title:"Sticky description", icon:"", link:"#"},
		{title:"With shadow", icon:"", link:"#"},
		{title:"With background", icon:"", link:"#"},
		{title:"Accordion tabs", icon:"NEW", color:"orange", link:"#"},
		{title:"Accordion in content", icon:"", link:"#"},
		{title:"Sticky add to cart", icon:"", link:"#"},
		{title:"With sidebar", icon:"", link:"#"},
		{title:"Extra content #1", icon:"", link:"#"},
		{title:"Extra content #2", icon:"", link:"#"}
		]
		},
	{
    main:{title:"PRODUCT IMAGES", icon:"", link:"#"},
    sub:[{title:"Thumbnails left", icon:"", link:"#"},
		{title:"Thumbnails bottom", icon:"", link:"#"},
		{title:"Sticky images", icon:"", link:"#"},
		{title:"One column", icon:"", link:"#"},
		{title:"Two columns", icon:"", link:"#"},
		{title:"Combined grid", icon:"", link:"#"},
		{title:"Images full-width", icon:"", link:"#" },
		{title:"Zoom image", icon:"", link:"#"},
		{title:"Images size - small", icon:"", link:"#"},
		{title:"Images size - large", icon:"", link:"#"},
		{title:"Without thumbnails", icon:"", link:"#"}
		]
		},
	{
    main:{ title:"WOOCOMMERCE", icon:"", link:"#"},
    sub:[
		{title:"Simple product", icon:"", link:"#"},
		{title:"Variable product", icon:"", link:"#"},
		{title:"External product", icon:"",link:"#"},
		{title:"Grouped product", icon:"", link:"#"},
		{title:"Shopping Cart", icon:"", link:"#"},
		{title:"Checkout", icon:"", link:"#"},
		{title:"My account", icon:"", link:"#" },
		{title:"Wishlist", icon:"", link:"#"},
		{title:"Track order", icon:"", link:"#"},
		{title:"Custom 404 page #1", icon:"", link:"#"},
		{title:"Custom 404 page #2", icon:"", link:"#" }
		]
	},
	{
	main:{title:"FEATURESBEST", icon:"BEST", color:"red", link:"#"},
	sub:[
		{title:"360° product viewer", icon:"", link:"#" },
		{title:"With video", icon:"", link:"#"},
		{title:"With instagram", icon:"", link:"#" },
		{title:"With countdown timer", icon:"", link:"#" },
		{title:"Product presentation", icon:"", link:"#"},
		{title:"Variations swatches", icon:"", link:"#"},
		{title:"Infinit scrolling", icon:"NEW", color:"red",link:"#"},
		{title:"Load more button", icon:"", link:"#"},
		{title:"Catalog mode", icon:"", link:"#"},
		{title:"Cookies law info", icon:"", link:"#"},
		{title:"Parallax scrolling", icon:"", link:"#"} 
		]
	}];


function modalMake1() {
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



