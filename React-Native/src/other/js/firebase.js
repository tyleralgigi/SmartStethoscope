import firebase from 'firebase/compat/app';
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDHCOINfrDhyxzfE7oqg_QwP3u4ZduPEtA",
    authDomain: "smartstethoscope-99610.firebaseapp.com",
    databaseURL: "https://smartstethoscope-99610-default-rtdb.firebaseio.com",
    projectId: "smartstethoscope-99610",
    storageBucket: "smartstethoscope-99610.appspot.com",
    messagingSenderId: "189306051063",
    appId: "1:189306051063:web:29635aa39c32f65ae136f2",
    measurementId: "G-JE9ZZEEP8M"
};

if (!firebase.apps.length){
    firebase.initializeApp(firebaseConfig);
}else{
    firebase.app()
}

const auth = getAuth();

export {auth};