/**
 * Created by feng on 2016/12/22.
 * 用来实现webuploader
 */

const WebUploader = require('webuploader');

module.exports = function (elm) {
    const uploader = WebUploader.create({
        server:'/files/singleFile',
        pick:elm,
        accept:{
            title: 'Images',
            extensions: 'gif,jpg,jpeg,bmp,png',
            mimeTypes: 'image/*'
        }
    });
};