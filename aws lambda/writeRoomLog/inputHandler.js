function getDate() {
    var moment = require('moment');
    require('moment-timezone');
    moment.tz.setDefault("Asia/Seoul");
    var date = moment().format("YYYY-MM-DD HH:mm:ss");
    return date;
}

function temperatureConverter(_tpt){
    return _tpt;
}

function humidityConverter(_hmt){
    return _hmt;
}


module.exports = {
    converter: function (_event) {
        var temperature = temperatureConverter(_event.temperature);
        var humidity = humidityConverter(_event.humidity);
        return [_event.room_idx,getDate(), temperature,  humidity]
    }
}