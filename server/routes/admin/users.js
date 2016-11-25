const express = require('express');
const router = express.Router();

//使用 control
const users = require('../../control/admin/user.server.control');

/* GET users listing. */
router.use(users.checkLogin);

router.get('/',users.index);
router.all('/login',users.login);
router.all('/siteInfo',users.siteInfo);


// router.get('/addArticle', function (req, res, next) {
//     res.render('admin/addArticle');
// });
// router.post('/addArticle', function (req, res, next) {
//     console.log(req.body);
//     users.addArticle(req.body);
//     res.json({error: '0', message: '保存成功'});
// });



module.exports = router;
