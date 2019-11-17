var express = require('express');
var router = express.Router();

var seat = require('../../../model/seat');

router.post('/reserve', function (_req, _res) {
    seat.reserve(_req.body, function (_result) {
        _res.send(_result);
    });
});

router.post('/return', function (_req, _res) {
    seat.return(_req.body, function (_result) {
        _res.send(_result);
    });
});
module.exports = router;
