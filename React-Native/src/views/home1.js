import { StatusBar } from 'expo-status-bar';
import React, { useState, setState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { getDatabase, ref, child, get } from 'firebase/database';
import { auth } from "../other/js/firebase";
import DefaultButton from '../components/DefaultButton';
import { FlatList } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';


export default function home({ navigation }) {
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
    const renderItem = ({ item }) => {
        return (
            <TouchableOpacity onPress={() => navigation.navigate('viewPatient', { id: item.id })}>
                <View style={styles.item}>
                    <Text>{item.fname + " " + item.lname + " (" + item.age + ") " + item.sex}</Text>
                    <Text>{item.dob}</Text>
                </View>
            </TouchableOpacity>
        );
    };

    const user = auth.currentUser;
    const dbRef = ref(getDatabase());
    const [dispname, setDispname] = useState('');

    get(child(dbRef, `users/${user.uid}/first_name`)).then((snapshot) => {
        if (snapshot.exists()) {
            setDispname(snapshot.val(), dispname);
        } else {
            console.log("No data available");
        }
    });

    return (
    <View style={styles.container}>
        <View style={styles.body}>
            <View style={styles.mainView25}>
                <View style={{ width: '100%' }}>
                    <Text style={{ fontWeight: 'bold' }}>{"Welcome back, "}{dispname}</Text>
                </View>
                <View style={{padding: 15}}>
                    <DefaultButton text='Add A Patient' onPress={() => {
                    console.log("Wahay")
                    }}/>
                </View>
            </View>
            <View style={{ borderBottomColor: 'black', borderBottomWidth: 1, width: '100%'}}/>
            <View style={styles.mainView75}>
                    <Text style={{ paddingTop: 15 }}>Patients List</Text>
                <FlatList style={{ width: '100%', paddingTop: 15 }}
                    data={patientList}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                />
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
