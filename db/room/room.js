var poolAdapter = require('../poolAdapter');

module.exports = {
    getRoomList: function (_data, _callback) {
        //var select = "SELECT * FROM room";
        var select =
            "SELECT room.idx,room.room_name, numbering.cur_number, numbering.total_number FROM \
                (SELECT cur.room_idx, cur.cur_number, total.total_number \
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

    getRoomNumber: function (_data, _callback) {
        var select =
            "SELECT room.idx, numbering.cur_number, numbering.total_number FROM \
                (SELECT cur.room_idx, cur.cur_number, total.total_number \
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
        poolAdapter(select, function (_results) {
            _callback(_results);
        });
    }
}