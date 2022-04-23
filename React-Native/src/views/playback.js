
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, StatusBar, StyleSheet, View } from 'react-native';
import RNFetchBlob from 'rn-fetch-blob';
import InvertedButton from '../components/InvertedButton';

export default function playback({ route, navigation }) {
    const { title, url, date } = route.params;
    const [playing, swapPlaying] = useState(false);
    const [buttonText, changeText] = useState("Play Recording")
    const [sound, setSound] = useState();
    const [loaded, setLoading] = useState(true);
    navigation.setOptions({ title: title });
    const [file, setFile] = useState("");

    useEffect(() => {
        // write your code here, it's like componentWillMount
        checkPermission();

    }, [])



    async function getRecording(){
        let FILE_URL = url;    
        // Function to get extention of the file url
        let file_ext = getFileExtention(FILE_URL);
    
        file_ext = '.' + file_ext[0];
        const { config, fs } = RNFetchBlob;
        let RootDir = Platform.OS == 'ios'
            ? RNFetchBlob.fs.dirs.DocumentDir
            : RNFetchBlob.fs.dirs.DCIMDir;;
        let options = {
            fileCache: true,
            addAndroidDownloads: {
              path:
                RootDir+
                '/file_' + 
                Math.floor(date.getTime() + date.getSeconds() / 2) +
                file_ext,
              description: 'downloading file...',
              notification: true,
              // useDownloadManager works with Android only
              useDownloadManager: true,   
            },
          };
          config(options)
          .fetch('GET', FILE_URL)
          .then(res => {
            // Alert after successful downloading
            console.log('res -> ', JSON.stringify(res));

          });

    }
    
    async function stopOrStart(){
        if(sound){
            console.log('Playing Sound');
            await sound.playAsync(); 
        }else{
            console.log('Unloading Sound');
            sound.pauseAsync();
        }
    }


    const checkPermission = async () => {
 
        if (Platform.OS === 'ios') {
            getRecording();
        } else {
          try {
            const granted = await PermissionsAndroid.request(
              PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
              {
                title: 'Storage Permission Required',
                message:
                  'Application needs access to your storage to download File',
              }
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
              // Start downloading
              getRecording();
              console.log('Storage Permission Granted.');
            } else {
              // If permission denied then show alert
              Alert.alert('Error','Storage Permission Not Granted');
            }
          } catch (err) {
            // To handle permission related exception
            console.log("++++"+err);
          }
        }
      };      
      
    
  const getFileExtention = fileUrl => {
    // To get the file extension
    return /[.]/.exec(fileUrl) ?
             /[^.]+$/.exec(fileUrl) : undefined;
  };


    return (
      <View style={styles.container}>
            {loaded ? (
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
            ): (
                <View style={styles.container}>      
                    <View style={styles.top}>
                        
                    </View>

                    <View style={styles.bottom}>
                        <InvertedButton text={buttonText}
                            onPress={() => stopOrStart()}/>
                    </View>
                </View>
            )}
          
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
