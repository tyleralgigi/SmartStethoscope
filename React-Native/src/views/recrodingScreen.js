import { Audio } from 'expo-av';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { RNS3 } from 'react-native-aws3';
import { get, getDatabase, ref, push } from 'firebase/database';
import firebase from 'firebase/compat';

require('dotenv').config();


const config = {
  keyPrefix: 's3/', // Ex. myuploads/
  bucket: process.env.bucket, // Ex. aboutreact
  region: 'us-east-1', // Ex. ap-south-1
  accessKey: process.env.accessKey,
  // Ex. AKIH73GS7S7C53M46OQ
  secretKey:  process.env.secretKey,
  // Ex. Pt/2hdyro977ejd/h2u8n939nh89nfdnf8hd8f8fd
  successActionStatus: 201,
}


export default function recordingScreen({ navigation }) {
  const [recording, setRecording] = React.useState();
  const db = getDatabase();
  const user = firebase.auth().currentUser;

  async function startRecording() {
    try {
      console.log('Requesting permissions..');
      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      }); 
      console.log('Starting recording..');
      const { recording } = await Audio.Recording.createAsync(
         Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
      );
      setRecording(recording);
      console.log('Recording started');
    } catch (err) {
      console.error('Failed to start recording', err);
    }
  }

  async function stopRecording() {
    
    console.log('Stopping recording..');
    setRecording(undefined);
    await recording.stopAndUnloadAsync();
    const uri = recording.getURI(); 
    const file = {
      // `uri` can also be a file system path (i.e. file://)
      uri: uri,
      name: "audio1.mp3",
      type: "audio/mp3"
    }
    console.log('Recording stopped and stored at', uri);
    RNS3.put(file, config).then(response => {
      if (response.status !== 201)
        throw new Error("Failed to upload image to S3");
        const test = ref(db, 'users/' + user.uid + '/recordings');
        console.log(response.body["postResponse"]['location']);
        push(test, response.body["postResponse"]['location']);
    });
  }

  async function cancelRecording() {
    console.log('cancelling recording..');
    setRecording(undefined);
    await recording.stopAndUnloadAsync();

  }
  
  return (
    <View style={styles.container}>
      <Text>Setting</Text>
      <Button
        title={recording ? 'Stop Recording' : 'Start Recording'}
        onPress={recording ? stopRecording : startRecording}
      />
      {recording ? (
        <Button
          title={"cancel"}
          onPress={cancelRecording}/>
      ):(
        <View>
        </View>
      )}
      
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
