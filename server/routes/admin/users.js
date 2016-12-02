const express = require('express');
const router = express.Router();

//使用 control
const users = require('../../control/admin/user.server.control');

//use
router.use(users.checkLogin);

/* GET users listing. */
router.get('/', users.index);
router.get('/tagList', users.tagList);

//ALL
router.all('/login', users.login);
router.all('/siteInfo', users.siteInfo);
router.all('/addArticle', users.addArticle);

//POST


// router.get('/addArticle', function (req, res, next) {
//     res.render('admin/addArticle');
// });
// router.post('/addArticle', function (req, res, next) {
//     console.log(req.body);
//     users.addArticle(req.body);
//     res.json({error: '0', message: '保存成功'});
// });


module.exports = router;
