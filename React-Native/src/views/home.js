import { Feather } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { onAuthStateChanged } from 'firebase/auth';
import { get, getDatabase, ref } from 'firebase/database';
import React, { useState, useEffect } from 'react';
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View, FlatList } from 'react-native';
import DefaultButton from '../components/DefaultButton';
import { auth } from '../other/js/firebase';
import firebase from 'firebase/compat';

export default function home({ navigation }) {

  const patientList = [
    {
        id: '1',
        zip: '123456',
        fname: "Norman",
        lname: "Osborn",
        dob: "10/11/1945",
        age: 76,
        sex: "M"
    },
    {
        id: '2',            
        zip: '123456',
        fname: "Otto",
        lname: "Octavius",
        dob: "05/18/1940",
        age: 81,
        sex: "M"
    },
    {
        id: '3',
        zip: '123456',
        fname: "Mac",
        lname: "Gargan",
        dob: "06/03/1983",
        age: 38,
        sex: "M"
    },
  ];
  const renderItem = ({ item }) => {
      return (
          <TouchableOpacity onPress={() => console.log({ id: item.id })}>
              <View style={styles.item}>
                  <Text>{item.fname + " " + item.lname + " (" + item.age + ") " + item.sex}</Text>
                  <Text>{item.dob}</Text>
              </View>
          </TouchableOpacity>
      );
  };

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
    recording: []
  })
  
  const db = getDatabase();
  // Listen for authentication state to change.
  useEffect((auth) => {
      const user = firebase.auth().currentUser;
      if (user != null) {
        const reference = ref(db, 'users/' + user.uid);
        get(reference, ).then((snapshot) => {
          if (snapshot.exists()) {
            setValues({
              email: snapshot.val().email,
              first_name: snapshot.val().first_name,
              last_name: snapshot.val().last_name,
              acc_type: snapshot.val().acc_type,
              loading: false,
              recording: snapshot.val().recording,
            });
          } else {
            console.log("No data available");
            signOut(auth);
          }
        }).catch((error) => {
          console.error(error);
        });
        
      }
  
  });
    
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
              height:'100%'
            }}>
              <DefaultButton text="New Recording"  onPress={() => navigation.navigate('recordingScreen')}/>
            </View>
            
          </View>
        </View>
        <View style={{ borderBottomColor: 'black', borderBottomWidth: 1, width: '100%'}}/>
        <View style={styles.bottomContainer}>
                <Text style={{ paddingTop: 15 }}>Patients List</Text>
                <FlatList style={{ width: '100%', paddingTop: 15 }}
                    data={patientList}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
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
      backgroundColor: '#fff',
      height: 60,
      borderBottomColor: '#ddd',
      borderBottomWidth: 1,
      paddingTop: 10,
      paddingLeft: 5
  }
});
