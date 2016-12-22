/**
 * Created by feng on 2016/12/14.
 */
const wangEditor = require('wangeditor');

$(function () {
    const $textArea = $('.js-textArea');

    $textArea.each(function () {
        //计算高度
        if($textArea.hasClass('js-autoHeight')){
            console.log($(document).height());
            $textArea.height($(document).height() - 250);
        }

        //编辑器配置
        // wangEditor.config.printLog = false;
        wangEditor.config.uploadImgUrl = '/files/singleFile';

        let editor = new wangEditor($(this).attr('id'));

        editor.create();
    });
});