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

        fs.renameSync(file.path, path.join(config.root, '/public/upload/', req.file.originalname));

        res.send('/upload/' + file.originalname);
    }
};