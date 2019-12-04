import mqtt
import room_config


class RoomMQTTAdater():
    def __init__(self):
        self.mqtt = mqtt.MQTT()
        pass

    def sendData(self, _room_idx, _temperature, _humidity):
        self.mqtt.publish(room_config.MQTT['topic_room_log'], {
                          "room_idx": _room_idx, "temperature": _temperature, "humidity": _humidity}, 1)
    
    def close(self):
        self.mqtt.disconnect()


if __name__ == '__main__':
    rma = RoomMQTTAdater()
    rma.sendData(1,20,30)
    rma.close()