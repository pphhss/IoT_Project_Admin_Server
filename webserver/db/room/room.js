var poolAdapter = require('../poolAdapter');

module.exports = {
    getRoomList: function (_data, _callback) {
        var select =
            "SELECT room.idx,room.room_name, numbering.cur_number, numbering.total_number FROM \
                (SELECT total.room_idx, cur.cur_number, total.total_number \
                FROM \
                    (SELECT room_idx, count(room_idx) AS cur_number \
                        FROM(SELECT sheet_idx FROM sheet_use WHERE start_time IS NOT NULL AND end_time IS NULL) AS cur_sheet \
                        INNER JOIN sheet \
                        ON cur_sheet.sheet_idx = sheet.idx) AS cur \
                RIGHT JOIN \
                    (SELECT room_idx, count(room_idx) AS total_number \
                        FROM sheet ) AS total \
                ON cur.room_idx = total.room_idx) AS numbering \
            RIGHT JOIN room \
            ON numbering.room_idx = room.idx\
            ";
        poolAdapter.execute(select, function (_results) {
            _callback(_results);
        });
    },
    getRoomName: function (_data, _callback) {
        var select =
            "\
            SELECT * \
            FROM room \
            ";
        var where = "WHERE idx=?";

        poolAdapter.execute(select + where, [_data.idx], function (_results) {
            _callback(_results[0]);
        });
    },
    getRoomInfo: function (_data, _callback) {
        var select =
            "\
        SELECT total_sheet.idx, total_sheet.sheet_number, cur_sheet.student_number \
        FROM \
            (SELECT * FROM sheet WHERE sheet.room_idx=?) AS total_sheet \
        LEFT JOIN \
            (SELECT * FROM sheet_use AS su \
                WHERE su.sheet_idx IN (SELECT idx FROM sheet WHERE room_idx=?) AND su.start_time IS NOT NULL AND su.end_time IS NULL) AS cur_sheet \
        ON total_sheet.idx = cur_sheet.sheet_idx \
        ";

        poolAdapter.execute(select, [_data.idx, _data.idx], function (_results) {
            _callback(_results);
        });
    }
}