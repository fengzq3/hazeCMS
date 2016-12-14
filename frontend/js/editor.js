/**
 * Created by feng on 2016/12/14.
 */
const wangEditor = require('wangeditor');

$(function () {
    const $textArea = $('.js-textArea');
    //计算高度
    $textArea.each(function () {

        if($textArea.hasClass('js-autoHeight')){
            console.log($(document).height());
            $textArea.height($(document).height() - 250);
        }


        wangEditor.config.printLog = false;
        let editor = new wangEditor($(this).attr('id'));

        editor.create();
    });
});