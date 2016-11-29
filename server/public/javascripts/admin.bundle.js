webpackJsonp([0],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {'use strict';

	/**
	 * Created by feng on 2016/11/21.
	 */
	var $tipModal = __webpack_require__(3);

	$(function () {
	    $("[data-toggle='tooltip']").tooltip();
	    //定义变量
	    var $minMenu = $('.js-mainMenu');
	    var $menuSlide = $('.js-menuSlide');
	    var $infoForm = $('.js-info-ajax');
	    var $loginForm = $('.js-login-ajax');

	    //菜单min方法
	    $minMenu.on('click', function () {
	        $(this).parent().parent().toggleClass('min-menu');
	        $menuSlide.find('b.iconfont').attr({ title: $menuSlide.find('span').text() });
	    });

	    //伸缩
	    $menuSlide.on('click', function () {
	        $(this).toggleClass('on');
	        $(this).next('ul').toggleClass('hide');
	    });

	    //网站登录
	    $loginForm.on('submit', function (e) {
	        e.stopPropagation();
	        e.preventDefault();
	        var action = this.action;
	        var method = this.method;
	        var data = $(this).serialize();
	        $(this).find('.btn').button('loading');

	        $.ajax({
	            url: action,
	            method: method,
	            data: data
	        }).then(function (res) {
	            $tipModal.open(res.messages);
	            if (res.error === 0) {
	                window.location.href = action;
	            } else {
	                setTimeout($tipModal.hide(), 1000);
	                if (res.error === 1) $(this).find('[name="userName"]').addClass('has-error');
	                if (res.error === 2) $(this).find('[name="userPassword"]').addClass('has-error');
	            }
	        });
	    });
	    //网站信息页
	    $infoForm.on('submit', function (e) {
	        e.stopPropagation();
	        e.preventDefault();
	        var action = this.action;
	        var method = this.method;
	        var data = $(this).serialize();
	        $(this).find('.btn').button('loading');

	        $.ajax({
	            url: action,
	            method: method,
	            data: data
	        }).then(function (res) {
	            $tipModal.open(res.messages);
	            if (res.error === 0) {
	                window.location.href = action;
	            } else {
	                setTimeout($tipModal.hide(), 1000);
	            }
	        });
	    });
	});
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ }
]);