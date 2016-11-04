var express = require('express');
var router = express.Router();


//todo 这里应该使用 control 不建议直接使用model
var add = require('../model/db.server.model');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/addArticle', function (req, res, next) {
  res.render('user/addArticle');
});
router.post('/addArticle', function (req, res, next) {
  console.log(req.body);
  add.addArticle(req.body);
  res.json({error:'0',message:'保存成功'});
});

module.exports = router;
