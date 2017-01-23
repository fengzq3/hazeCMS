/**
 * semfeng 主js文件
 */
"use strict";
// require('./index.slide.js');
//格式化时间
// require('./date.format');
// const Model = require('./tipModal');
require('jquery-confirm');

$(function () {
    $("[data-toggle='tooltip']").tooltip(); //全局启动tooltip
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
    // const $date = $('.js-date');  //date
    // const $dateTime = $('.js-dateTime');  //date time
    const $checkInput = $('.js-checkInput'); //通用input检测
    const $linkAjax = $('.js-linkAjax'); //全局ajax link 标签
    const $back = $('.js-back'); //返回按钮
    const $prevNext = $('.js-prevNext'); //上一篇下一篇
    const $navActive = $('.js-navActive'); //渲染active标记
    const $dialog = $('.js-dialog'); //定义dialog
    const $loadPage = $('.js-loadPage'); //动态加载分页
    const $listContent = $('.js-listContent'); //内容列表容器
    const $comment = $('.ds-thread'); //评论插件
    const $commentCont = $('.ds-thread-count'); //评论计数

    //一个简单的dialog
    $dialog.on('click', function (e) {
        e.stopPropagation();
        e.preventDefault();
        let content = $(this).data('content');
        let title = $(this).attr('title');
        $.dialog({
            animation: 'top',
            closeAnimation: 'top',
            title: title,
            columnClass: 'medium',
            content: content
        });
    });

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
    };

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
    // $date.each(function () {
    //     const thisDate = (new Date($(this).attr('date'))).format('yyyy-MM-dd');
    //     $(this).text(thisDate);
    // });
    // $dateTime.each(function () {
    //     const thisDate = (new Date($(this).attr('date'))).format('yyyy-MM-dd hh:mm:ss');
    //     $(this).text(thisDate);
    // });

    /**
     * input检测
     * 必要的class为 help-block
     * 若为必填项，则添加 em标记，input添加must
     * focusin/focusout 两个事件支持冒泡，但是浏览器支持有问题（可能）
     */
    $checkInput
        .focusin(function (e) {
            $(this).find('.help-block').addClass('on').find('span').text($(e.target).attr('placeholder'));
        })
        .focusout(function (e) {
            console.log($(e.target).val());

            $(this).find('.help-block').removeClass('on');
            if ($(e.target).hasClass('must') && $(e.target).val() === '') {
                $(e.target).parent().addClass('has-error');
                $(this).find('.help-block span').text('该项不能为空');
            } else {
                $(e.target).parent().removeClass('has-error');
            }
        });


    //全局ajax link 方法
    $linkAjax.on('click', function (e) {
        e.stopPropagation();
        e.preventDefault();
        // Model.setTip($minTip, '处理中...');
        let $thisLink = $(this);
        let content = $thisLink.data('confirm') ? $thisLink.data('confirm') : "确定进行此操作吗？";

        $.confirm({
            animation: 'top',
            closeAnimation: 'top',
            title: '系统提示',
            content: content,
            buttons: {
                "取消": {
                    btnClass: 'btn-default',
                    keys: ['esc']
                },
                '确定': {
                    btnClass: 'btn-success',
                    keys: ['enter'],
                    action: () => {
                        $.ajax({
                            url: $thisLink.attr('href'),
                            method: 'GET'
                        }).then(function (d) {
                            // Model.setTip($minTip, d.messages.body);
                            $.alert({
                                animation: 'top',
                                closeAnimation: 'top',
                                title: d.messages.title,
                                content: d.messages.body,
                                buttons: {
                                    '确定': () => {
                                        if (d.error === 0) {
                                            setTimeout(window.location.reload());
                                        }
                                    }
                                }
                            });
                            //end alert

                        });
                    }
                },

            }
        });


    });

    //动态加载分页
    $loadPage.on('click', function (e) {
        e.stopPropagation();
        e.preventDefault();
        const $btn = $(this);
        $btn.button('loading');

        let page = $btn.data('page') > 1 ? $btn.data('page') : 2;
        let url = $btn.attr('href') + '?ajax=1&page=' + page;
        $.ajax({
            url: url,
            method: 'GET'
        }).then(function (d) {

            if (d) {
                $listContent.append(d);
                $btn.data('page', page + 1).button('reset');
            } else {
                $btn.text('没有更多了');
            }

        });
    });

    //全局返回按钮
    $back.on('click', function (e) {
        e.stopPropagation();
        e.preventDefault();
        window.history.go(-1);
    });

    //获取上一篇下一篇
    if ($prevNext.length !== 0) {
        setTimeout(function () {
            $.ajax({
                url: '/article/prevNext',
                method: 'post',
                data: {date: $prevNext.data('date')}
            }).then(function (d) {
                let prev = d[0][0], next = d[1][0];
                console.log(prev, next);
                if (!!prev) {
                    $prevNext.append(`<p><a href="${prev._id}" title="${prev.title}">上一篇</a></p>`);
                }
                if (!!next) {
                    $prevNext.prepend(`<p><a href="${next._id}" title="${next.title}">下一篇</a></p>`);
                }
            });
        });
    }

    //渲染当前导航 active
    setTimeout(function () {
        let thisLink = window.location.href;
        let theLink = $navActive.find('li a');

        theLink.each(function () {
            // console.log(thisLink === $(this).attr('href'),'|',thisLink,$(this).attr('href'));

            if ($(this).attr('href') === thisLink || $(this).attr('href') + '/' === thisLink) {
                $(this).parent().addClass('active').siblings('active').removeClass('active');
            }
        });
    });

    //渲染评论
    if ($comment.length !== 0 || $commentCont.length !== 0) {
        // const duoshuoQuery = {short_name:"fengzq"};
        let ds = document.createElement('script');
        ds.type = 'text/javascript';ds.async = true;
        ds.src = (document.location.protocol == 'https:' ? 'https:' : 'http:') + '//static.duoshuo.com/embed.js';
        ds.charset = 'UTF-8';
        (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(ds);
    }

    //function END
});
