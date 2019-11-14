var assert = require('assert');
var room = require('../model/room');
describe('room', function () {
    describe('getRoomList', function () {
        it('should get room list.', function (done) {
            room.getRoomList({
            }, function (_results) {
                console.log(_results);
                done();
            })
        });
    });
});