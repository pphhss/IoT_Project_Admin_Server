var express = require('express');
var router = express.Router();

var seat = require('./seat/seat');
var room = require('./room/room');
var statistics = require('./statistics/statistics');

/* GET home page. */
router.use('/room',room);
router.use('/seat',seat);
router.use('/statistics',statistics);

module.exports = router;
