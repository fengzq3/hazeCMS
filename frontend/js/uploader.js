/**
 * Created by feng on 2016/12/22.
 * 用来实现webuploader
 * ********************************
 *
 *
 */

const WebUploader = require('webuploader');

module.exports = function (elm) {
    const $process = $('.js-processFile');
    const $img = $('.js-showTopPic');
    const $topPic = $('.js-getTopPic');

    const uploader = WebUploader.create({
        auto:true,
        server:'/files/topPicFile',
        pick:elm,
        accept:{
            title: 'Images',
            extensions: 'gif,jpg,jpeg,bmp,png',
            mimeTypes: 'image/*'
        }
    });
    //队列事件
    uploader.on('fileQueued',function (file) {
        console.log('加入队列：',file);

        uploader.makeThumb( file, function( error, src ) {
            console.log('base64:',file);
            console.log('base64:',src);

            $img.attr('src',src);

        }, 0.5, 0.5 );

    });
    //上传进度
    uploader.on('uploadProgress',function (file,percentage) {
        console.log('上传进度：',percentage);

        $process.removeClass('hide').text(percentage * 100 + '%');

    });
    //上传成功
    uploader.on( 'uploadSuccess', function( file,response ) {
        console.log('上传成功：',response._raw);

        $process.text('上传成功');
        //替换img src
        $img.attr('src',response._raw);
        //填充topPic数据
        $topPic.val(response._raw);

        uploader.reset();

        setTimeout(function () {
            $process.addClass('hide');
        },2000)
    });
    //上传失败
    uploader.on('uploadError',function (file) {
        $process.text('文件上传失败');
        uploader.reset();
    });

};