import { StatusBar } from 'expo-status-bar';
import { onAuthStateChanged } from 'firebase/auth';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { auth } from '../other/js/firebase';
import { get_acc_info } from '../other/js/get_acc_info';
export default function home({ navigation }) {

  const [values, setValues] = useState({
    email: '',
    password: '',
    first_name: '',
    last_name: '',
    acc_type: '',
  })
  

  // Listen for authentication state to change.
  onAuthStateChanged(auth, user => {
    if (user != null) {
      setValues(get_acc_info(user))
    }
  });


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
});
