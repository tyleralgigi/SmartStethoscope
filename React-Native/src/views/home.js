import { StatusBar } from 'expo-status-bar';
import { onAuthStateChanged } from 'firebase/auth';
import { get, getDatabase, ref } from 'firebase/database';
import { default as React, default as React, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { auth } from '../other/js/firebase';



export default function home({ navigation }) {

  
  const [values, setValues] = useState({
    email: '',
    password: '',
    first_name: '',
    last_name: '',
    acc_type: '',
    loading: true
  })
  

  // Listen for authentication state to change.
  onAuthStateChanged(auth, user => {

    const db = getDatabase();

    if (user != null) {
      const reference = ref(db, 'users/' + user.uid);
      get(reference, ).then((snapshot) => {
        if (snapshot.exists()) {
          setValues({
            email: snapshot.val().email,
            first_name: snapshot.val().first_name,
            last_name: snapshot.val().last_name,
            acc_type: snapshot.val().acc_type,
            loading: false
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
  
          </View>
        </View>
        <View style={styles.bottomContainer}>
  
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

export default function home({ navigation }) {
  return (
    <View style={styles.container}>
      <Text>Home</Text>
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
  topContainer:{
    flex: 1,
    width: '100%',
    justifyContent: 'center',
  },
  bottomContainer:{
    flex: 2,
    width: '100%',
    backgroundColor: "#856"
  }
});
