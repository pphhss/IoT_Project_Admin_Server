import json
from AWSIoTPythonSDK.MQTTLib import *
import config

mqttConfig = config.MQTT


class MQTT():
    def __init__(self):
        self.client = AWSIoTMQTTClient(mqttConfig['clientId'])
        self.client.configureEndpoint(mqttConfig['host'], mqttConfig['port'])
        self.client.configureCredentials(
            mqttConfig['rootCAPath'], mqttConfig['privateKeyPath'], mqttConfig['certificatePath'])
        self.client.configureOfflinePublishQueueing(-1)
        self.client.configureDrainingFrequency(2)
        self.client.configureConnectDisconnectTimeout(10)
        self.client.configureMQTTOperationTimeout(5)

        if not self.client.connect():
            print("MQTT CONNECT ERROR")

    def disconnect(self):
        self.client.disconnect()

    def publish(self, topic, message, qos):
        self.client.publish(topic, json.dumps(message), qos)

    def subscribe(self, topic, qos, callback):
        def __callback(client, userdata, message):
            callback(json.loads(message.payload))
        self.client.subscribe(topic, qos, __callback)


if __name__ == "__main__":
    test = MQTT()
    # test.publish(mqttConfig['topic_sheet_log'],
    #            {"sheet_use_idx": 10, "power": 18, "sound": 18}, 1)

    def testCallback(_res):
        print("testCallback : "+_res['message'])

    test.subscribe("test/test", 1, testCallback)
    for i in range(20000000):
        pass
    test.disconnect()