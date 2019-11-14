var seat = require('../db/seat/seat');
var config = require('../config');

module.exports = {
    reserve: function (_data, _callback) {
        seat.isReserve([_data.sn], function (_isReserve) { // 이미 좌석을 예약중인지

            if (_isReserve)
                _callback({ result: config.code.ALREADY_RESERVE });
            else {
                seat.isExistSeat([_data.seat_number, _data.room_idx], function (_seat_idx) { // 실제 좌석이 존재하는지
                    if (_seat_idx) {
                        seat.isAvailableSeat([_seat_idx], function (_isAvailable) { // 그 좌석이 이용이 가능한지.
                            if (_isAvailable)
                                seat.reserve([_data.sn, _seat_idx], function () { // 예약
                                    _callback({ result: config.code.RESERVE_OK });
                                });
                            else
                                _callback({ result: config.code.SEAT_NOT_AVAILABLE });
                        });
                    } else
                        _callback({ result: config.code.NOT_EXIST });
                });
            }
        });
    }
};