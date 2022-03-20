import firebase from 'firebase/compat/app';
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: process.env.apiKey,
    authDomain: process.env.authDomain,
    databaseURL: process.env.databaseURL,
    projectId: "smartstethoscope-99610",
    storageBucket: process.env.storageBucket,
    messagingSenderId: process.env.messagingSenderId,
    appId: process.env.appId,
    measurementId: process.env.measurementId
};

if (!firebase.apps.length){
    firebase.initializeApp(firebaseConfig);
}else{
    firebase.app()
}

const auth = getAuth();

export {auth};