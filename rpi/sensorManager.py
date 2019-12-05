import sensor
import analogSensor
import time
import soundSensor

class SensorManager():
    def __init__(self):
        self.__powerSensors = [analogSensor.AnalogSensor()]
        self.__powerSensorInitialize()
        self.__soundSensor = soundSensor.SoundSensor()
        self.__soundSensor.setChannel(1)

    def __powerSensorInitialize(self):
        self.__powerSensors[0].setChannel(0)

    def getData(self):
        return self.__powerSensors[0].getData(), self.__soundSensor.getData()


if __name__ == "__main__":
    sm = SensorManager()
    while True:
        time.sleep(1)
        print(sm.getData())
