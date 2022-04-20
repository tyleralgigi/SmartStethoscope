import { REACT_APP_accessKey, REACT_APP_bucket, REACT_APP_secretKey } from '@env';
import { Audio } from 'expo-av';
import { StatusBar } from 'expo-status-bar';
import firebase from 'firebase/compat';
import { getDatabase, push, ref, set } from 'firebase/database';
import React from 'react';
import { ActivityIndicator, Alert, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { RNS3 } from 'react-native-aws3';
import DefaultButton from '../components/DefaultButton';
import InvertedButton from '../components/InvertedButton';

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

export default function respiratoryRecordingScreen({ navigation }) {
  const [recording, setRecording] = React.useState(false);
  const db = getDatabase();
  const user = firebase.auth().currentUser;
  const [uploading, changeUploadState] = React.useState(true);
  const [recordingTitle, changerecording] = React.useState("Start recroding");
  const [paused, setPause] = React.useState(false);
  const [hitRecording, changeHitRecording] = React.useState(false);
  const [isLoading, toggleLoading] = React.useState(false);

  navigation.setOptions({
    headerLeft: () => (
      <TouchableOpacity
      onPress={() => {cancelRecording() 
        navigation.navigate('Home')}}>
        <View>
          <Text>Cancel</Text>
        </View>
      </TouchableOpacity>
    ),
  });

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
      changeHitRecording(true);
      changerecording("Pause Recording")
      console.log('Recording started');
     
    } catch (err) {
      console.error('Failed to start recording', err);
    }
  }

  async function pauseRecording() {
    console.log("pausing")

    try{
      await recording.pauseAsync();
      setPause(true);
      changerecording("Continue Recording")
    } catch (err) {
      console.error('Failed to start recording', err);
    }


  }

  async function contiuneRecording(){
    console.log("contiune")
    
    try{
      await recording.startAsync()
      setPause(false);
      changeHitRecording(true);
      changerecording("Pause Recording")
    } catch (err) {
      console.error('Failed to start recording', err);
    }
  }

  async function stopRecording() {
    
    console.log('Stopping recording..');
    setRecording(undefined);
    changeUploadState({uploading: false});
    changerecording("Recording Complete")
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
        //const recordings = ref(db, 'recordings/');
        //const test = ref(db, 'users/' + user.uid + '/recordings');

        console.log(response.body["postResponse"]['location']);
        const userUpdate = ref(db, 'users/' + user.uid + '/recordings');
        const reference = push(userUpdate)
        
        set(ref(db, 'users/' + user.uid + '/recordings/'+reference.key), {
            url: response.body["postResponse"]['location'],
            type: "Respiratory Recording",
            date: date,
            id: reference.key})

    });
    
    changeUploadState({uploading: true});
    Alert.alert(
      "You recording is complete and uploaded!"
    )

    navigation.goBack()
  }

  const loadingFunction = () => {
    toggleLoading(isLoading => !isLoading)
    console.log("timeout")
    setTimeout(() => {
      toggleLoading(isLoading => !isLoading)
      console.log("timeout done")
    }, 1000);
    
    
  }

  async function cancelRecording() {
    console.log('cancelling recording..');
    setRecording(undefined);
    await recording.stopAndUnloadAsync();
    Alert.alert(
      "You recording was cancelled."
    )
  }
  
  const chest_images = [{image:require("../other/imgs/A_chest_placement.png"), title:"Next"}, {image:require("../other/imgs/P_chest_placement.png"), title:"Next"},
  {image:require("../other/imgs/T_chest_placement.png"), title:"Next"}, {image:require("../other/imgs/M_chest_placement.png"), title:"Finish"}]
  const [count, changeCount] = React.useState(0);
  

  const countUp = () =>{
    if(count != 3 ){
      if(paused){
        if(hitRecording){
          loadingFunction()
          changeCount(count+1);
          changeHitRecording(false);
        }else{
          Alert.alert(
            "Please record your Heart sounds by following the instructions on screen."
          )
        }
        
      }else{

        Alert.alert(
          "Please pause your recording to contiune."
        )
      }
      
    }else{
      console.log("count is done")
      if(paused){
        if(hitRecording){
          stopRecording()
        }else{
          Alert.alert(
            "Please record your Heart sounds by following the instructions on screen."
          )
        }
      }else{
        Alert.alert(
          "Please pause your recording to contiune."
        )
      }
    }
  }

  const process = () => {
    if(count == 0){
      if(!recording){
        startRecording()
      }else{
        pauseRecording()
      }
    }else if (count == 1){
      if(paused){
        contiuneRecording()
      }else{
        pauseRecording()
      }
    }else if (count == 2){
      if(paused){
        contiuneRecording()
      }else{
        pauseRecording()
      }
    }else if (count == 3){
      if(paused){
        contiuneRecording()
      }else{
        pauseRecording()
      }
    }
  }

  return (
    <View style={styles.container}>
         {isLoading?(
                <View>
                  <View style={styles.container}>
                    <ActivityIndicator
                      size="large"
                      color="red"
                      style={{
                        position: 'absolute',
                        alignItems: 'center',
                        justifyContent: 'center',
                        left: 0,
                        right: 0,
                        top: 0,
                        bottom: 0,
                      }} />
                    <StatusBar style="auto" />
                  </View>
                </View>
            ):(
                <View>
                  <View style={styles.container}>
                    <View style={styles.top}>

                          <Image style={{width:"80%"}} source={chest_images[count].image}/>
                          <View style={{width:"85%", paddingTop:10}}>
                            <Text style={{paddingTop:5, fontWeight:"500"}}>Lightly place the Stethoscope on your chest approxomiatly where the RED is.</Text>
                            <Text style={{paddingTop:5, fontWeight:"500"}}>When you are ready tap start recording, you will then take 2 DEEP breaths and stop the recording.</Text>
                            <Text style={{paddingTop:5, fontWeight:"500"}}>Then tap next.</Text>
                          </View>
                        
                    </View>

                    <View style={styles.middle}>
                        
                    </View>

                    <View style={styles.bottom}>
                        <InvertedButton text={recordingTitle}
                            onPress={() => process()}/>
                        <View style={{height:10}}></View>
                        <DefaultButton text={chest_images[count].title}  onPress={() => countUp()}/>
                    </View>
                    <StatusBar style="auto" />
                  </View>

                </View>

            ) }
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
  top:{
    flex: 6,
    width: "100%",
    alignItems: 'center',
    justifyContent: 'center',
  },
  image:{
    resizeMode: 'center',

  },
  middle:{
    alignItems: 'center',
    justifyContent: 'center',
    flex: 3,
    width: "100%"
  },
  bottom:{
    flex: 3,
    width: "100%",
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
  },
  loading: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F5FCFF88'
  }
});



