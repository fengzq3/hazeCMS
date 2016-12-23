/**
 * Created by feng on 2016/12/22.
 * 用来实现webuploader
 * ********************************
 *
 *
 */

const WebUploader = require('webuploader');

module.exports = function (elm) {
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

    uploader.on('fileQueued',function (file) {
        console.log(file);

        //生成base64预览
        uploader.makeThumb( file, function( error, src ) {
            console.log(src);
        }, 100, 100 );
        
    });
};