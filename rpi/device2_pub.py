import time
import random
import json
from AWSIoTPythonSDK.MQTTLib import *

host = 'apn185odp8mdk-ats.iot.ap-northeast-2.amazonaws.com'
rootCAPath = '/home/pi/Desktop/certificate/RootCA.crt'
certificatePath = '/home/pi/Desktop/certificate/c118d1f7e0-certificate.pem.crt'
privateKeyPath = '/home/pi/Desktop/certificate/c118d1f7e0-private.pem.key'
port = 8883
clientId = 'IoT_Device_2'
topic = 'iot/topic'
topic_Web_pub = 'Web_pub'

'''
myAWSIoTMQTTClient = None
myAWSIoTMQTTClient = AWSIoTMQTTClient(clientId)
myAWSIoTMQTTClient.configureCredentials(rootCAPath, privateKeyPath, certificatePath)

myAWSIoTMQTTClient.configureAutoReconnectBackoffTime(1, 32, 20)
myAWSIoTMQTTClient.configureOfflinePublishQueueing(-1)
myAWSIoTMQTTClient.configureDrainingFrequency(2)
myAWSIoTMQTTClient.configureConnectDisconnectTimeout(10)
myAWSIoTMQTTClient.configureMQTTOperationTimeout(5)

myAWSIoTMQTTClient.connect()


message = {"sheet_use" : 1, "power" : 10, "sound" : 10}
messageJson = json.dumps(message)
myAWSIoTMQTTClient.publish(topic, messageJson, 1)
'''
message = {"sheet_use_idx" : 1, "power" : 18, "sound" : 18}
messageJson = json.dumps(message)

myMQTTClient = AWSIoTMQTTClient(clientId)
myMQTTClient.configureEndpoint(host,port)
myMQTTClient.configureCredentials(rootCAPath,privateKeyPath,certificatePath)
myMQTTClient.configureOfflinePublishQueueing(-1)
myMQTTClient.configureDrainingFrequency(2)
myMQTTClient.configureConnectDisconnectTimeout(10)
myMQTTClient.configureMQTTOperationTimeout(5)
myMQTTClient.connect()
myMQTTClient.publish(topic, messageJson, 1)
myMQTTClient.subscribe(topic_Web_pub, 1, customCallback)
myMQTTClient.disconnect()
