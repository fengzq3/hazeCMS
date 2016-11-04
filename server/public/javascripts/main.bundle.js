webpackJsonp([1],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {/**
	 * semfeng 主js文件
	 */
	"use strict";
	// require('./index.slide.js');

	$(function () {
	    //变量
	    var $dropDown = $('.js-dropdown'); //下拉
	    var $search = $('#mainSearch'); //搜索
	    var $mobSearchIco = $('.js-mobSearchIco'); //移动搜索图标
	    var $mobSearchForm = $('.js-mobSearch'); //移动搜索框
	    var $mobileNav = $('#mobileNav'); //移动导航
	    var $mobileNavBtn = $('#mobileNavBtn'); //移动导航按钮
	    var $shadeLayout = $('.js-shade'); //遮罩层
	    var width = window.innerWidth; //窗口宽度
	    var height = window.innerHeight; //窗口高度
	    var $fixed = $('.js-fixed'); //pin功能，固定底部
	    //user 变量
	    var $ajaxForm = $('.js-form-ajax');

	    //dropdown
	    $dropDown.hover(function () {
	        $(this).addClass('open');
	    }, function () {
	        $(this).removeClass('open');
	    });
	    //search
	    $search.find('input').on({
	        focus: function focus() {
	            $search.addClass('active');
	        },
	        input: function input() {
	            if (!$(this).val()) {
	                $search.removeClass('active');
	            }
	        },
	        mouseout: function mouseout() {
	            if (!$(this).val()) {
	                $search.removeClass('active');
	            }
	        }
	    });
	    // 移动胶囊导航
	    $mobileNavBtn.on('click', closeMobileNav);
	    //点击遮罩层关闭导航
	    function closeMobileNav() {
	        if (!$mobileNav.hasClass('in')) {
	            ShadeL.show(closeMobileNav);
	            $mobileNavBtn.addClass('open');
	            $mobileNav.addClass('in');
	        } else {
	            ShadeL.hide();
	            $mobileNavBtn.removeClass('open');
	            $mobileNav.removeClass('in');
	        }
	    }

	    // shade 层方法
	    var ShadeL = {
	        show: function show(callback) {
	            //显示遮罩 并 添加事件监听
	            $shadeLayout.addClass('show').off('click').on('click', callback);
	        },
	        hide: function hide() {
	            $shadeLayout.removeClass('show').off('click'); //隐藏遮罩
	        }
	    };

	    // 移动search
	    $mobSearchIco.on('click', function () {
	        var _this = this;

	        ShadeL.show(function () {
	            ShadeL.hide();
	            $(_this).removeClass('hide');
	            $mobSearchForm.removeClass('show');
	        });
	        $(this).addClass('hide');
	        $mobSearchForm.addClass('show');
	    });

	    // 判断宽度，超过 768 则启用
	    if (width >= 768 && $fixed.length !== 0) {
	        (function () {
	            var scTop = $fixed.offset().top;
	            $(window).scroll(function () {
	                var scrollH = $(document).scrollTop();
	                if (scTop - $fixed.height() - scrollH > height) {
	                    $fixed.addClass('fixed');
	                } else {
	                    $fixed.removeClass('fixed');
	                }
	            });
	        })();
	    }

	    //users 页面
	    $ajaxForm.on('submit', function (e) {
	        e.stopPropagation();
	        e.parseDefault();
	    });

	    //function END
	});
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ }
]);