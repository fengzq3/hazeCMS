/**
 * semfeng 主js文件
 */
"use strict";
// require('./index.slide.js');
//格式化时间
const fTime = require('./date.format');


$(function () {
    //变量
    const $dropDown = $('.js-dropdown');  //下拉
    const $search = $('#mainSearch'); //搜索
    const $mobSearchIco = $('.js-mobSearchIco'); //移动搜索图标
    const $mobSearchForm = $('.js-mobSearch'); //移动搜索框
    const $mobileNav = $('#mobileNav');   //移动导航
    const $mobileNavBtn = $('#mobileNavBtn'); //移动导航按钮
    const $shadeLayout = $('.js-shade');  //遮罩层
    const width = window.innerWidth;  //窗口宽度
    const height = window.innerHeight;  //窗口高度
    const $fixed = $('.js-fixed');    //pin功能，固定底部
    const $date = $('.js-date');  //date
    const $ajaxForm = $('.js-form-ajax'); //默认ajax提交
    const $checkInput = $('.js-checkInput'); //通用input检测

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

    //定义ajax提交
    $ajaxForm.on('submit', function (e) {
        e.stopPropagation();
        e.preventDefault();
        const data = $(this).serialize();
        const method = this.method;
        const action = this.action;
        $.ajax({url: action, method: method, data: data}).then(function (res) {
            console.log(res);
            if (res.error === 0) {
                window.location.href = action;
            } else {
                //登录错误处理
                alert(res.messages);
            }
        });

    });

    /**
     * input检测
     * 必要的class为 help-block
     * 若为必填项，则添加 em标记，input添加must
     * focusin/focusout 两个事件支持冒泡，但是浏览器支持有问题
     */
    $checkInput
        .focusin(function (e) {
            $(this).find('.help-block span').text($(this).find('input').attr('placeholder'));
        })
        .focusout(function (e) {
            console.log($(this).find('input').val());
            if ($(this).hasClass('must') && $(this).find('input').val() == '') {
                $(this).find('.help-block span').text('该项不能为空');
            }
        });


    //function END
});
