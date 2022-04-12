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
            <View style={{flex: 1, width:"100%"}}>
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
                            
                    <InvertedButton text='Continue' onPress={() => { navigation.navigate('recordingScreen')}}/>
                </View>
            ):(
                <View>
                    <Text style={{
                        fontWeight:'bold'
                    }}>Cardiac Examination</Text>
                    <Text>A cardiac examination, also precordial exam, is performed as part of a physical examination, or when a patient presents with chest pain suggestive of a cardiovascular pathology. </Text>
                    <InvertedButton text='Continue' onPress={() => { navigation.navigate('recordingScreen')}}/>
                </View>

            ) }

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
        alignItems: 'center',
        justifyContent: 'center'
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
    }
});
