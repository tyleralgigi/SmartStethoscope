import { StatusBar } from 'expo-status-bar';
import React, { useState, setState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { getDatabase, ref, child, get } from 'firebase/database';
import { auth } from "../other/js/firebase";
import DefaultButton from '../components/DefaultButton';
import { FlatList } from 'react-native';

export default function viewPatient({ navigation, route }) {
    const { id } = route.params;

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

    const patient = patientList.find(x => x.id === id);

    return (
    <View style={styles.container}>
        <View style={styles.body}>
            <View style={styles.mainView}>
                <Text style={{ fontWeight: 'bold' }}>{"Now viewing the page for: "}{patient.fname}{" "}{patient.lname}</Text>
                <Text>{"Age: "}{patient.age}</Text>
                <Text>{"Sex: "}{patient.sex}</Text>
                <Text>{"Date of Birth: "}{patient.dob}</Text>
                <Text>{"Zip Code: "}{patient.zip}</Text>
            </View>
            <View style={styles.bottomView}>
                <Text>{"Audio Recordings: "}</Text>
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
        alignItems: 'center',
        justifyContent: 'center'
    },
    mainView: {
        flex: 1,
        width: '80%'
    },
    bottomView: {
        flex: 2,
        width: '80%',
        paddingTop: '10%'
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