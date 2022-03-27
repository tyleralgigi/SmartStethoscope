import { Audio } from 'expo-av';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Button, StyleSheet, Text, View, ActivityIndicator, Alert } from 'react-native';
import { RNS3 } from 'react-native-aws3';
import { get, getDatabase, ref, push } from 'firebase/database';
import firebase from 'firebase/compat';
import {REACT_APP_bucket, REACT_APP_accessKey, REACT_APP_secretKey} from '@env';


const config = {
  keyPrefix: 's3/', // Ex. myuploads/
  bucket: REACT_APP_bucket, // Ex. aboutreact
  region: 'us-east-1', // Ex. ap-south-1
  accessKey: REACT_APP_accessKey,
  // Ex. AKIH73GS7S7C53M46OQ
  secretKey:  REACT_APP_secretKey,
  // Ex. Pt/2hdyro977ejd/h2u8n939nh89nfdnf8hd8f8fd
  successActionStatus: 201,
}


export default function recordingScreen({ navigation }) {
  const [recording, setRecording] = React.useState();
  const db = getDatabase();
  const user = firebase.auth().currentUser;
  const [uploading, changeUploadState] = React.useState(true);

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
    changeUploadState({uploading: false});
    await recording.stopAndUnloadAsync();
    const uri = recording.getURI(); 
    const date = Date().toLocaleString()

    const file = {
      // `uri` can also be a file system path (i.e. file://)
      uri: uri,
      name: user.uid + " " + date+".mp3",
      type: "audio/mp3"
    }
    console.log('Recording stopped and stored at', uri);
    //Upload file to AWS
    
    RNS3.put(file, config).then(response => {
      if (response.status !== 201)
        throw new Error("Failed to upload image to S3");
        //Add file URL from AWS to Firebase
        const test = ref(db, 'users/' + user.uid + '/recordings');
        console.log(response.body["postResponse"]['location']);
        push(test, response.body["postResponse"]['location']);
    });
    changeUploadState({uploading: true});
    Alert.alert(
      "You recording is complete and uploaded!"
    )

    navigation.goBack()
  }

  async function cancelRecording() {
    console.log('cancelling recording..');
    setRecording(undefined);
    await recording.stopAndUnloadAsync();
    Alert.alert(
      "You recording was cancelled."
    )
  }
  
  return (
    <View style={styles.container}>

      {uploading ?(
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
        </View>
      ):(
        <View style={styles.loading}>
          <ActivityIndicator size='large' />
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
  loading: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  }
});



