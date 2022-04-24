import React, {useEffect, useState} from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import {Audio} from 'expo-av';
import InvertedButton from '../components/InvertedButton';
export default function temp({ route, navigation }) {
    const { url } = route.params;
    const [isPlaying, setIsPlaying] = useState(true);
    const [playbackObject, setPlaybackObject] = useState(null);
    const [playbackStatus, setPlaybackStatus] = useState(null);

    navigation.setOptions({
        headerLeft: () => (
          <TouchableOpacity
          onPress={() => {cancelAudio() 
            navigation.navigate('Home')}}>
            <View>
              <Text>Back</Text>
            </View>
          </TouchableOpacity>
        ),
        
      });
      

    useEffect(() => {
        // write your code here, it's like componentWillMount
        test();
      }, [])
    
    async function cancelAudio(){
        await playbackObject.unloadAsync()
        setIsPlaying(false);
    }
    async function test(){
        await Audio.setAudioModeAsync({ playsInSilentModeIOS: true });
        const { sound: playbackObject } = await Audio.Sound.createAsync(
            { uri: url },
            { shouldPlay: true }
        );
        setPlaybackObject(playbackObject);

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

    return (
      <View style={styles.container}>
          <InvertedButton text={isPlaying ? "Pause":"Play"} onPress={() => handleAudioPlayPause()}/>
      </View>
    )
  }
  
  const styles = StyleSheet.create({
    container: {
      height: "100%",
      width:"100%",
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#ecf0f1',
    }
  });
