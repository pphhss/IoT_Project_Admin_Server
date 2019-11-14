var express = require('express');
var router = express.Router();

var seat = require('./seat/seat');
var room = require('./room/room');

/* GET home page. */
router.use('/room',room);


module.exports = router;
