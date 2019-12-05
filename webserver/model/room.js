var room = require('../db/room/room');

module.exports = {
    getRoomList: function (_data, _callback) {
        room.getRoomList(_data, function (_results) {
            _callback(_results);
        });
    },
    getRoomName: function (_data, _callback) {
        room.getRoomName(_data, function (_results) {
            _callback(_results.room_name);
        });
    },
    getRoomInfo: function (_data, _callback) {
        room.getRoomInfo(_data, function (_results) {
            _callback(_results);
        });
    },
    getRoomData: function (_data, _callback) {
        room.getRoomData(_data.room_idx, function (_results) {
            _callback(_results);
        });
    }
};