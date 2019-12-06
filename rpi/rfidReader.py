import serial
import threading


class RFID():
    def __init__(self, _callback):
        self.__thread = threading.Thread(target=self.__listening)
        self.__ser = serial.Serial('/dev/ttyACM0', 9600)
        self.__callback = _callback
        self.__thread.start()

    def __listening(self):
        while True:
            read_serial = self.__ser.readline()
            self.__callback(int(read_serial))


if __name__ == '__main__':
    def rfid_act(_rfid_id):
        print(_rfid_id)
    rfid = RFID(rfid_act)

    while True:
        pass
