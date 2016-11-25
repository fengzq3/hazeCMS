/**
 * Created by feng on 2016/11/21.
 */
$(function () {
    $("[data-toggle='tooltip']").tooltip();
    //定义变量
    const $minMenu = $('.js-mainMenu');
    const $menuSlide = $('.js-menuSlide');
    const $login = $('.js-login');

    //菜单min方法
    $minMenu.on('click',function () {
        $(this).parent().parent().toggleClass('min-menu');
        $menuSlide.find('b.iconfont').attr({title:$menuSlide.find('span').text()});
    });

    //伸缩
    $menuSlide.on('click',function () {
        $(this).toggleClass('on');
        $(this).next('ul').toggleClass('hide');

    });

    //登录
    $login.on('submit',function (e) {
        e.stopPropagation();
        e.preventDefault();
        console.log(e);
        const data = $(this).serialize();
        const method = this.method;
        const action = this.action;
        $.ajax({url:action,method:method,data:data}).then(function (res) {
            console.log(res);
            if(res.error === 0){
                window.location.href = action;
            }else{
                //登录错误处理
                alert(res.messages);
            }
        });
    });

});