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
var ref; //var ref; 이렇게 선언만 해줘도 됨 어차피 값이 바뀔꺼니깐
var key;


/*********** HOME ***************/
(function initHome() { //(function initHome(){})(); = initHome();
    $(".list:not(#home_wr)").remove(); //등록 form은 항상 있어야 하기때문에 ul은 있어야 함.
    ref = db.ref("root/home");
    ref.on('child_added', homeAdd);
    ref.on('child_removed', homeRev); //웹에서 지워진걸 보여주기 위해 함수 선언?한것, child_removed가 되면 homeRev실행해라
    ref.on('child_changed', homeChg);


})();

function homeAdd(data) { //child_added가 한번 일어날때 그 하나
    var id = data.key;
    var img = data.val().img; //내용(data.val())중에 img를 가져와라
    var src = '../img/main/' + img;
    var title = data.val().title;
    var link = data.val().link;
    var html = '';
    html += '<ul class="list clear row" id="' + id + '">';
    html += '<li class="col-xs-4 col-sm-3 col-md-2 col-lg-2">';
    html += '<div>';
    html += '<img src="' + src + '">';
    html += '<input type="text" class="tit_img form-control" placeholder="이미지" value="' + img + '" id="text">';
    html += '</div>';
    html += '</li>';
    html += '<li class="col-xs-4 col-sm-6 col-md-8 col-lg-8">';
    html += '<div>';
    html += '<input type="text" class="title form-control" placeholder="타이틀" value="' + title + '">';
    html += '<input type="text" class="link form-control" style="margin-top:5px;" placeholder="링크 주소" value="' + link + '">';
    html += '</div>';
    html += '</li>';
    html += '<li class="col-xs-4 col-sm-3 col-md-2 col-lg-2">';
    html += '<div>';
    html += '<button class="btn btn-danger" onClick="homeDel(this);">삭제</button>   ';
    html += '<button class="btn btn-warning" onClick="homeUp(this);">수정</button>';
    html += '</div>';
    html += '</li>';
    html += '</ul>';
    $("#home_wrap").append(html);
}

function homeRev(data) { //data는 저 지워졌워요 하고 알려준다
    var id = data.key; //전달받은 키값을 id에 넣어주세요
    $("#" + id).remove(); //ul이 가지고있는 id 값을 지운다
}

function homeChg(data) {
    var id = data.key;
    var ul = $("#" + id);
    $("img", ul).attr("src", "../img/main/" + data.val().img);
    alert("수정되었습니다.");
}

function homeUp(obj) {
    var ul = $(obj).parent().parent().parent();
    var id = ul.attr("id");
    var img = $(".tit_img", ul).val();
    var title = $(".title", ul).val(); //title에 접근하는데 누구의 title? ul의 title
    var link = $(".link", ul).val();
    if (title == '' || link == '' || img == '') {
        alert("내용을 적어주세요.");
    } else {
        ref = db.ref("root/home/" + id);
        ref.update({ //ref를 업데이트 하겠습니다./ update랑 push는 데이터 값이 있어야 함. remove는 없어도 됨
            img: img,
            title: title,
            link: link
        });
    }
};


$("#home_save").on("click", function () {
    var img = $("#home_wr .tit_img").val();
    var title = $("#home_wr .title").val();
    var link = $("#home_wr .link").val();
    if (title == '' || link == '' || img == '') {
        alert("내용을 적어주세요.");
    } else {
        ref = db.ref("root/home");
        ref.push({ //ref를 푸시 하겠습니다 
            img: img,
            title: title,
            link: link
        }).key; //key값으로 만들어 붙이고 내용(title, link)을 안에 넣겠습니다.
        alert("등록되었습니다.");
    }
});

function homeDel(obj) {
    if (confirm("정말로 삭제하시겠습니까?")) {
        // var id = obj.parentNode.parenNode.parentNode.id; //ul의 id값, 자바스크립방식
        var id = $(obj).parent().parent().parent().attr("id"); //제이쿼리 방식
        if (id != "") { //id가 빈값이면 모든 정보가 지워지기 때문에 혹시나 하는 사항에 대해 대처
            ref = db.ref("root/home/" + id).remove(); //여기까지 쓰면 DB에서 지워짐., 지울떄는 값을 가져올 필요 없이 지우면 됨.

        }
    }
}


/*********** SHOP ***************/
//최초 페이지가 생성 될때 한번 실행되며, shop 레퍼런스에 콜백을 링크한다.
function initShop() { //(function initHome(){})(); = initHome();
    $("#shop_wrap > ul").remove(); // $("#shop_wrap > ul").remove(); > ul전부를 지워버리겠다 / $("#shop_wrap > ul").empty(); ul은 가만히 있고 ul 안에 내용을 지우겠다
    ref = db.ref("root/shop");
    ref.on('child_added', shopAdd); //root/shop안에 자식이 추가 됬으면 shopAdd를 실행해라
    ref.on('child_removed', shopRev); //웹에서 지워진걸 보여주기 위해 함수 선언?한것, child_removed가 되면 homeRev실행해라
    ref.on('child_changed', shopChg);
}
initShop();

