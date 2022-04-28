
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';


export default function playback({ route, navigation }) {
    const { title, url, date } = route.params;
    const [playing, swapPlaying] = useState(false);
    const [buttonText, changeText] = useState("Play Recording")
    const [sound, setSound] = useState();
    const [loaded, setLoading] = useState(true);
    navigation.setOptions({ title: title });
    const [file, setFile] = useState("");
    const [isPlaying, setIsPlaying] = useState(false);
    const [playbackObject, setPlaybackObject] = useState(null);
    const [playbackStatus, setPlaybackStatus] = useState(null);

    return (
      <View style={styles.container}>

                <View style={styles.container}>      
                    <View style={styles.top}>
                        
                    </View>

                    <View style={styles.bottom}>

                    </View>
                </View>
            
          
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
    },
    top:{
        flex:1, 
        backgroundColor:'#1c1c1c',
        width: "100%",
        alignItems: 'center',
        justifyContent: 'center',
    },
    bottom:{
        flex:1, 
        width: "100%",
        alignItems: 'center',
        justifyContent: 'center',
    }
  });
