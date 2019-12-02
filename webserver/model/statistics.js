var model = {}
var db = require('../db/statistics');

model.getTimeData = function (_data, _callback) {
    db.getTimeData(_data.type, function (_results) {
        _callback(_results);
    });
};

model.getSoundData = function (_data, _callback) {
    db.getSoundData(_data.type, function (_results) {
        _callback(_results);
    });
}

module.exports = model