/**
 * semfeng 主js文件
 */
"use strict";
// require('./index.slide.js');
const fTime = require('./date.format');


$(function () {
    //变量
    let $dropDown = $('.js-dropdown');  //下拉
    let $search = $('#mainSearch'); //搜索
    let $mobSearchIco = $('.js-mobSearchIco'); //移动搜索图标
    let $mobSearchForm = $('.js-mobSearch'); //移动搜索框
    let $mobileNav = $('#mobileNav');   //移动导航
    let $mobileNavBtn = $('#mobileNavBtn'); //移动导航按钮
    let $shadeLayout = $('.js-shade');  //遮罩层
    let width = window.innerWidth;  //窗口宽度
    let height = window.innerHeight;  //窗口高度
    let $fixed = $('.js-fixed');    //pin功能，固定底部
    let $date = $('.js-date');  //date
    //user 变量
    let $ajaxForm = $('.js-form-ajax');

    //dropdown
    $dropDown.hover(function () {
        $(this).addClass('open');
    }, function () {
        $(this).removeClass('open');
    });
    //search
    $search.find('input').on({
        focus: function () {
            $search.addClass('active');
        },
        input: function () {
            if (!$(this).val()) {
                $search.removeClass('active');
            }
        },
        mouseout: function () {
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
    const ShadeL = {
        show: callback => {
            //显示遮罩 并 添加事件监听
            $shadeLayout.addClass('show').off('click').on('click', callback);
        },
        hide: () => {
            $shadeLayout.removeClass('show').off('click'); //隐藏遮罩
        }
    }

    // 移动search
    $mobSearchIco.on('click', function () {
        ShadeL.show(() => {
            ShadeL.hide();
            $(this).removeClass('hide');
            $mobSearchForm.removeClass('show');
        });
        $(this).addClass('hide');
        $mobSearchForm.addClass('show');
    });

    // 判断宽度，超过 768 则启用
    if (width >= 768 && $fixed.length !== 0) {
        let scTop = $fixed.offset().top;
        $(window).scroll(function () {
            let scrollH = $(document).scrollTop();
            if ((scTop - $fixed.height() - scrollH) > height) {
                $fixed.addClass('fixed');
            } else {
                $fixed.removeClass('fixed');
            }
        });
    }

    //格式化时间
    const thisDate = (new Date($date.attr('date'))).format('yyyy-MM-dd');
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
