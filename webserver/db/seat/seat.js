var poolAdapter = require('../poolAdapter');


var db = {};

db.isReserve = function (_data, _callback) {
    var select = "SELECT * FROM sheet_use WHERE student_number=? AND start_time IS NOT NULL AND end_time IS NULL";

    poolAdapter.execute(select, _data, function (_results) {
        _callback(_results.length > 0);
    });
};

db.isExistSeat = function (_data, _callback) {
    var select = "SELECT idx ";
    var from = "FROM sheet ";
    var where = "WHERE sheet_number=? AND room_idx=?";

    poolAdapter.execute(select + from + where, _data, function (_results) {
        if (_results.length > 0)
            _callback(_results[0].idx)
        else
            _callback(null);
    });
};

db.isAvailableSeat = function (_data, _callback) {
    var select = "SELECT * ";
    var from = "FROM sheet_use ";
    var where = "WHERE sheet_idx=? AND start_time IS NOT NULL AND end_time IS NULL";

    poolAdapter.execute(select + from + where, _data, function (_results) {
        _callback(_results.length == 0);
    });
}

db.reserve = function (_data, _callback) {
    var insert = "INSERT INTO sheet_use(student_number,sheet_idx,start_time) ";
    var values = "VALUES(?,?,?)";
    var cur_datetime = require('../../utils/date')();
    poolAdapter.execute(insert + values, [_data[0], _data[1], cur_datetime], function (_results) {
        _callback(_results.insertId);
    });
};


module.exports = db;
