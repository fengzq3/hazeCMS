const express = require('express');
const router = express.Router();

const articleCtl = require('../control/article.server.control');

router.get('/:id', articleCtl.articleDetail);
router.post('/prevNext', articleCtl.prevNext);

//与文章有关的 router 存放在这里

module.exports = router;
