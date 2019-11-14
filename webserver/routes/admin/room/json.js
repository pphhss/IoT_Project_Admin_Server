var express = require('express');
var router = express.Router();

var room = require('../../../model/room');

/* GET home page. */
router.post('/getRoomList', function (_req, _res) {
    room.getRoomList(_req.body, function (_result) {
        _res.send(_result);
    })
});

router.post('/getRoomName', function (_req, _res) {
    room.getRoomName(_req.body, function (_result) {
        _res.send(_result);
    })
});

router.post('/getRoomInfo', function (_req, _res) {
    room.getRoomInfo(_req.body, function (_result) {
        _res.send(_result);
    });
});
module.exports = router;
