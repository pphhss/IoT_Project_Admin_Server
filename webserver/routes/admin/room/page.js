var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('admin/room/roomList');
});

router.get('/roomInfo', function (_req, _res) {
  _res.render('admin/room/roomInfo');
});

module.exports = router;
