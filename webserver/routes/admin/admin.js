var express = require('express');
var router = express.Router();

var seat = require('./seat/seat');
var room = require('./room/room');

/* GET home page. */
router.use('/room',room);
router.use('/seat',seat);

module.exports = router;
