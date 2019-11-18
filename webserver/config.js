module.exports = {
    db: {
        host: "iot-db-instance.chxlgclnkisp.ap-northeast-2.rds.amazonaws.com",
        user: "admin",
        password: "dudghdudgh1!",
        database: "IOT",
        connectionLimit: 50,
        multipleStatements: true
    },
    code: {
        ALREADY_RESERVE: 400,
        RESERVE_OK: 200,
        SEAT_NOT_AVAILABLE: 401,
        NOT_EXIST: 500
    },
    awsIOT: {
        clientId: "WebServer",
        host: "apn185odp8mdk-ats.iot.ap-northeast-2.amazonaws.com"
    },
    publish: {
        DEVICE_TOPIC: "iot/device_",
        types: {
            RESERVE: 0,
            RETURN: 1
        },
    }
}