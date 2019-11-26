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
        print("DEVICE START")
        self.__processing()
        self.__receiving()
        print("DEVICE PROCESSING..")
        self.__listen()

    def __receiving(self):
        def receiving_data_callback(_dict):
            print(_dict)
        def receiving_data():
            self.mqttAdater.subscribe_receiving(receiving_data_callback)
        t = threading.Thread(target=receiving_data)
        t.start()
        pass

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


if __name__ == "__main__":
    dev = Device()
