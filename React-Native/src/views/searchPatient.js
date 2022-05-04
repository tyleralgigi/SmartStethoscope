import { StatusBar } from 'expo-status-bar';
import React, { useState, setState, useEffect } from 'react';
import { SnapshotViewIOS, StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';
import { getDatabase, ref, child, get } from 'firebase/database';
import { auth } from "../other/js/firebase";
import DefaultButton from '../components/DefaultButton';
import { FlatList } from 'react-native';
import firebase from 'firebase/compat';


export default function searchPatient({ navigation }) {

    const [users, setUsers] = useState([]);

    const db = getDatabase();
    // Listen for authentication state to change.
    useEffect((auth) => {
        const reference = ref(db, 'users');
        get(reference,).then((snapshot) => {
            if (snapshot.exists()) {
                const users = [];
                snapshot.forEach(childSnapshot => {
                    const ss = childSnapshot.exportVal();
                    if (ss.acc_type == "Patient") {
                        const listUser = {
                            acc_type: ss.acc_type,
                            email: ss.email,
                            first_name: ss.first_name,
                            last_name: ss.last_name,
                            userId: ss.userId
                        }
                        users.push(listUser);
                    }
                });
                setUsers(users);
            } else {
                console.log("No data available");
            }
        }).catch((error) => {
            console.error(error);
        });

    }, []);
    
    function addPatient(){
        const user = firebase.auth().currentUser;
        console.log(user.uid);
        
    }

    const renderItem = ({ item }) => {
        return (
            <TouchableOpacity onPress={() => navigation.navigate('viewPatient', { id: item.userId })}>
                <View style={styles.item}>
                    <View style={{height:"100%", flex:1}}>
                        <Text>{item.first_name + " " + item.last_name + " (" + item.email + ")"}</Text>
                    </View>
                    <View tyle={{height:"100%", flex:1}}>
                        <Text style={{fontWeight:"bold", fontSize:25}}>{'>'}</Text>
                        <View style={{width:30}}></View>
                    </View>

                </View>
            </TouchableOpacity>
        );
    };

    return (
    <View style={styles.container}>
        <View style={styles.body}>
                <FlatList style={{ width: '100%', paddingTop: 15 }}
                    data={users}
                    renderItem={renderItem}
                    keyExtractor={(item, index) => item.userId.toString()}
            />
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
        width: '100%',
        backgroundColor: '#eee'
    },
    item: {
        flexDirection:"row",
        width: '100%',
        backgroundColor: '#fff',
        height: 60,
        borderBottomColor: '#ddd',
        borderBottomWidth: 1,
        paddingTop: 10,
        paddingLeft: 5
    }
});