var Ajax = (function () { //ajax라는 객체를 만든다
	function Ajax(_file) { //통신이 일어나면 success가 일어나는 함수
		this.file = _file;
		this.data = {}; //내가 전달해준 데이터값으로 변한다
	}
	Ajax.prototype.addData = function (_data) {
		this.data = _data;

	}
	Ajax.prototype.send = function (_fn) {
		this.fn = _fn;
		$.ajax({
			url: this.file,
			type: "post",
			dataType: "json",
			data: this.data,
			success: this.fn,
			error: function (xhr, status, error) {
				alert("통신이 원활하지 않습니다.\n 잠시후 다시 시도해주세요.");
				console.log(xhr, status, error);
			}
		});
	}
	return Ajax;
}());