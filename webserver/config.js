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
        NOT_EXIST:500
    }
}