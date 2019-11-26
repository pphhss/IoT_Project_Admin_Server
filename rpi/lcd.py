import time
import Adafruit_CharLCD as LCD


class lcd():
    def __init__(self):
        lcd_rs = 25
        lcd_en = 24
        lcd_d4 = 23
        lcd_d5 = 17
        lcd_d6 = 18
        lcd_d7 = 22
        lcd_backlight = 2

        lcd_columns = 16

        self.lcd = LCD.Adafruit_CharLCD(lcd_rs, lcd_en, lcd_d4,
                                        lcd_d5, lcd_d6, lcd_d7, lcd_columns, lcd_backlight)

    def show(self, _message):
        self.lcd.clear()
        self.lcd.message(_message)
