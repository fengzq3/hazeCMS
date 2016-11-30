/**
 * Created by feng on 2016/11/21.
 */
const Modal = require('./tipModal');

$(function () {
    $("[data-toggle='tooltip']").tooltip();
    //定义变量
    const $minMenu = $('.js-mainMenu');
    const $menuSlide = $('.js-menuSlide');
    const $infoForm = $('.js-info-ajax');
    const $loginForm = $('.js-login-ajax');
    const $tipModal = $('#tipModal');
    const $minTip = $('#minTip');

    //菜单min方法
    $minMenu.on('click', function () {
        $('body').toggleClass('min-menu');
        $menuSlide.find('b.iconfont').attr({title: $menuSlide.find('span').text()});
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
        const action = this.action;
        const method = this.method;
        const data = $(this).serialize();
        const btn = $(this).find('.btn');

        btn.button('loading');


        $.ajax({
            url: action,
            method: method,
            data: data
        }).then(function (res) {
            // $tipModal.modal('show');
            // $tipModal.find('#tipModalLabel').text(res.messages.title);
            // $tipModal.find('.modal-body').text(res.messages.body);
            // Modal.setModal($tipModal,res.messages);
            Modal.setTip($minTip,'测试内容内容');
            if (res.error === 0) {
                setTimeout(function () {
                    window.location.href = action;
                },2000);
            } else {
                btn.button('reset');
            }

        }, function (e) {
            // $tipModal.modal('show');
            // $tipModal.find('#tipModalLabel').text(e.status);
            // $tipModal.find('.modal-body').text(e.statusText);
            Modal.setModal($tipModal,{title:e.status,body:e.statusText});

            btn.button('reset');
        });

    });


});