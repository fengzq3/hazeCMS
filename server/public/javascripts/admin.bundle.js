webpackJsonp([0],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {'use strict';

	/**
	 * Created by feng on 2016/11/21.
	 */
	var Modal = __webpack_require__(3);

	$(function () {
	    $("[data-toggle='tooltip']").tooltip();
	    //定义变量
	    var $minMenu = $('.js-mainMenu');
	    var $menuSlide = $('.js-menuSlide');
	    var $infoForm = $('.js-info-ajax');
	    var $loginForm = $('.js-login-ajax');
	    var $tipModal = $('#tipModal');
	    var $tagEdit = $('.js-tagEdit'),
	        $tagEditBtn = $('.js-editBtn');

	    //菜单min方法
	    $minMenu.on('click', function () {
	        $('body').toggleClass('min-menu');
	        $menuSlide.find('b.iconfont').attr({ title: $menuSlide.find('span').text() });
	    });

	    //伸缩
	    $menuSlide.on('click', function () {
	        $(this).toggleClass('on');
	        $(this).next('ul').toggleClass('hide');
	    });

	    //网站登录
	    // $loginForm.on('submit', function (e) {
	    //     e.stopPropagation();
	    //     e.preventDefault();
	    //     const action = this.action;
	    //     const method = this.method;
	    //     const data = $(this).serialize();
	    //     $(this).find('.btn').button('loading');
	    //
	    //     $.ajax({
	    //         url: action,
	    //         method: method,
	    //         data: data
	    //     }).then(function (res) {
	    //
	    //         if (res.error === 0) {
	    //             window.location.href = action;
	    //         } else {
	    //
	    //             if (res.error === 1) $(this).find('[name="userName"]').addClass('has-error');
	    //             if (res.error === 2) $(this).find('[name="userPassword"]').addClass('has-error');
	    //         }
	    //     });
	    //
	    // });

	    //网站信息页
	    $infoForm.on('submit', function (e) {
	        e.stopPropagation();
	        e.preventDefault();
	        var action = this.action;
	        var method = this.method;
	        var data = $(this).serialize();
	        var btn = $(this).find('.btn');

	        btn.button('loading');

	        $.ajax({
	            url: action,
	            method: method,
	            data: data
	        }).then(function (res) {
	            Modal.setModal($tipModal, res.messages);

	            if (res.error === 0) {
	                setTimeout(function () {
	                    window.location.href = action;
	                }, 2000);
	            } else {
	                btn.button('reset');
	            }
	        }, function (e) {
	            Modal.setModal($tipModal, { title: e.status, body: e.statusText });
	            btn.button('reset');
	        });
	    });

	    //话题编辑功能
	    $tagEdit.on('click', function (e) {
	        e.stopPropagation();
	        e.preventDefault();
	        $(this).parents('tr').toggle(0);
	        $('#' + $(this).data('target')).toggle(0);
	    });

	    $tagEditBtn.on('click', function (e) {
	        e.stopPropagation();
	        e.preventDefault();
	        var form = $('#' + $(this).data('target'));
	        var data = [form.find('[name="tag_name"]').val(), form.find('[name="tag_description"]').val(), form.find('[name="tag_keyword"]').val(), form.find('[name="tag_nav"]').val()];

	        $.ajax({
	            url: form.data('action'),
	            method: 'post',
	            data: data
	        }).then(function (res) {
	            console.log(res);

	            form.toggle(0).prev('tr').toggle(0);
	        });
	    });
	});
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ },
/* 1 */,
/* 2 */,
/* 3 */
/***/ function(module, exports) {

	'use strict';

	/**
	 * Created by feng on 2016/11/29.
	 * data = {}
	 * data.title 标题
	 * data.body 内容
	 */
	//通用tip消息

	var tipModal = {
	    setModal: function setModal(modal, data) {
	        modal.modal('show');
	        modal.find('#tipModalLabel').text(data.title);
	        modal.find('.modal-body').text(data.body);
	    },
	    setTip: function setTip(tip, mes) {
	        // tip.stop().animate({bottom:85+'%',opacity:1});
	        tip.addClass('showTip').removeClass('hideTip');
	        tip.find('p').text(mes);
	        //超时自动关闭
	        setTimeout(function () {
	            // tip.stop().animate({bottom:100+'%',opacity:0}).off('click');
	            tip.removeClass('showTip').addClass('hideTip');
	        }, 5000);
	        //点击关闭按钮
	        tip.on('click', '.js-close', function () {
	            // tip.stop().animate({bottom:100+'%',opacity:0}).off('click');
	            tip.removeClass('showTip').addClass('hideTip');
	        });
	    }
	};

	module.exports = tipModal;

/***/ }
]);