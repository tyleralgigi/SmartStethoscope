import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { Image, StyleSheet, Text, TextInput, View } from 'react-native';
import DefaultButton from '../components/DefaultButton';
import InvertedButton from '../components/InvertedButton';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from "../other/js/firebase"

export default function signIn({ navigation }) {

  const [values, setValues] = useState({
    email: '',
    password: ''
  })

  function handleValueChange(text, eventName){
    setValues(prev => {
      return {
        ...prev,
        [eventName] : text
      }
    })
  }

  function Login(){

    const {email, password} = values

    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        console.log("success")
      })
      .catch((error) => {
        console.log(error.message)
      })

  }
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          style={styles.tinyLogo}
          source={require('../other/imgs/fau_logo.png')}/>
        
      </View>

      <View style={styles.body}>

        <View style={styles.titleView}>
          <Text style={styles.titleText}>Smart Stethoscope Compaion App</Text>
        </View>
        <View style={styles.mainView}>
          <View style={{width: '100%', paddingTop: 10, paddingBottom: 10}}>
            <Text>Email</Text>
            <TextInput 
              style={styles.textInput}
              placeholder="youremail@email.com"
              keyboardType="email-address"
              onChangeText={text => handleValueChange(text, 'email')}/>
          </View>
          <View style={{width: '100%' , paddingTop: 10, paddingBottom: 10}}>
            <Text>Password</Text>
            <TextInput 
              style={styles.textInput}
              placeholder="password"
              secureTextEntry={true}
              onChangeText={text => handleValueChange(text, 'password')}/>
            <View style={{alignItems:'flex-end'}}>
              <Text>Forgot Password?</Text>
            </View>
          </View>
          <View style={{padding: 15}}>
            <DefaultButton text='Sign In' 
            onPress={() => Login()}
            />
          </View>
          <View style={{padding: 15}}>
            <InvertedButton text='Create An Account' onPress={() => {
              navigation.navigate('createAccount')
            }}/>
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
  titleView:{
    flex:1,
    width: '80%',
    justifyContent: 'center'
  },
  mainView:{
    flex: 7,
    width: '80%',
    alignItems: 'center'
  },
  textInput:{
    width: '100%',
    height: 50,
    padding: 10,
    borderRadius: 5,
    borderColor: "grey",
    borderWidth: 2,
  },
  titleText:{
    fontSize: 25,
    fontWeight:'bold'
  },
  tinyLogo: {
    width: 250,
    height: 140,
  },
  container: {
    flex: 1
  },

});
