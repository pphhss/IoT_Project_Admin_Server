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
    }
};