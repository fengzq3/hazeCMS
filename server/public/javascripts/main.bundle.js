webpackJsonp([1],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {/**
	 * semfeng 主js文件
	 */
	"use strict";
	// require('./index.slide.js');

	var fTime = __webpack_require__(4);

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
	    //admin 变量
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

	    //格式化时间
	    var thisDate = new Date($date.attr('date')).format('yyyy-MM-dd');
	    $date.text(thisDate);
	    // fTime.relTime();

	    //users 页面
	    console.log($ajaxForm);
	    $ajaxForm.on('submit', function (e) {
	        e.stopPropagation();
	        e.preventDefault();
	    });

	    //function END
	});

	//扩展时间格式化
	// Date.prototype.format = function (fmt) {
	//     const o = {
	//         "M+" : this.getMonth()+1,                 //月份
	//         "d+" : this.getDate(),                    //日
	//         "h+" : this.getHours(),                   //小时
	//         "m+" : this.getMinutes(),                 //分
	//         "s+" : this.getSeconds(),                 //秒
	//         "q+" : Math.floor((this.getMonth()+3)/3), //季度
	//         "S"  : this.getMilliseconds()             //毫秒
	//     };
	//     if(/(y+)/.test(fmt)) fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));
	//     for(let k in o)
	//         if(new RegExp("("+ k +")").test(fmt))
	//             fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
	//     return fmt;
	// };
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ },
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */
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
]);