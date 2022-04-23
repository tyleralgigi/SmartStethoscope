import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Picker, StyleSheet, Text, View } from 'react-native';
import InvertedButton from '../components/InvertedButton';
import { useStore } from '../other/js/appStore';

export default function recordingInsructions({ navigation }) {
    const setType = useStore(state => state.setType)
    const [selectedValue, setSelectedValue] = useState("Respiratory Examination");
    
    return (
        <View style={styles.container}>
            <View style={styles.top}>

              
                <View style={{width:"85%", paddingTop:10}}>
                    <Text style={{
                        fontWeight:'bold'
                    }}>What type of recording are you performing?</Text>
                </View>
                <View style={{ height: 30, width: '85%', borderColor: 'black', borderBottomWidth: 1 }}>
                <Picker
                        selectedValue={selectedValue}
                        style={{ height: 50, width: '100%', borderColor: 'black', borderBottomWidth: 1 }}
                        onValueChange={(itemValue, itemIndex) => {
                            setType(itemValue)
                            setSelectedValue(itemValue)}}
                    >
                        <Picker.Item label="Respiratory Examination" value="Respiratory Examination" />
                        <Picker.Item label="Cardiac Examination" value="Cardiac Examination" />
                    </Picker>
                </View>
                
            </View>

                
            <View style={styles.bottom}>
                
                <View style={{height:"20%", width: '85%'}}>
                {selectedValue=="Respiratory Examination"?(
                    <View>
                        <Text style={{
                            fontWeight:'bold'
                        }}>Respiratory Examination</Text>
                        <Text>A respiratory examination, or lung examination, is performed as part of a physical examination or in response to respiratory symptoms such as shortness of breath, cough, or chest pain, and is often carried out with a cardiac examination.</Text>
                   
                    </View>
                ):(
                    <View>
                        <Text style={{
                            fontWeight:'bold'
                        }}>Cardiac Examination</Text>
                        <Text>A cardiac examination, also precordial exam, is performed as part of a physical examination, or when a patient presents with chest pain suggestive of a cardiovascular pathology. </Text>
                    
                    </View>

                ) }
                </View>
                <View style={{height:"60%", width: '85%'}}>
                {selectedValue=="Respiratory Examination"?(
                    <View>
                       <Text style={{
                            fontWeight:'bold'
                        }}>Stethoscope Instructions</Text>
                        <Text style={{paddingTop:15}}>1. Hold the stethoscope between your pointing finger and middle fingers and apply light pressure. </Text>
                        <Text style={{paddingTop:15}}>2. Sit upright and breath normally during the recording. </Text>
                        <Text style={{paddingTop:15}}>3. For all of the instructed position, please record for atleast 2 deep breaths. </Text>
                    
                    </View>
                ):(
                    <View>
                        <Text style={{
                            fontWeight:'bold'
                        }}>Stethoscope Instructions</Text>
                        <Text style={{paddingTop:15}}>1. Hold the stethoscope between your pointing finger and middle fingers and apply light pressure. </Text>
                        <Text style={{paddingTop:15}}>2. Sit upright and breath normally during the recording. </Text>
                        <Text style={{paddingTop:15}}>3. For each of the 4 instructed position, please record for atleast 2 seconds. </Text>
                    </View>

                ) }
                </View>
                <View style={{height:"20%", width: '85%', alignItems: 'center',justifyContent: 'center',}}>
                {selectedValue=="Respiratory Examination"?(
                    <View>
                        <InvertedButton text='Continue' onPress={() => { navigation.navigate('respiratoryRecordingScreen')}}/>
                    </View>
                ):(
                    <View>
                        <InvertedButton text='Continue' onPress={() => { navigation.navigate('cardiacRecordingScreen')}}/>
                    </View>

                ) }
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
    body: {
        flex: 1,
        width: '100%',
        alignItems: 'center'
    },
    mainView25: {
        flex: 1,
        width: '80%',
        alignItems: 'center',
        paddingTop: '10%',
    },
    mainView75: {
        flex: 4,
        width: '100%',
        alignItems: 'center',
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
    },
    top:{
        flex: 1,
        width: "100%",
        alignItems: 'center',
        justifyContent: 'center',
      },
      image:{
        resizeMode: 'center',
    
      },
      middle:{
        alignItems: 'center',
        justifyContent: 'center',
        flex: 3,
        width: "100%"
      },
      bottom:{
        flex: 3,
        width: "100%",
        alignItems: 'center',
        justifyContent: 'center',
      },
});

/*<View style={{flex: 1, width:"100%"}}>
                <Text style={{
                    fontWeight:'bold'
                }}>What type of recording are you performing?</Text>
                <Picker
                    selectedValue={selectedValue}
                    style={{ height: 30, width: '100%' }}
                    onValueChange={(itemValue, itemIndex) => {
                        setType(itemValue)
                        setSelectedValue(itemValue)}}
                >
                    <Picker.Item label="Respiratory Examination" value="Respiratory Examination" />
                    <Picker.Item label="Cardiac Examination" value="Cardiac Examination" />
                </Picker>
            </View>
        
            <View style={{flex: 1, width:"100%"}}>
            {selectedValue=="Respiratory Examination"?(
                <View>
                     <Text style={{
                        fontWeight:'bold'
                    }}>Respiratory Examination</Text>
                    <Text>A respiratory examination, or lung examination, is performed as part of a physical examination or in response to respiratory symptoms such as shortness of breath, cough, or chest pain, and is often carried out with a cardiac examination.</Text>
                            
                    <InvertedButton text='Continue' onPress={() => { navigation.navigate('respiratoryRecordingScreen')}}/>
                </View>
            ):(
                <View>
                    <Text style={{
                        fontWeight:'bold'
                    }}>Cardiac Examination</Text>
                    <Text>A cardiac examination, also precordial exam, is performed as part of a physical examination, or when a patient presents with chest pain suggestive of a cardiovascular pathology. </Text>
                    <InvertedButton text='Continue' onPress={() => { navigation.navigate('cardiacRecordingScreen')}}/>
                </View>

            ) }

            </View>
            
            */