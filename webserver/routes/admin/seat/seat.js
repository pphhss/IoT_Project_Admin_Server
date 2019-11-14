var express = require('express');
var router = express.Router();

var action = require('./action');

/* GET home page. */
router.use('/action',action);


module.exports = router;
