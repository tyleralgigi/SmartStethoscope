import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { StyleSheet, Switch, Text, TextInput, View } from 'react-native';
import InvertedButton from '../components/InvertedButton';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from "../other/js/firebase"

export default function forgotPassword({ navigation }) {

    const [email, setemail] = useState("")

    function resetPass(){
        sendPasswordResetEmail(auth, email)
            .then(() => {
                console.log("success");
            })
            .catch((error) => {
                console.log("error");
            })
    }

    return (
        <View style={styles.container}>
        
            <View style={styles.body}>
                <View style={styles.mainView}>
                    <View style={{width: '100%'}}>
                        <Text style={{fontWeight:'bold'}}>Enter an email to get sent a password rest link.</Text>
                    </View>
                    <View style={{width: '100%', paddingTop: 10, paddingBottom: 10}}>
                        <Text>Email</Text>
                        <TextInput 
                            style={styles.textInput}
                            placeholder="youremail@email.com"
                            keyboardType="email-address"
                            onChangeText={text => setemail(text)}/>
                    </View>
                    <View style={{padding: 15}}>
                        <InvertedButton text='Contiune' onPress={() => {
                            resetPass()
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
