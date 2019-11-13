var express = require('express');
var router = express.Router();

var seat = require('./seat/seat');

/* GET home page. */
router.use('/seat',seat);


module.exports = router;