/* {uploading ?(
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
*/

/*     {loading?(
                <View>
                  <View style={styles.container}>
                    <View style={styles.loading}>
                      <ActivityIndicator size='large' />
                    </View>
                    <StatusBar style="auto" />
                  </View>
                </View>
            ):(
                <View>
                  <View style={styles.container}>
        <View style={styles.top}>

            <Image style={{width:"80%"}} source={chest_images[count].image}/>
            <View style={{width:"85%", paddingTop:10}}>
              <Text style={{paddingTop:5, fontWeight:"500"}}>Lightly place the Stethoscope on your chest approxomiatly where the RED is.</Text>
              <Text style={{paddingTop:5, fontWeight:"500"}}>When you are ready tap start recording, you will then take 2 DEEP breaths and stop the recording.</Text>
              <Text style={{paddingTop:5, fontWeight:"500"}}>Then tap next.</Text>
            </View>
          
        </View>

        <View style={styles.middle}>
          
        </View>

        <View style={styles.bottom}>
          <InvertedButton text={recordingTitle}
              onPress={() => process()}/>
          <View style={{height:10}}></View>
          <DefaultButton text={chest_images[count].title}  onPress={() => countUp()}/>
        </View>
      <StatusBar style="auto" />
    </View>

                </View>

            ) }
            */