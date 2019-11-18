import mqttAdapter as ma
import sensorManager as sm
import time
from config import types as TYPES, interval as INTERVAL
import threading


class Device():
    def __init__(self):
        self.__init()

    def __init(self):
        self.mqttAdater = ma.MQTTAdapter()
        self.sensormanager = sm.SensorManager()

        self.isStart = False
        self.__processing()
        self.__listen()

    def __processing(self):
        def sendData():
            while True:
                time.sleep(INTERVAL)
                if self.isStart:
                    power, sound = self.sensormanager.getData()
                    self.mqttAdater.sendData(self.sheet_use_idx, power, sound)
        t = threading.Thread(target=sendData)
        t.start()

    def __listen(self):
        while True:
            _type, _data = self.mqttAdater.getMessage()

            if _type == TYPES["RESERVE"]:
                self.sheet_use_idx = _data
                self.isStart = True
            elif _type == TYPES["RETURN"]:
                self.isStart = False


if __name__ == "__main__":
    dev = Device()
