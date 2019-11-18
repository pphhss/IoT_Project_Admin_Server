index = 1

interval = 5

types = {
    "RESERVE": 0,
    "RETURN": 1
}

MQTT = {
    "host": 'apn185odp8mdk-ats.iot.ap-northeast-2.amazonaws.com',
    "rootCAPath": './certs/RootCA.crt',
    "certificatePath": './certs/c118d1f7e0-certificate.pem.crt',
    "privateKeyPath": './certs/c118d1f7e0-private.pem.key',
    "port": 8883,
    "clientId": 'IoT_Device_2',
    'topic_sheet_log': 'iot/topic',
    'topic_device': 'iot/device_'+str(index)}
