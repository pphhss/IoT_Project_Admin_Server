var poolAdapter = require('../poolAdapter');

module.exports = {
    getRoomList: function (_data, _callback) {
        var select = "SELECT * FROM room";

        poolAdapter.execute(select, function (_results) {
            _callback(_results);
        });
    }
}