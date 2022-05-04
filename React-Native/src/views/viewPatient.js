import { StatusBar } from 'expo-status-bar';
import React, { useState, setState } from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';
import { getDatabase, ref, child, get, set, remove } from 'firebase/database';
import { auth } from "../other/js/firebase";
import DefaultButton from '../components/DefaultButton';
import { FlatList } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { useEffect } from '@react-navigation/native';

var patientId;

export default function viewPatient({ navigation, route }) {
    const { id } = route.params;
    const user = auth.currentUser;
    const dbRef = ref(getDatabase());
    const [patient, setPatient] = useState('');
    const [isFav, setFav] = useState('');
    const [favText, setFavText] = useState('');
    const [recordings, setRecordings] = useState('')

    useFocusEffect((auth) => {
        // Getting data for displaying patient information
        get(child(dbRef, `users/${id}`)).then((snapshot) => {
            if (snapshot.exists()) {
                const ss = snapshot.exportVal();
                const patient = {
                    acc_type: ss.acc_type,
                    email: ss.email,
                    first_name: ss.first_name,
                    last_name: ss.last_name,
                    userId: ss.userId
                }
                patientId = patient.userId;
                
                setPatient(patient);
            } else {
                console.log("No data available for id: " + id);
            }
        });

        // getting data for whether current patient is in favorites list
        get(child(dbRef, `users/${user.uid}/favs/${patientId}`)).then((snapshot) => {
            if (snapshot.exists()) {
                setFav(true);
                setFavText("Unfavorite");
            } else {
                setFav(false);
                setFavText("Favorite");
                console.log("snapshot doesn't exist for " + patientId);
            }
        });

        // Getting data for user's recordings
        get(child(dbRef, `users/${patientId}/recordings`)).then((snapshot) => {
            if (snapshot.exists()) {
                const recordings = [];
                snapshot.forEach(childSnapshot => {
                    const ss = childSnapshot.exportVal();
                    const listRecording = {
                        date: ss.date,
                        id: ss.id,
                        type: ss.type,
                        url: ss.url
                    }

                    recordings.push(listRecording);
                });
                setRecordings(recordings);
            } else {
                console.log("No data available");
            }
        }).catch((error) => {
            console.error(error);
        });
    });

    const renderItem = ({ item }) => {
        return (
            <TouchableOpacity onPress={() => navigation.navigate('playback', {
                url: item.url,
                title: item.type
              })}>
                <View style={styles.item}>
                    <View style={{height:"100%", flex:1}}>
                        <Text>{item.type + " - " + item.date}</Text>
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
                <View style={styles.mainView}>
                    <Text style={{ fontWeight: 'bold', fontSize: 40, paddingTop: 10, paddingBottom: 10 }}>{patient.first_name}{" "}{patient.last_name}</Text>
                    <Text style={{ paddingBottom: 10 }}>{"Email: "}{patient.email}</Text>
                    <DefaultButton text={favText}
                        onPress={() => {
                            if (isFav) {
                                remove(child(dbRef, `users/${user.uid}/favs/${patient.userId}`));
                                setFav(false);
                                setFavText("Favorite")

                            } else {
                                set(child(dbRef, `users/${user.uid}/favs/${patient.userId}`), patient);
                                setFav(true);
                                setFavText("Unfavorite")
                            }
                        }}
                    />
            </View>
            <View style={styles.bottomView}>
                    <Text>{"Audio Recordings: "}</Text>
                    <FlatList style={{ width: '100%', paddingTop: 15 }}
                        data={recordings}
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