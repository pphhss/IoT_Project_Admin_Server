CREATE DATABASE IOT DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;

use IOT;

CREATE TABLE room(
    idx int(10) not null auto_increment COMMENT '열람실 idx',
    room_name varchar(10) not null COMMENT '열람실 이름 ex) D1',
    PRIMARY KEY(idx)
) COMMENT '열람실 테이블';

CREATE TABLE sheet(
    idx int(10) not null auto_increment COMMENT '좌석 idx',
    sheet_number int(10) not null COMMENT '좌석 번호',
    room_idx varchar(10) not null COMMENT '열람실 idx',
    PRIMARY KEY(idx),
    FOREIGN KEY(sheet_number) REFERENCES room(idx)
) COMMENT '좌석 테이블';

CREATE TABLE sheet_use(
    idx int(10) not null auto_increment COMMENT '좌석사용기록 idx',
    sheet_idx int(10) not null COMMENT '좌석 idx',
    student_number int(10) not null COMMENT '좌석 사용자 학번',
    start_time datetime COMMENT '사용 시작시간',
    end_time datetime COMMENT '사용 종료시간',
    PRIMARY KEY(idx),
    FOREIGN KEY(sheet_idx) REFERENCES sheet(idx)
) COMMENT '좌석 사용 기록 테이블';

CREATE TABLE sheet_log(
    idx int(10) not null auto_increment COMMENT '좌석 센서 로그 idx',
    sheet_use_idx int(10) not null COMMENT 'sheet_use idx',
    use_sheet int(1) COMMENT '사용 여부 - 0:사용안함 / 1:사용함',
    sound float(10,10) COMMENT '소음 정도',
    time datetime COMMENT '좌석 센서 기록 시간',
    PRIMARY KEY(idx),
    FOREIGN KEY(sheet_use_idx) REFERENCES sheet_use(idx)
) COMMENT '좌석 센서 로그 테이블';

CREATE TABLE room_log(
    room_idx int(10) not null COMMENT '열람실 센서 기록 idx',
    time datetime not null COMMENT '열람실 센서 기록 시간',
    temperature int(10) not null COMMENT '열람실 온도',
    humidity int(10) not null COMMENT '열람실 습도 ',
    PRIMARY KEY(room_idx, time),
    FOREIGN KEY(room_idx) REFERENCES room(idx)
) COMMENT '열람실 센서 기록 테이블';

CREATE TABLE rfid_student(
    student_number int(10) not null COMMENT '좌석 사용자 학번',
    rfid_id bigint not null COMMENT 'RFID id 번호'
) COMMENT 'RFID 카드-학번 테이블'

INSERT INTO room(room_name) VALUES('C1');
INSERT INTO room(room_name) VALUES('D1');

INSERT INTO sheet(sheet_number,room_idx) VALUES(1,1);
INSERT INTO sheet(sheet_number,room_idx) VALUES(2,1);

INSERT INTO sheet_use(sheet_idx,student_number,start_time) VALUES(1,201320965,"2019-11-13 18:35");

