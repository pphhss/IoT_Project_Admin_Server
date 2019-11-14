var express = require('express');
var router = express.Router();

var page = require('./page');

/* GET home page. */
router.use(page);


module.exports = router;
