import React, { useState } from 'react';
import { Button, StyleSheet, View } from 'react-native';
import { BleManager } from 'react-native-ble-plx';
const BLTManager = new BleManager();

export default function connectBluetooth({ navigation }) {
  const [isConnected, setIsConnected] = useState(false);

  //What device is connected?
  const [connectedDevice, setConnectedDevice] = useState();

  const [message, setMessage] = useState('Connect');
  const [boxvalue, setBoxValue] = useState(false);

  // Scans availbale BLT Devices and then call connectDevice
  async function scanDevices() {
      console.log('scanning');
      // display the Activityindicator

      /*#define SERVICE_UUID        "d5e595ce-73ff-4de7-96bc-bd493ec47ffb"
      #define CHARACTERISTIC_UUID "beb5483e-36e1-4688-b7f5-ea07361b26a8"*/
      const uuid = "8222578E-0348-A7F6-9948-E98A6A550D05"
      const service_UUID =  "d5e595ce-73ff-4de7-96bc-bd493ec47ffb"
      const chara_UUID = "beb5483e-36e1-4688-b7f5-ea07361b26a8"

      BLTManager.startDeviceScan(null, null, (error, scannedDevice) => {
        
        if (error) {
          console.warn(error);
        }
        console.log(scannedDevice.id)
        if (scannedDevice.id == service_UUID || scannedDevice.id == chara_UUID || scannedDevice.id == uuid) {
          BLTManager.stopDeviceScan();
          console.log(scannedDevice)
          setMessage(message => "Disconnect")
          connectDevice(scannedDevice);

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