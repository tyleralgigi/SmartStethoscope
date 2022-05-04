import { StatusBar } from 'expo-status-bar';
import React, { useState, setState, useEffect } from 'react';
import { StyleSheet, Text, View,TouchableOpacity } from 'react-native';
import { getDatabase, ref, child, get } from 'firebase/database';
import { auth } from "../other/js/firebase";
import DefaultButton from '../components/DefaultButton';
import { FlatList } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';

export default function homeHCP({ navigation }) {
    const [favs, setFavs] = useState([]);
    var isFocus = true;

    navigation.setOptions({
        headerRight: () => (
          <TouchableOpacity
          onPress={() => navigation.navigate('Settings')}>
            <Feather name="settings" size={20} color="black" />
          </TouchableOpacity>
        ),
      });

    const db = getDatabase();
    // Listen for authentication state to change.

    useFocusEffect((auth) => {
        const reference = ref(db, `users/${user.uid}/favs`);
        get(reference,).then((snapshot) => {
            if (snapshot.exists()) {
                const users = [];
                snapshot.forEach(childSnapshot => {
                    const ss = childSnapshot.exportVal();
                    const listUser = {
                        acc_type: ss.acc_type,
                        email: ss.email,
                        first_name: ss.first_name,
                        last_name: ss.last_name,
                        userId: ss.userId
                    }

                    users.push(listUser);
                });
                setFavs(users);
            } else {
                console.log("No data available");
            }
        }).catch((error) => {
            console.error(error);
        });

    });

    const renderItem = ({ item }) => {
        return (
            <TouchableOpacity onPress={() => navigation.navigate('viewPatient', { id: item.userId })}>
                <View style={styles.item}>
                    <Text>{item.first_name + " " + item.last_name + " (" + item.email + ")"}</Text>
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
                            navigation.navigate('searchPatient');
                    }}/>
                </View>
            </View>
            <View style={{ borderBottomColor: 'black', borderBottomWidth: 1, width: '100%'}}/>
            <View style={styles.mainView75}>
                    <Text style={{ paddingTop: 15 }}>Patients List</Text>
                <FlatList style={{ width: '100%', paddingTop: 15 }}
                    data={favs}
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
