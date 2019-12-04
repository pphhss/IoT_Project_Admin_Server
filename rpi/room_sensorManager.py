import ttt_hhh


class RoomSensorManager():
    def __init__(self):
        self.th_sensor = ttt_hhh.Temper_Hum()
        pass

    def getData(self):
        return self.th_sensor.getData()