//chk변수의 값(C, U)에 따라 ul을 생성, 변경한다.
function shopMake(chk, data) {
    var id = data.key;
    var html = '';
    if (chk == 'C') html += '<ul id="' + id + '" class="grid-item">'; //u
    else if (chk == 'U') $("#" + id).empty();
    html += '<li class="shop_li1 clear">';
    html += '<div>';
    html += '<input type="text" class="title form-control" placeholder="제목" value="' + data.val().title + '">';
    html += '<input type="text" class="icon form-control" placeholder="아이콘" value="' + data.val().icon + '">';
    html += '<input type="text" class="color form-control" placeholder="아이콘컬러" value="' + data.val().color + '">';
    html += '<input type="text" class="link form-control" placeholder="링크" value="' + data.val().link + '">';
    html += '</div>';
    html += '<div>';
    html += '<button class="btn btn-danger" onClick="shopDel(this);">삭제</button>';
    html += '<button class="btn btn-warning" onClick="shopUp(this);">수정</button>';
    html += '</div>';
    html += '</li>';
    html += '<li class="shop_li2 clear shop_li2_wr">';
    html += '<div>';
    html += '<input type="text" class="title form-control" placeholder="제목">';
    html += '<input type="text" class="icon form-control" placeholder="아이콘">';
    html += '<input type="text" class="color form-control" placeholder="아이콘컬러">';
    html += '<input type="text" class="link form-control" placeholder="링크">';
    html += '</div>';
    html += '<div>';
    html += '<button class="btn btn-primary" onClick="shopAdd2(this);">저장</button>';
    html += '</div>';
    html += '</li>';

    if (chk == 'C') {
        html += '</ul>';
        $(".grid").append(html);
    } else if (chk == 'U') {
        $("#" + id).append(html); // $("#"+id).html(html); 과 같은 의미, 이렇게 사용하면 위에 else문을 없애야한다 왜냐하면 html은 덮어쓰기 때문에 
    }
    if (data.val().sub) { //data값에 sub가 있으면
        //console.log(data.val().sub);
        db.ref("root/shop/" + id + "/sub").once("value").then(function (snapshot) { //db.ref("root/shop"+id+"/sub")에 있는 value값을 가져와라 데이터 한번만 가져와라 
            snapshot.forEach(function (item) { //snapshot은 배열이 아니여서 배열 길이를 알수 없다. 그래서 forEach로 각각 돌려준다
                //snapshot안에 있는 child들을 한번씩 돌린다. snapshot.forEach(); , function (item) 각각의 데이터는 item으로 들어간다
                /*  console.log(item.key);
                 console.log(item.val()); */
                html = '<li class="shop_li2 clear" id="' + item.key + '" >';
                html += '<div>';
                html += '<input type="text" class="title form-control" placeholder="제목" value="' + item.val().title + '">';
                html += '<input type="text" class="icon form-control" placeholder="아이콘" value="' + item.val().icon + '">';
                html += '<input type="text" class="color form-control" placeholder="아이콘컬러" value="' + item.val().color + '">';
                html += '<input type="text" class="link form-control" placeholder="링크" value="' + item.val().link + '">';
                html += '</div>';
                html += '<div>';
                html += '<button class="btn btn-danger" onClick="shopDel2(this);">삭제</button>';
                html += '<button class="btn btn-warning" onClick="shopUp2(this);">수정</button>';
                html += '</div>';
                html += '</li>';
                $("#" + id).append(html); //여기서의 id값은 위에   var id = data.key; 여기서의 id
            });
        });

    }
}

//child_added 콜백
function shopAdd(data) {
    var id = data.key;
    shopMake('C', data); //  ul부터 만들어 #shop_wrap에 붙는다
    console.log('C');
}

//child_removed 콜백
function shopRev(data) { //삭제 된 data를 받는다
    if (confirm("정말로 삭제하시겠습니까?\n1차 카테고리 삭제 시 하위 카테고리도 삭제됩니다.")) {
        var id = data.key; //파이어베이스에서 삭제된 아이디값을 받는다
        $("#" + id).remove();
    }
}

//child_changed 콜백
function shopChg(data) {
    var id = data.key;
    shopMake('U', data); //기존 ul값은 나두고 ul안에 li값만 바꾼다
    // console.log('U');

}

//1차 카테고리 생성
$(".shop_wr").click(function () { //상단의 등록 버튼 부분
    var title = $(".shop_li0 .title").val(); //.shop_li0안에  .title.val()(title값)을 가져다가 title안에 넣겠습니다.
    var icon = $(".shop_li0 .icon").val();
    var color = $(".shop_li0 .color").val();
    var link = $(".shop_li0 .link").val();
    if (title == "") {
        alert("제목을 입력하세요");
        $(".shop_li0 .title").focus();
    } else {
        ref = db.ref("root/shop");
        ref.push({
            title: title,
            icon: icon,
            color: color,
            link: link
        }).key;
    }
});




