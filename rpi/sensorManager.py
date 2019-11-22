import sensor, analogSensor, time

class SensorManager():
    def __init__(self):
        self.__powerSensors = [analogSensor.AnalogSensor()]
        self.__powerSensorInitialize()

    def __powerSensorInitialize(self):
        self.__powerSensors[0].setChannel(0)

    def getData(self):
        return self.__powerSensors[0].getData(), 50


if __name__ == "__main__":
    sm = SensorManager()
    while True:
        time.sleep(1)
        print(sm.getData())

