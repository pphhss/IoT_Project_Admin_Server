var seat = require('../db/seat/seat');
var config = require('../config');
var device = require('../utils/device');

function publish_reserve(_seat_idx, _sheet_use_idx) {
    device.publish(config.publish.DEVICE_TOPIC + _seat_idx, { "type": config.publish.types.RESERVE, "data": _sheet_use_idx })
}

function publish_return(_sheet_idx) {
    device.publish(config.publish.DEVICE_TOPIC + _sheet_idx, { "type": config.publish.types.RETURN, "data": 0 })
}

function check_forcedReturn(_seat_data) {
    if (_seat_data.cnt > config.forcedReturn_cnt && _seat_data.avg_use_sheet < config.forcedReturn_avg) {
        seat.getSnFromSheetUseIdx(_seat_data.sheet_use_idx, function (_sn) {
            model.return({ sn: _sn }, function () { });
        });
        return true;
    }
    return false;
}

var model = {
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
    },
    publish_seat: function () {
        setInterval(function () {
            seat.getAllSeat(function (_results) {
                for (var i = 0; i < _results.length; i++) {
                    var seat_data = _results[i]
                    if (check_forcedReturn(seat_data))
                        continue;
                    var data = {}
                    data.use = (seat_data.avg_use_sheet == null) ? 0 : Math.floor(seat_data.avg_use_sheet * 100)
                    data.sound = (seat_data.avg_sound == null) ? 0 : Math.floor(seat_data.avg_sound * 100) / 100
                    device.publish(config.publish.DEVICE_DATA_TOPIC + seat_data.sheet_idx, data, function () { });
                }
            });
        }, config.publish.PUBLISH_SEAT_INTERVAL)
    },
    rfid_callback: function (_message) {
        seat.getSn(_message.rfid_id, function (_sn) {
            seat.isReserve([_sn], function (_isReserve) {
                if (_isReserve)
                    model.return({ sn: _sn }, function () { });
                else
                    seat.reserve([_sn, _message.sheet_idx], function (_sheet_use_idx) { // 예약
                        publish_reserve(_message.sheet_idx, _sheet_use_idx)
                    });
            });
        });
    }
};

module.exports = model;