const express = require('express');
const router = express.Router();


//使用 control
const users = require('../control/user/user.server.control');

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});

router.get('/addArticle', function (req, res, next) {
    res.render('user/addArticle');
});
router.post('/addArticle', function (req, res, next) {
    console.log(req.body);
    users.addArticle(req.body);
    res.json({error: '0', message: '保存成功'});
});


router.get('/siteInfo', users.siteInfo);
router.post('/siteInfo', users.postSiteInfo);

module.exports = router;
