var express = require('express');
var router = express.Router();


//todo 这里应该使用 control 不建议直接使用model
var add = require('../model/db.server.model');

/* GET home page. */
router.get('/', function(req, res, next) {

  add.showList(10, function (arts) {
    res.render('index', {webName:'这是一个网站头部标题',list:arts});
  });

});

module.exports = router;
