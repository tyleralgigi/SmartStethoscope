import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import DefaultButton from '../components/DefaultButton';

export default function signIn({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text>header</Text>
        
      </View>

      <View style={styles.body}>
        <Text>signIn</Text>
        <DefaultButton />
        <StatusBar style="auto" />
      </View>
      
    </View>
  );
}

const styles = StyleSheet.create({
  header:{
    flex: 1, 
    backgroundColor: "#E6E6E6",
    alignItems: 'center',
    justifyContent: 'center',
  },
  body:{
    flex: 3,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flex: 1
  },

});
