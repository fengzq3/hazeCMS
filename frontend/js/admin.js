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
    const $tagEdit = $('.js-tagEdit'), $tagEditBtn = $('.js-editBtn'), $tagEditAbort = $('.js-editAbort');
    const $addTagForm = $('.js-addTag-ajax');

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
            Modal.setModal($tipModal, res.messages);

            if (res.error === 0) {
                setTimeout(function () {
                    window.location.href = action;
                }, 2000);
            } else {
                btn.button('reset');
            }

        }, function (e) {
            Modal.setModal($tipModal, {title: e.status, body: e.statusText});
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
        const form = $('#' + $(this).data('target'));
        let data = {
            tag_name: $(form.find('[name="tag_name"]')).val(),
            tag_description: $(form.find('[name="tag_description"]')).val(),
            tag_keyword: $(form.find('[name="tag_keyword"]')).val(),
            tag_nav: $(form.find('[name="tag_nav"]')).val()
        };

        $.ajax({
            url: form.data('action'),
            method: 'post',
            data: data
        }).then(function (res) {
            console.log(res);
            window.location.reload(); //刷新
        });

    });

    $tagEditAbort.on('click', function (e) {
        $('#' + $(this).data('target')).toggle(0).prev('tr').toggle(0);
    });


    //话题添加，添加一个新话题
    $addTagForm.on('submit', function (e) {
        e.stopPropagation();
        e.preventDefault();
        const data = $(this).serialize();
        Modal.setTip($minTip, '正在提交...');
        $.ajax({
            url: this.action,
            method: this.method,
            data: data
        }).then(function (d) {
            Modal.setTip($minTip, d.messages.body);
            if (d.error === 0) {
                setTimeout(window.location.reload());
            }
        });
    });


});