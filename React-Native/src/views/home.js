import { Feather } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import firebase from 'firebase/compat';
import { get, getDatabase, ref } from 'firebase/database';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import DefaultButton from '../components/DefaultButton';

export default function home({ navigation }) {


  navigation.setOptions({
    headerRight: () => (
      <TouchableOpacity
      onPress={() => navigation.navigate('Settings')}>
        <Feather name="settings" size={20} color="black" />
      </TouchableOpacity>
    ),
  });
  
  const [values, setValues] = useState({
    email: '',
    password: '',
    first_name: '',
    last_name: '',
    acc_type: '',
    loading: true,
    recordings: {}
  })
  
  useEffect(() => {
    // write your code here, it's like componentWillMount
    request();
  }, [])

  const db = getDatabase();
  
  // Listen for authentication state to change.
  const request = (auth) => {
      const user = firebase.auth().currentUser;
      if (user != null) {
        const reference = ref(db, 'users/' + user.uid);
        get(reference, ).then((snapshot) => {
          if (snapshot.exists()) {
            const array = [];
            
            for(var i in snapshot.val().recordings) {
              array.push(snapshot.val().recordings[i]);
            }
            //console.log(array)
            setValues({
              email: snapshot.val().email,
              first_name: snapshot.val().first_name,
              last_name: snapshot.val().last_name,
              acc_type: snapshot.val().acc_type,
              loading: false,
              recordings: array,
            });
            

          } else {
            console.log("No data available");
            signOut(auth);
          }
        }).catch((error) => {
          console.error(error);
        });
        
      }

  };


  if (!values.loading){
    return (
      <View style={styles.container}>
        <View style={styles.topContainer}>
          <View style={{
            width: '80%',
            height: '90%',
            alignSelf: 'center',
          }}>
            <Text style={{
              fontWeight:'bold'
            }}>Welcome {values.first_name} </Text>
            <View style={{
              alignItems: 'center',
              justifyContent: 'center',
              height:'87%'
            }}>
              <DefaultButton text="Connect Stethoscope"  onPress={() => navigation.navigate('connectBluetooth')}/>
              <View style={{height:20}}></View>
              <DefaultButton text="New Recording"  onPress={() => navigation.navigate('recordingInsructions')}/>
            </View>
            
          </View>
        </View>
        <View style={{ borderBottomColor: 'black', borderBottomWidth: 1, width: '100%'}}/>
        <View style={styles.bottomContainer}>
                <Text style={{ padding: 15,fontWeight:'bold' }}>Recordings List</Text>
                <View style={{ borderBottomColor: 'black', borderBottomWidth: 1, width: '100%'}}/>
                <FlatList style={{ width: '100%', paddingTop: 15 }}
                    data={values.recordings}
                    renderItem={({ item }) => {
                      const keys = Object.keys(item)
                          return (
                              <TouchableOpacity >
                                  <View style={styles.item}>
                                      <Text style={{fontWeight:"500"}}>{item.type}</Text>
                                      <Text>{item.date}</Text>
                                  </View>
                              </TouchableOpacity>
                          );
                      }
                    }
                    keyExtractor={(item, index) => item.id}
                />
        </View>
        <StatusBar style="auto" />
      </View>
    );
  }else{
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" />
        <StatusBar style="auto" />
      </View>
    );

  }
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  topContainer:{
    flex: 1,
    width: '100%',
    justifyContent: 'center',
  },
  bottomContainer:{
    flex: 2,
    width: '100%',

  },
  textInput: {
    width: '100%',
    height: 50,
    padding: 10,
    borderRadius: 5,
    borderColor: "grey",
    borderWidth: 2,
  },
  item: {
      width: '100%',
      height: 65,
      borderBottomColor: '#ddd',
      borderBottomWidth: 1,
      paddingTop: 10,
      paddingLeft: 5
  }
});
