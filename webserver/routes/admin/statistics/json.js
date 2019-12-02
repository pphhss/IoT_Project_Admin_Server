var express = require('express');
var router = express.Router();
var statistics = require('../../../model/statistics');
/* GET home page. */
router.post('/getTimeData', function (_req, _res) {
    statistics.getTimeData(_req.body, function (_result) {
        _res.send(_result);
    });
});

router.post('/getSoundData', function (_req, _res) {
    statistics.getSoundData(_req.body, function (_result) {
        _res.send(_result);
    });
});


module.exports = router;
