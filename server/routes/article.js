var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
  res.send('article home page');
});

router.get('/:id', function (req, res, next) {

  res.render('article',{title:'文章首页'+req.params.id ,content:'文章内容内容内容内容'});
});

module.exports = router;