/*********** 내가만든 수정 및 삭제 ***************/
/* function shopUp2(obj){
 var li = $(obj).parent().parent();
 var id = li.attr("id");
 var title = $(".title", li).val();
 var color = $(".color", li).val();
 var link = $(".link", li).val();
 var icon = $(".icon", li).val();
 var idUl = $(obj).parent().parent().parent().attr("id");
 if (title == '' || link == '' || icon== '' || color== '') {
    alert("내용을 적어주세요.");
} else {
    ref = db.ref("root/shop/"+idUl+"/sub/"+id);
    ref.update({ //ref를 업데이트 하겠습니다./ update랑 push는 데이터 값이 있어야 함. remove는 없어도 됨
        icon: icon,
        title: title,
        link: link,
        color:color
    });
}



function shopDel2(obj){
   if(confirm("정말로 삭제하시겠습니까?")){
       var idUl = $(obj).parent().parent().parent().attr("id");
       var id = $(obj).parent().parent().attr("id");
       ref = db.ref("root/shop/"+idUl+"/sub/"+id).remove();
       
   }
} */

//2차 카테고리 생성
function shopAdd2(obj) { //$(".shop_wr").click( 이렇게 쓰면 인식을 못함. 왜냐하면 위에서부터 파싱 되면 shop_wr2는 생성되어 있지 않아 인식하지 못한다.
    var div = $(obj).parent().prev(); // this(.shop_wr2)에 부모에 부모 친구(부모와 같은 라인의 앞에있는 ) div > 144번~147번
    var idUl = $(obj).parent().parent().parent().attr("id");
    var title = $(".title", div).val(); // $(".title", div) = var div안에 있는 title이라는 클래스 명을 가진 값을 title에 넣어라
    var icon = $(".icon", div).val();
    var color = $(".color", div).val();
    var link = $(".link", div).val();
    if(title == ""){
        alert("카테고리 명을 입력하세요.");
        $(".title", div).focus();
        return false;
    }
    else{
        ref = db.ref("root/shop/" + idUl + "/sub");
        ref.push({
            title: title,
            icon: icon,
            color: color,
            link: link
        }).key;
    }
};

/*********** firebase에서 삭제 및 수정 ***************/
//1차 카테고리 삭제
function shopDel(obj) {
    var id = $(obj).parent().parent().parent().attr("id");
    db.ref("root/shop/" + id).remove();
}

//1차 카테고리 수정
function shopUp(obj) {
    var id = $(obj).parent().parent().parent().attr("id");
    var div = $(obj).parent().prev();
    var title = $(".title", div).val(); //div에 있는 title 값을 변수 title에 넣는다
    var icon = $(".icon", div).val();
    var color = $(".color", div).val();
    var link = $(".link", div).val();
    if (title == "") {
        alert("카테고리 명을 입력하세요.");
        $(".title", div).focus();
        return false;
    } else {
        db.ref("root/shop/" + id).update({ //firebase에 업데이트를 주는것
            title: title,
            icon: icon,
            color: color,
            link: link
        });
    }
}

//2차 카테고리 삭제
function shopDel2(obj) {
    if (confirm("정말로 삭제하시겠습니까?")) {
        var id = $(obj).parent().parent().parent().attr("id"); //ul의 id
        var id2 = $(obj).parent().parent().attr("id"); //li의 id
        db.ref("root/shop/" + id + "/sub/" + id2).remove(); //changed가 움직인다 / removed가 움직일때는 root/shop이 지워졌을때
    }
}

//2차 카테고리 수정
function shopUp2(obj) {
    var id = $(obj).parent().parent().parent().attr("id"); //ul의 id
    var id2 = $(obj).parent().parent().attr("id"); //li의 id
    var div = $(obj).parent().prev(); 
    var title = $(".title", div).val();
    var icon = $(".icon", div).val();
    var color = $(".color", div).val();
    var link = $(".link", div).val();
    if(title == ""){
        alert("카테고리 명을 입력하세요.");
        $(".title", div).focus();
        return false;
    }
    else{
        db.ref("root/shop/" + id + "/sub/" + id2).update({
            title: title,
            icon: icon,
            color: color,
            link: link
        }); 
    }
}




/*********** UI ***************/
$(".nav").on("click", function () {
    var n = $(this).index(); //nav 순서 0, 1, 2, 숫자를 리턴해준다
    $(".nav").css({
        "background-color": "",
        "color": ""
    });
    $(this).css({
        "background-color": "rgb(29, 58, 102)",
        "color": "#fff"
    }); //this = 클릭 된거/ 인라인으로 적용 된것이기 때문에 우선순위가 제일 높다
    $(".section").hide();
    $(".section").eq(n).show();
})
$(".nav").eq(0).trigger("click"); //eq는 숫자를 선택할떄, $(".nav").eq(0) = 선택자

/*********** 참조사항 ***************/
/* || : or 연산자 (또는, 이거나) => true||true (true) / true||false (true) / false||false (false)
&& : and 연산자 (그리고) => true&&true (true) / true&&false (false) / false&&false (false)
if()
 */

/* var img = $("#home_wr .tit_img").val();  //다 똑같은 의미
var img = $(".tit_img", "#home_wr").val(); 
var img = $("#home_wr").find(".tit_img").val();
var img = $("#home_wr").children(".tit_img").val(); */