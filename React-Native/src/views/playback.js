import React, {useEffect, useState} from 'react';
import { StyleSheet, View, Text, TouchableOpacity, BackHandler, ActivityIndicator } from 'react-native';
import {Audio} from 'expo-av';
import InvertedButton from '../components/InvertedButton';

export default function playback({ route, navigation }) {
    const { url, title } = route.params;
    const [isPlaying, setIsPlaying] = useState(true);
    const [playbackObject, setPlaybackObject] = useState(null);
    const [playbackStatus, setPlaybackStatus] = useState(null);
    const [isloading, setLoading] = useState(true);

    navigation.setOptions({
      headerTitle: title,
      });
      

    useEffect(() => {
        // write your code here, it's like componentWillMount
        test();
        BackHandler.addEventListener("hardwareBackPress", () => cancelAudio());

        return () =>
          BackHandler.removeEventListener("hardwareBackPress", () => cancelAudio());
      }, [])
    
    async function cancelAudio(){
        await playbackObject.unloadAsync()
        setIsPlaying(false);
    }
    async function test(){
        await Audio.setAudioModeAsync({ playsInSilentModeIOS: true });
        const { sound: playbackObject, status } = await Audio.Sound.createAsync(
            { uri: url },
            { shouldPlay: true }
        );
        setPlaybackStatus(status);
        setPlaybackObject(playbackObject);
        setLoading(false);
    }

    const handleAudioPlayPause = async () => {
        if (isPlaying) {
            console.log("pausing audio")
            const status = await playbackObject.pauseAsync();
            setIsPlaying(false);
            return setPlaybackStatus(status);
          }
      
          // It will resume our audio
          if (!isPlaying) {
            console.log("playing audio")
            const status = await playbackObject.playAsync();
            setIsPlaying(true);
            return setPlaybackStatus(status);
          }
    };
    
    function millisToMinutesAndSeconds(millis) {
      var minutes = Math.floor(millis / 60000);
      var seconds = ((millis % 60000) / 1000).toFixed(0);
      return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
    }

    return (
      
      <View style={styles.container}>
        {isloading ? 
        ( 
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
          </View>
        )
        : 
        (
          <View style={styles.container}>
            <View style={styles.top}>
    
              <View
                style={{
                  borderBottomColor: 'white',
                  borderBottomWidth: 2,
                  width:"80%",
                }}
              />
              <View style={{width:"80%", flexDirection: "row"}}>
                <Text style={{color:"white"}}>0:00</Text>
                <View style={{flex:1}}/>
                <Text style={{color:"white"}}>{millisToMinutesAndSeconds(playbackStatus.durationMillis)}</Text>
              </View>
            </View>
    
            <View style={styles.bottom}>
              <InvertedButton text={isPlaying ? "Pause":"Play"} onPress={() => handleAudioPlayPause()}/>
            </View>
            
          </View>
        )}
        
      </View>
    )
  }
  
  const styles = StyleSheet.create({
    top:{
      height: "100%",
      width:"100%",
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#141414',
      flex:1,
    },
    bottom:{
      height: "100%",
      width:"100%",
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#ecf0f1',
      flex:1,
    },
    container: {
      height: "100%",
      width:"100%",
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#ecf0f1',
    }
  });
