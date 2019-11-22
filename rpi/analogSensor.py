import sensor
import spidev, time

class AnalogSensor(sensor.Sensor):
    def __init__(self):
        sensor.Sensor.__init__(self)
        self.__spiDevManager = SpiDevManager().instance()

    def setChannel(self,_channel):
        self.__channel = _channel

    def getData(self):
        return self.__spiDevManager.getAnalogData(self.__channel)


class SpiDevManager():
    __instance = None

    @classmethod
    def __getInstance(cls):
        return cls.__instance

    @classmethod
    def instance(cls):
        cls.__instance = cls()
        cls.instance = cls.__getInstance
        cls.__instance.initSpi()
        return cls.__instance

    def initSpi(self):
        self.spi = spidev.SpiDev()
        self.spi.open(0, 0)
        self.spi.max_speed_hz = 1350000

    def getAnalogData(self, _channel):
        r = self.spi.xfer2([1, (8 + _channel) << 4,0])
        adc_out = ((r[1]&3) << 8) + r[2]
        return adc_out


if __name__ == "__main__":
    ase = AnalogSensor()
    ase.setChannel(0)
    while True:
        time.sleep(1)
        print(ase.getData())
