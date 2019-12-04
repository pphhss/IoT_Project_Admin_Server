var db = {}
var poolAdapter = require('./poolAdapter');
const DAY = 0
const HOUR = 1

function getDateFormatByType(_type) {
    if (_type == DAY)
        return "%Y-%m-%d"
    else if (_type == HOUR)
        return "%H:00"
}
db.getTimeData = function (_type, _callback) {
    var format = getDateFormatByType(_type);
    var query = "\
        SELECT total.*,real_use.real_use_count FROM \
            (SELECT DATE_FORMAT(time, '"+ format + "') t, COUNT(*) AS total_use_count FROM sheet_log GROUP BY t) AS total \
            LEFT JOIN \
            (SELECT DATE_FORMAT(time, '"+ format + "') t, COUNT(*) AS real_use_count FROM sheet_log WHERE use_sheet = 1 GROUP BY t) AS real_use \
            ON total.t = real_use.t "
    poolAdapter.execute(query, function (_results) {
        _callback(_results);
    });
};

db.getSoundData = function (_type, _callback) {
    var format = getDateFormatByType(_type);
    var query = "SELECT DATE_FORMAT(time,'" + format + "') t, AVG(sound) AS avg_sound FROM sheet_log GROUP BY t";

    poolAdapter.execute(query, function (_results) {
        _callback(_results);
    });
}

module.exports = db;