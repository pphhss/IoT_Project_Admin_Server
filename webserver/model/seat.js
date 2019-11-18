var seat = require('../db/seat/seat');
var config = require('../config');
var device = require('../utils/device');

function publish_reserve(_seat_idx, _sheet_use_idx) {
    device.publish(config.publish.DEVICE_TOPIC + _seat_idx, { "type": config.publish.types.RESERVE, "data": _sheet_use_idx })
}

function publish_return(_sheet_idx) {
    device.publish(config.publish.DEVICE_TOPIC + _sheet_idx, { "type": config.publish.types.RETURN, "data": 0 })
}

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
                                seat.reserve([_data.sn, _seat_idx], function (_sheet_use_idx) { // 예약
                                    publish_reserve(_seat_idx, _sheet_use_idx)
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
    },
    return: function (_data, _callback) {
        seat.isReserve([_data.sn], function (_isReserve, _sheet_use_idx, _sheet_idx) {
            if (_isReserve)
                seat.return(_data.sn, function () {
                    publish_return(_sheet_idx);
                    _callback({ result: config.code.RESERVE_OK });
                });
            else
                _callback({ result: config.code.ALREADY_RESERVE });
        });
    }
};