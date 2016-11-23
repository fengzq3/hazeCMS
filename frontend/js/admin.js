/**
 * Created by feng on 2016/11/21.
 */
$(function () {
    $("[data-toggle='tooltip']").tooltip();
    const $minMenu = $('.js-mainMenu');

    $minMenu.on('click',function () {
        let parentMenu = $(this).parent().parent();
        if(!parentMenu.hasClass('min-menu')){
            parentMenu.addClass('min-menu');
        }else{
            parentMenu.removeClass('min-menu');
        }
    });

});