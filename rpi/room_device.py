import sys
import room_mqttAdapter
import room_sensorManager
import room_config
import time


class RoomDevice():
    def __init__(self):
        self.mqttAdater = room_mqttAdapter.RoomMQTTAdater()
        self.sensorManager = room_sensorManager.RoomSensorManager()
        print("START")
        self.__start()
        pass

    def __start(self):
        while True:
            time.sleep(5)
            temperature, humidity = self.sensorManager.getData()
            self.mqttAdater.sendData(
                room_config.room_idx, temperature, humidity)
            print("SEND DATA - "+str(room_config.room_idx) +
                  " ("+str(temperature)+","+str(humidity)+")")


if __name__ == '__main__':
    device = RoomDevice()
    