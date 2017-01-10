"use strict";
const express = require('express');
const router = express.Router();

//使用 control
const index = require('../control/index.server.control.js');

/* GET home page. */
router.get('/', index.index);

module.exports = router;
