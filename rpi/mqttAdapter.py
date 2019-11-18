import mqtt
import config


class MQTTAdapter():
    def __init__(self, _messageCallback):
        self.mqtt = mqtt.MQTT()
        self.__messageCallback = _messageCallback
        self.__init()

    def __init(self):
        def __callback(_dict):
            # type : true/false // idx : integer
            self.__onMessage(_dict['type'], _dict['idx'])
        self.mqtt.subscribe(config.MQTT['topic_device'], 1, __callback)

    def __onMessage(self, _type, _idx):
        self.__messageCallback(_type, _idx)

    def close(self):
        self.mqtt.disconnect()

    def sendData(self, _idx, _power, _sound):
        # 데이터 포맷맞추기 필요.
        self.mqtt.publish(config.MQTT['topic_sheet_log'], {
                          "sheet_use_idx": _idx, "power": _power, "sound": _sound}, 1)


if __name__ == "__main__":
    '''
    def testCallback(_type, _idx):
        print("type : "+str(_type)+" idx : "+str(_idx))
    ma = MQTTAdapter(testCallback)
    for i in range(20000000):
        pass

    ma.close()
    '''

    def testCallback(_type, _idx):
        print("type : "+str(_type)+" idx : "+str(_idx))
    ma = MQTTAdapter(testCallback)

    ma.sendData(10, 51, 50)
    ma.close()
