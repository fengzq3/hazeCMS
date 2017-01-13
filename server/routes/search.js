/**
 * Created by feng on 2017/1/12.
 */
const express = require('express');
const router = express.Router();

const search = require('../control/search.server.control');

router.post('/', search.formCommit);
router.get('/:keyword', search.index);

module.exports = router;