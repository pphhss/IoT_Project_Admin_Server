import mqttAdapter as ma
import sensorManager as sm
import time
from config import types as TYPES, interval as INTERVAL
import threading
import lcd
import rfidReader


class Device():
    def __init__(self):
        self.__init()

    def __init(self):
        self.mqttAdater = ma.MQTTAdapter()
        self.sensormanager = sm.SensorManager()
        self.lcd = lcd.lcd()

        self.isStart = False
        print("DEVICE START")
        self.__processing()
        self.__receiving()
        self.__rfid_listening()
        print("DEVICE PROCESSING..")
        self.__listen()

    def __rfid_act(self,_rfid_id):
        self.mqttAdater.sendRfidData(_rfid_id)
        
    def __rfid_listening(self):
        self.__rfid = rfidReader.RFID(self.__rfid_act)

    def __receiving(self):
        def receiving_data_callback(_dict):
            self.lcd.show(str(_dict['use'])+"% / "+str(_dict['sound']))
        def receiving_data():
            self.mqttAdater.subscribe_receiving(receiving_data_callback)
        t = threading.Thread(target=receiving_data)
        t.start()

    def __processing(self):
        def sendData():
            while True:
                time.sleep(INTERVAL)
                if self.isStart:
                    power, sound = self.sensormanager.getData()
                    self.mqttAdater.sendData(self.sheet_use_idx, power, sound)
                    print("[SEND DATA] to: "+str(self.sheet_use_idx) +
                          " <"+str(power)+" / "+str(sound)+">")
        t = threading.Thread(target=sendData)
        t.start()

    def __listen(self):
        while True:
            print("DEVICE LISTENING..")
            _type, _data = self.mqttAdater.getMessage()

            if _type == TYPES["RESERVE"]:
                self.sheet_use_idx = _data
                self.isStart = True
                print("[RESERVE] "+str(self.sheet_use_idx))
            elif _type == TYPES["RETURN"]:
                self.isStart = False
                print("[RETURN]")
                self.lcd.show('')


if __name__ == "__main__":
    dev = Device()
