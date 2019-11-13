var config = require('./config');

function getDate() {
    var moment = require('moment');
    require('moment-timezone');
    moment.tz.setDefault("Asia/Seoul");
    var date = moment().format("YYYY-MM-DD HH:mm:ss");
    return date;
}


module.exports = {
    converter: function (_event) {
        var power = _event.power;
        return [_event.sheet_use_idx, (power > config.power) ? 1 : 0,  _event.sound, getDate()]
    }
}