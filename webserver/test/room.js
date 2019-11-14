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
    describe('getRoomName', function () {
        it('should get room name', function (done) {
            room.getRoomName({
                idx: 1
            }, function (_results) {
                console.log(_results);
                done();
            });
        });
    });
    describe.only('getRoomInfo', function () {
        it('should get room info', function (done) {
            room.getRoomInfo({
                idx: 1
            }, function (_results) {
                console.log(_results);
                done();
            });
        });
    });
});
