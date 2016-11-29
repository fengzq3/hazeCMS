webpackJsonp([2],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {/**
	 * semfeng 主js文件
	 */
	"use strict";
	// require('./index.slide.js');
	//格式化时间

	var fTime = __webpack_require__(5);
	var $tipModal = __webpack_require__(3); //通用模态框、提示等

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
	    var $date = $('.js-date'); //date
	    // const $ajaxLink = $('.js-link-ajax'); //默认ajax提交a link
	    var $checkInput = $('.js-checkInput'); //通用input检测


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

	    //格式化时间
	    var thisDate = new Date($date.attr('date')).format('yyyy-MM-dd');
	    $date.text(thisDate);
	    // fTime.relTime();

	    //定义ajax提交
	    // $ajaxLink.on('click', function (e) {
	    //     e.stopPropagation();
	    //     e.preventDefault();
	    //     const url = $(this).attr('href');
	    //     $.ajax({url: url, method: get}).then(function (res) {
	    //         console.log(res);
	    //         if (res.error === 0) {
	    //             $mainTip.modal('show');
	    //             window.location.href = url;
	    //         } else {
	    //             //登录错误处理
	    //             alert(res.messages);
	    //         }
	    //     });
	    //
	    // });

	    /**
	     * input检测
	     * 必要的class为 help-block
	     * 若为必填项，则添加 em标记，input添加must
	     * focusin/focusout 两个事件支持冒泡，但是浏览器支持有问题（可能）
	     */
	    $checkInput.focusin(function (e) {
	        $(this).find('.help-block').addClass('on').find('span').text($(this).find('input').attr('placeholder'));
	    }).focusout(function (e) {
	        console.log($(this).find('input').val());

	        $(this).find('.help-block').removeClass('on');
	        if ($(this).hasClass('must') && $(this).find('input').val() == '') {
	            $(this).find('.help-block span').text('该项不能为空');
	        }
	    });

	    //function END
	});
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ },

/***/ 5:
/***/ function(module, exports) {

	"use strict";

	/**
	 * Created by feng on 2016/11/14.
	 * Used to format the Date
	 * 格式化时间
	 */

	//全局添加格式化方法
	Date.prototype.format = function (fmt) {
	    var o = {
	        "M+": this.getMonth() + 1, //月份
	        "d+": this.getDate(), //日
	        "h+": this.getHours(), //小时
	        "m+": this.getMinutes(), //分
	        "s+": this.getSeconds(), //秒
	        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
	        "S": this.getMilliseconds() //毫秒
	    };
	    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
	    for (var k in o) {
	        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
	    }return fmt;
	};

	module.exports = {
	    relTime: function relTime() {
	        //todo 相对时间
	        console.log('相对时间');
	    }
	};

/***/ }

});