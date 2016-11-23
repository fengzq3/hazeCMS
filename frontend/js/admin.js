/**
 * Created by feng on 2016/11/21.
 */
$(function () {
    $("[data-toggle='tooltip']").tooltip();
    //定义变量
    const $minMenu = $('.js-mainMenu');
    const $menuSlide = $('.js-menuSlide');

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

});