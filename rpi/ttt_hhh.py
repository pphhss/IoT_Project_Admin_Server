from time import sleep
import RPi.GPIO as GPIO
from pi_sht1x import SHT1x

DATA_PIN = 4
SCK_PIN = 23

class Temper_Hum():
    def getData(self):
        with SHT1x(DATA_PIN, SCK_PIN, gpio_mode=GPIO.BCM) as sensor:
            temp = sensor.read_temperature()
            humidity = sensor.read_humidity(temp)
            sensor.calculate_dew_point(temp, humidity)
            return temp,humidity



if __name__ == "__main__":
    Temper = Temper_Hum()
    print(Temper.getData())

