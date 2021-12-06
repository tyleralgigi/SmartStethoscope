import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { StyleSheet, Text, View, TextInput  } from 'react-native';

import DefaultButton from '../components/DefaultButton';
import InvertedButton from '../components/InvertedButton';
export default function signIn({ navigation }) {
  const [text, onChangeText] = React.useState("");

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text>header</Text>
        
      </View>

      <View style={styles.body}>
        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>Smart Stethoscope Companion App</Text>
        </View>
        <View style={styles.mainContainer}>
          <Text>signIn</Text>
          <TextInput style={styles.input}
            onChangeText={onChangeText}
            value={text}
            placeholder="YourEmail@email.com"
          />

          <View style={{padding:20}}>
            <DefaultButton text='Login'/>
          </View>
          <View style={{padding:20}}>
            <InvertedButton text='Create An Account'/>
          </View>

        </View>
        
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
  titleText:{
    fontWeight: 'bold',
    fontSize: 25,
  },
  titleContainer:{
    flex:1,
    width: '85%',
    justifyContent: 'center'
  },
  mainContainer:{
    flex:7,
    width: '85%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  input: {
    height: 40,
    width: '95%',
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
  },
  container: {
    flex: 1
  },

});
