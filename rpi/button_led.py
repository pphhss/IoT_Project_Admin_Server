import config
import time
import RPi.GPIO as gpio
import sys
import threading


class Button_LED():
    def __init__(self):
        self.sensor_Button = 2
        self.sensor_LED = 21
        gpio.setmode(gpio.BCM)
        gpio.setup(self.sensor_Button, gpio.IN)
        gpio.setup(self.sensor_LED, gpio.OUT)
        self.__isSeat = False
        self.__isDown = False
        self.__on = 0

        self.__start()
        pass

    def setSeat(self, _power):
        self.__isSeat = config.seat_power < _power

    def __start(self):
        def control_led():
            while True:
                Button = gpio.input(self.sensor_Button)
                if self.__isSeat:
                    if Button == 0:
                        if not self.__isDown:
                            if (self.__on == 0):
                                gpio.output(self.sensor_LED, True)
                                self.__on = 1
                            elif (self.__on == 1):
                                gpio.output(self.sensor_LED, False)
                                self.__on = 0
                        self.__isDown = True
                    else:
                        self.__isDown = False
                else:
                    gpio.output(self.sensor_LED, False)
                time.sleep(0.1)
        self.__thread = threading.Thread(target=control_led)
        self.__thread.start()
        pass
