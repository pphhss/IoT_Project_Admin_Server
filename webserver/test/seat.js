var assert = require('assert');
var seat = require('../model/seat');
describe('seat', function () {
    describe.only('reserve', function () {
        it('should reserver', function (done) {
            seat.reserve({
                sn: 201320966,
                seat_number: 2,
                room_idx: 1,
            }, function (_results) {
                console.log(_results);
                done();
            })
        });
    });

});
