/**
 * Created by feng on 2016/12/20.
 */
const config = require('../../config');
const fs = require('fs');
const path = require('path');

module.exports = {
    checkLogin: function (req, res, next) {
        //校验登录
        if (config.debug) console.log('file checkLogin');
        next();
    },

    singleFile: function (req, res, next) {

        const file = req.file;

        if (config.debug) {
            console.log('文件类型：%s', req.file.mimetype);
            console.log('文件名：%s', req.file.originalname);
            console.log('文件大小：%s', req.file.size);
            console.log('文件保存路径：%s', req.file.path);
            console.log(file);
        }

        fs.renameSync(file.path, path.join(config.root, '/public/upload/', file.originalname));

        res.send('/upload/' + file.originalname);
    },
    //用来接收webuploader 上传的图片
    topPicFile: function (req, res, next) {
        if (config.debug) console.log(req.file);

        const file = req.file;
        //需要对中文文件名重命名
        const fileType = /\.[^\.]+/.exec(file.originalname);

        fs.renameSync(file.path, path.join(config.root, '/public/upload/', file.filename + fileType));

        res.send('/upload/' + file.filename + fileType);
    }

};