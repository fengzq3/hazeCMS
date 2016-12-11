const express = require('express');
const router = express.Router();

//使用 control
const users = require('../../control/admin/user.server.control');

//use
router.use(users.checkLogin);

/* GET users listing. */
router.get('/', users.index);
router.get('/delTag/:id',users.delTag);
router.get('/articleList',users.articleList);
router.get('/changeTag/:tag_name',users.changeTag);

//ALL
router.all('/tagList', users.tagList);
router.all('/login', users.login);
router.all('/siteInfo', users.siteInfo);
router.all('/addArticle', users.addArticle);
router.all('/editArticle/:id',users.editArticle);

//POST
router.post('/editTag',users.editTag);



// router.get('/addArticle', function (req, res, next) {
//     res.render('admin/addArticle');
// });
// router.post('/addArticle', function (req, res, next) {
//     console.log(req.body);
//     users.addArticle(req.body);
//     res.json({error: '0', message: '保存成功'});
// });


module.exports = router;
