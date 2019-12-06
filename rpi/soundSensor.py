import analogSensor
import threading
import time


class SoundSensor(analogSensor.AnalogSensor):
    def __init__(self):
        super().__init__()

    def setChannel(self, _channel):
        super().setChannel(_channel)
        self.__sum_sound = 0
        self.__num_sound = 0
        self.__lock = threading.Lock()
        self.__thread = threading.Thread(target=self.calculateData)
        self.__thread.start()

    def calculateData(self):
        while True:
            time.sleep(0.05)
            data = super().getData()
            self.__lock.acquire()
            self.__sum_sound += data
            self.__num_sound += 1
            self.__lock.release()

    def getData(self):
        ret = 0
        self.__lock.acquire()
        ret = self.__sum_sound / self.__num_sound
        self.__sum_sound = 0
        self.__num_sound = 0
        self.__lock.release()
        return ret


if __name__ == '__main__':
    ss = SoundSensor()
    ss.setChannel(0)
    while True:
        time.sleep(5)
        print(ss.getData())
