/**
 * Created by feng on 2016/12/21.
 */
const express = require('express');
const router = express.Router();
const config = require('../../config');
const path = require('path');
const multer = require('multer');
const upload = multer({dest: path.join(config.root, '/public/tmp')});

const files = require('../../control/admin/file.server.control');

//check
router.use(files.checkLogin);

//file POST
router.post('/singleFile', upload.single('wangEditorH5File'), files.singleFile);
//主图上传地址
router.post('/topPicFile', upload.single('file'), files.topPicFile);

module.exports = router;