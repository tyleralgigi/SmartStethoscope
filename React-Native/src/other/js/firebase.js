import { REACT_APP_APIKEY, REACT_APP_appId, REACT_APP_authDomain, REACT_APP_databaseURL, REACT_APP_measurementId, REACT_APP_messagingSenderId, REACT_APP_storageBucket } from '@env';
import { getAuth } from "firebase/auth";
import firebase from 'firebase/compat/app';

const firebaseConfig = {
    apiKey: "AIzaSyDHCOINfrDhyxzfE7oqg_QwP3u4ZduPEtA",
    authDomain: REACT_APP_authDomain,
    databaseURL: REACT_APP_databaseURL,
    projectId: "smartstethoscope-99610",
    storageBucket: REACT_APP_storageBucket,
    messagingSenderId: REACT_APP_messagingSenderId,
    appId: REACT_APP_appId,
    measurementId:REACT_APP_measurementId
};

if (!firebase.apps.length){
    console.log(REACT_APP_APIKEY);
    console.log("asdlhjkfbaskljdfblkasjdbflaksjdbS")
    firebase.initializeApp(firebaseConfig);
}else{
    firebase.app()
}

const auth = getAuth();

export { auth };
