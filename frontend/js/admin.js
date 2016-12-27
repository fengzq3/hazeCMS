/**
 * Created by feng on 2016/11/21.
 */
const uploader = require('./uploader');

$(function () {
    //定义变量
    const $minMenu = $('.js-mainMenu');
    const $menuSlide = $('.js-menuSlide');
    const $infoForm = $('.js-info-ajax');
    const $loginForm = $('.js-login-ajax');
    const $tagEdit = $('.js-tagEdit'), $tagEditForm = $('.js-editForm'), $tagEditAbort = $('.js-editAbort');
    const $addTagForm = $('.js-addTag-ajax');
    const $editArticle = $('.js-editArticle-ajax');
    const $title = $('.js-title'),$bindTitle = $('.js-bindTitle');

    //文件上传组件
    uploader('.js-uploadFile');

    //title 数据同步输入绑定
    $title.on('input',function () {
        let text = $(this).val();
        $bindTitle.text(text);
    });


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
                // backgroundDismiss:true,
                buttons: {
                    '确定': {
                        // keys: ['enter'],
                        btnClass: 'btn-success',
                        action: () => {
                            if (d.error === 0) {
                                document.location.reload();
                            } else {
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
        }).then(function (d) {
            // Modal.setModal($tipModal, res.messages);
            btn.button('reset');
            $.confirm({
                animation:'top',
                closeAnimation:'top',
                title: d.messages.title,
                content: d.messages.body,
                buttons: {
                    ok: {
                        text: '确定',
                        btnClass: 'btn-success',
                        action: () => {
                            if (d.error === 0) {
                                window.location.href = action;
                            }
                            //跳转
                            if (!!d.forward) {
                                window.location.href = d.forward;
                            }
                            //end if
                        }
                    }
                    //ok end
                }
            });
            //confirm END

        }, function (e) {
            $.alert({animation: 'top', closeAnimation: 'top', title: e.status, content: e.statusText});
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
        const btn = $(this).find('[type="submit"]');
        let data = form.serialize();

        btn.button('loading');
        $.ajax({
            url: this.action,
            method: this.method,
            data: data
        }).then(function (d) {
            console.log(d);
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
        const btn = $(this).find('[type="submit"]');
        const data = $(this).serialize();
        // Modal.setTip($minTip, '正在提交...');
        btn.button('loading');
        $.ajax({
            url: this.action,
            method: this.method,
            data: data
        }).then(function (d) {
            // Modal.setTip($minTip, d.messages.body);
            btn.button('reset');
            $.confirm({
                animation:'top',
                closeAnimation:'top',
                title: d.messages.title,
                content: d.messages.body,
                buttons: {
                    ok: {
                        text: '确定',
                        btnClass: 'btn-success',
                        action: () => {
                            if (d.error === 0) {
                                setTimeout(window.location.reload());
                            }
                            //跳转
                            if (!!d.forward) {
                                window.location.href = d.forward;
                            }
                            //end if
                        }
                    }
                    //ok end
                }
            });
            //confirm END

        });
    });


    //修改文章
    $editArticle.on('submit', function (e) {
        e.stopPropagation();
        e.preventDefault();
        const data = $(this).serialize();
        const btn = $(this).find('[type="submit"]');

        // Modal.setTip($minTip, 'loading...');
        btn.button('loading');
        $.ajax({
            url: this.action,
            method: this.method,
            data: data
        }).then(function (d) {

            btn.button('reset');
            $.confirm({
                animation:'top',
                closeAnimation:'top',
                title: d.messages.title,
                content: d.messages.body,
                buttons: {
                    ok: {
                        text: '确定',
                        btnClass: 'btn-success',
                        action: () => {
                            if (d.error === 0) {
                                if (!!document.referrer) {
                                    window.location.href = document.referrer;
                                } else {
                                    window.location.href = '/admin/articleList';
                                }
                            }
                            //跳转
                            if (!!d.forward) {
                                window.location.href = d.forward;
                            }
                            //end if
                        }
                    }
                    //ok end
                }
            });


        });
    });


});