var express = require('express');
var router = express.Router();

var page = require('./page');
var json = require('./json');
/* GET home page. */
router.use(page);
router.use('/json', json);


module.exports = router;
