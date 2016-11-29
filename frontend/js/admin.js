/**
 * Created by feng on 2016/11/21.
 */
const $tipModal = require('./tipModal');

$(function () {
    $("[data-toggle='tooltip']").tooltip();
    //定义变量
    const $minMenu = $('.js-mainMenu');
    const $menuSlide = $('.js-menuSlide');
    const $infoForm = $('.js-info-ajax');
    const $loginForm = $('.js-login-ajax');

    //菜单min方法
    $minMenu.on('click', function () {
        $(this).parent().parent().toggleClass('min-menu');
        $menuSlide.find('b.iconfont').attr({title: $menuSlide.find('span').text()});
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
        const action = this.action;
        const method = this.method;
        const data = $(this).serialize();
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
                if(res.error === 1) $(this).find('[name="userName"]').addClass('has-error');
                if(res.error === 2) $(this).find('[name="userPassword"]').addClass('has-error');
            }
        });

    });
    //网站信息页
    $infoForm.on('submit', function (e) {
        e.stopPropagation();
        e.preventDefault();
        const action = this.action;
        const method = this.method;
        const data = $(this).serialize();
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