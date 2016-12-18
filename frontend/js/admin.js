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
    const $tagEdit = $('.js-tagEdit'), $tagEditForm = $('.js-editForm'), $tagEditAbort = $('.js-editAbort');
    const $addTagForm = $('.js-addTag-ajax');
    const $editArticle = $('.js-editArticle-ajax');

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
    $loginForm.on('submit', function (e) {
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
        }).then(function (d) {
            console.log(d);
            $.alert({
                animation: 'top',
                closeAnimation: 'top',
                title: d.messages.title,
                content: d.messages.body,
                buttons: {
                    '确定': {
                        key:'enter',
                        btnClass:'btn-success',
                        action:() => {

                            if (d.error === 0) {
                                document.location.href = '/admin';
                            }else{
                                btn.button('reset');
                            }
                        }
                    }
                }
            });
            //alert END

        });

    });

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

    $tagEditForm.on('submit', function (e) {
        e.stopPropagation();
        e.preventDefault();
        const form = $(this);
        let data = form.serialize();

        $.ajax({
            url: this.action,
            method: this.method,
            data: data
        }).then(function (res) {
            console.log(res);
            window.location.reload(); //刷新
        });

    });
    //取消编辑tag
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


    //修改文章
    $editArticle.on('submit', function (e) {
        e.stopPropagation();
        e.preventDefault();
        const data = $(this).serialize();

        Modal.setTip($minTip, 'loading...');
        $.ajax({
            url: this.action,
            method: this.method,
            data: data
        }).then(function (d) {

            if (d.error === 0) {
                Modal.setTip($minTip, d.messages.body);
                setTimeout(function () {
                    if (document.referrer) {
                        window.location.href = document.referrer;
                    } else {
                        window.location.href = '/admin/articleList';
                    }
                }, 1000);
            } else {
                Modal.setModal($tipModal, d.messages);
            }
        });
    });


});