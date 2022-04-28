import React, { useState } from 'react';
import { Button, StyleSheet, View } from 'react-native';
import base64 from 'react-native-base64';
import { BleManager } from 'react-native-ble-plx';
var Buffer = require('buffer/').Buffer
//let wav = require('node-wav');

const BLTManager = new BleManager();

export default function connectBluetooth({ navigation }) {
  const [isConnected, setIsConnected] = useState(false);
  //What device is connected?
  const [connectedDevice, setConnectedDevice] = useState();

  const [message, setMessage] = useState('Connect');
  const [boxvalue, setBoxValue] = useState(false);

  const [audioData, addAudioData] = useState([]);

  // Scans availbale BLT Devices and then call connectDevice
  async function readDeviceData(device, service, characteristic) {
    interval = setInterval(() => {
      device.readCharacteristicForService(service, characteristic)
      .then((data) => {
          //console.log(data.value)
          decoded = base64.decode(data.value);
          //addAudioData(oldArray => [...oldArray,decoded] );
          console.log(decoded)
        })
        .catch((error) => {
          // Failure code
          console.log(error);
      });
      

    }, 1000);
    //console.log(wav.encode(audioData));

  }


  async function scanDevices() {
      console.log('scanning');
      // display the Activityindicator

      /*#define SERVICE_UUID        "d5e595ce-73ff-4de7-96bc-bd493ec47ffb"
      #define CHARACTERISTIC_UUID "beb5483e-36e1-4688-b7f5-ea07361b26a8"*/

      const uuid = "687CC3FB-053F-01D7-54A6-CB66EF52CFB8"
      const service_UUID =  "d5e595ce-73ff-4de7-96bc-bd493ec47ffb"
      const chara_UUID = "beb5483e-36e1-4688-b7f5-ea07361b26a8"

      BLTManager.startDeviceScan(null, null, (error, scannedDevice) => {
        
        if (error) {
          console.warn(error);
        }
        console.log(scannedDevice.id)
        if (scannedDevice.id == uuid) {
          BLTManager.stopDeviceScan();
          //console.log(scannedDevice)
          setMessage(message => "Disconnect")
          setConnectedDevice(scannedDevice);
          console.log("device found bitch")
          setTimeout(() => {
            BLTManager.connectToDevice(uuid)
              .then((device) => {
                
                setTimeout(() => {
                  device.discoverAllServicesAndCharacteristics()
                  .then(() => {
                    readDeviceData(device, service_UUID, chara_UUID);
                  })
                  .catch((error) => {
                    // Failure code
                    console.log(error);
                  });
                  
                }, 1000);
                  
              
              })
              .catch((error) => {
                // Failure code
                console.log(error);
              });

          }, 500);
        }
      });

      // stop scanning devices after 5 seconds
      setTimeout(() => {
        BLTManager.stopDeviceScan();
      }, 5000);

  }



    return (
      <View style={styles.container}>
          <Button
              title={message}
              onPress={() => {
                scanDevices();
              }}
              disabled={false}
            />
      </View>
    )
  }
  
  const styles = StyleSheet.create({
    container: {
      height: "100%",
      width:"100%",
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#32a852',
    }
  });

  /*
BLTManager.readCharacteristicForDevice(uuid, service_UUID, chara_UUID)
              .then((readData) => {
                // Success code
                console.log("Read: " + readData);
            
                //const buffer = Buffer.Buffer.from(readData); //https://github.com/feross/buffer#convert-arraybuffer-to-buffer
                //const sensorData = buffer.readUInt8(1, true);
                //console.log("Read: " + sensorData);
              })
              .catch((error) => {
                // Failure code
                console.log(error);
              });







  import React from 'react';
import { Button, StyleSheet, View } from 'react-native';
import { BleManager } from 'react-native-ble-plx';
const BLTManager = new BleManager();

export default function connectBluetooth({ navigation }) {
    
    //Is a device connected?
  const [isConnected, setIsConnected] = useState(false);

  //What device is connected?
  const [connectedDevice, setConnectedDevice] = useState();

  const [message, setMessage] = useState('Nothing Yet');
  const [boxvalue, setBoxValue] = useState(false);

  // Scans availbale BLT Devices and then call connectDevice
  async function scanDevices() {
    PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'Permission Localisation Bluetooth',
        message: 'Requirement for Bluetooth',
        buttonNeutral: 'Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    ).then(answere => {
      console.log('scanning');
      // display the Activityindicator

      BLTManager.startDeviceScan(null, null, (error, scannedDevice) => {
        if (error) {
          console.warn(error);
        }

        if (scannedDevice && scannedDevice.name == 'BLEExample') {
          BLTManager.stopDeviceScan();
          connectDevice(scannedDevice);
        }
      });

      // stop scanning devices after 5 seconds
      setTimeout(() => {
        BLTManager.stopDeviceScan();
      }, 5000);
    });
  }

  // handle the device disconnection (poorly)
  async function disconnectDevice() {
    console.log('Disconnecting start');

    if (connectedDevice != null) {
      const isDeviceConnected = await connectedDevice.isConnected();
      if (isDeviceConnected) {
        BLTManager.cancelTransaction('messagetransaction');
        BLTManager.cancelTransaction('nightmodetransaction');

        BLTManager.cancelDeviceConnection(connectedDevice.id).then(() =>
          console.log('DC completed'),
        );
      }

      const connectionStatus = await connectedDevice.isConnected();
      if (!connectionStatus) {
        setIsConnected(false);
      }
    }
  }

  //Function to send data to ESP32
  async function sendBoxValue(value) {
    BLTManager.writeCharacteristicWithResponseForDevice(
      connectedDevice?.id,
      SERVICE_UUID,
      BOX_UUID,
      base64.encode(value.toString()),
    ).then(characteristic => {
      console.log('Boxvalue changed to :', base64.decode(characteristic.value));
    });
  }
  //Connect the device and start monitoring characteristics
  async function connectDevice(device) {
    console.log('connecting to Device:', device.name);

    device
      .connect()
      .then(device => {
        setConnectedDevice(device);
        setIsConnected(true);
        return device.discoverAllServicesAndCharacteristics();
      })
      .then(device => {
        //  Set what to do when DC is detected
        BLTManager.onDeviceDisconnected(device.id, (error, device) => {
          console.log('Device DC');
          setIsConnected(false);
        });

        //Read inital values

        //Message
        device
          .readCharacteristicForService(SERVICE_UUID, MESSAGE_UUID)
          .then(valenc => {
            setMessage(base64.decode(valenc?.value));
          });

        //BoxValue
        device
          .readCharacteristicForService(SERVICE_UUID, BOX_UUID)
          .then(valenc => {
            setBoxValue(StringToBool(base64.decode(valenc?.value)));
          });

        //monitor values and tell what to do when receiving an update

        //Message
        device.monitorCharacteristicForService(
          SERVICE_UUID,
          MESSAGE_UUID,
          (error, characteristic) => {
            if (characteristic?.value != null) {
              setMessage(base64.decode(characteristic?.value));
              console.log(
                'Message update received: ',
                base64.decode(characteristic?.value),
              );
            }
          },
          'messagetransaction',
        );

        //BoxValue
        device.monitorCharacteristicForService(
          SERVICE_UUID,
          BOX_UUID,
          (error, characteristic) => {
            if (characteristic?.value != null) {
              setBoxValue(StringToBool(base64.decode(characteristic?.value)));
              console.log(
                'Box Value update received: ',
                base64.decode(characteristic?.value),
              );
            }
          },
          'boxtransaction',
        );

        console.log('Connection established');
      });
  }

    return (
      <View style={styles.container}>
          <Button
              title="Connect"
              onPress={() => {
                scanDevices();
              }}
              disabled={false}
            />
      </View>
    )
  }
  
  const styles = StyleSheet.create({
    container: {
      height: "80%",
      width:"80%",
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#ecf0f1',
      padding: 8,
    }
  }); */