import { StatusBar } from 'expo-status-bar';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { getDatabase, ref, set } from 'firebase/database';
import React, { useState } from 'react';
import { StyleSheet, Switch, Text, TextInput, View } from 'react-native';
import InvertedButton from '../components/InvertedButton';
import { auth } from "../other/js/firebase";

export default function createAccount({ navigation }) {

  const [isEnabled, setIsEnabled] = useState(false);

  
  const [values, setValues] = useState({
    email: '',
    password: '',
    first_name: '',
    last_name: '',
    acc_type: '',
    recording: []
  })

  function handleValueChange(text, eventName){
    if (eventName == 'acc_type'){
      setIsEnabled(previousState => !previousState);
      if (text == false){
        setValues(prev => {
          return {
            ...prev,
            [eventName] : 'HCP'
          }
        })
      }else{
        setValues(prev => {
          return {
            ...prev,
            [eventName] : 'Patient'
          }
        })
      }
    }else{
      setValues(prev => {
        return {
          ...prev,
          [eventName] : text
        }
      })
    }

  }

  function handleCreateAccount(){
    
    const {email, password,first_name,last_name,acc_type, recording} = values

    const db = getDatabase();
    //const reference = ref(db, 'users/' + userId);
      //set(reference, {
        //highscore: score,
      //});
    createUserWithEmailAndPassword(auth, email, password)
      .then((userId) => {
        console.log("success")
        console.log(userId.user.uid)
        const reference = ref(db, 'users/' + userId.user.uid);
        set(reference, {
          email: email,
          first_name: first_name,
          last_name: last_name,
          acc_type: acc_type,
          userId: userId.user.uid,
          recording: recording
        });
      })
      .catch((error) => {
        console.log(error.message)
      })



  }

  return (
    <View style={styles.container}>
      <View style={styles.body}>
        <View style={styles.mainView}>
          <View style={{width: '100%'}}>
            <Text style={{fontWeight:'bold'}}>Get started with a free account</Text>
          </View>
          <View style={{width: '100%', paddingTop: 10, paddingBottom: 10}}>
              <Text>First Name</Text>
              <TextInput 
                style={styles.textInput}
                placeholder="John"
                keyboardType="default"
                onChangeText={text => handleValueChange(text, 'first_name')}/>
          </View>
          <View style={{width: '100%', paddingTop: 10, paddingBottom: 10}}>
              <Text>Last Name</Text>
              <TextInput 
                style={styles.textInput}
                placeholder="Smith"
                keyboardType="default"
                onChangeText={text => handleValueChange(text, 'last_name')}/>
          </View>
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
          </View>
          <View style={{width: '100%' , paddingTop: 10, paddingBottom: 10}}>
            <Text>Are you a Patient?</Text>
            <View style={{flexDirection:'row', alignItems:'center'}}>
              <Text style={{paddingRight: '5%'}}>No</Text>
              <Switch
              trackColor={{ false: "#767577", true: "#81b0ff" }}
              thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={bool => handleValueChange(bool, 'acc_type')}
              value={isEnabled}

              />
              <Text style={{paddingLeft: '5%'}}>Yes</Text>
            </View>

          </View>
          <View style={{padding: 15}}>
            <InvertedButton text='Contiune' onPress={() => {
              handleCreateAccount()
            }}/>
          </View>
        </View>
        
      </View>

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
  body:{
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  mainView:{
    flex: 7,
    width: '80%',
    alignItems: 'center',
    paddingTop: '10%',
    paddingBottom:'10%',
  },
  textInput:{
    width: '100%',
    height: 50,
    padding: 10,
    borderRadius: 5,
    borderColor: "grey",
    borderWidth: 2,
  },
});
