/**
 * Created by feng on 2016/12/19.
 */
const express = require('express');
const router = express.Router();

const tags = require('../control/tags.server.control');

router.get('/:name', tags.item);

//与tags有关的 router 存放在这里

module.exports = router;