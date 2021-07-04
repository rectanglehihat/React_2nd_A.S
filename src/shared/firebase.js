import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyCRlTvPSaSMF-6tTinvewhBy2IjQG8cwjg",
    authDomain: "image-community-da97f.firebaseapp.com",
    projectId: "image-community-da97f",
    storageBucket: "image-community-da97f.appspot.com",
    messagingSenderId: "5413504732",
    appId: "1:5413504732:web:f92389ec732e5324441619",
    measurementId: "G-CNPC7GYPLS"
};

firebase.initializeApp(firebaseConfig);

const apiKey = firebaseConfig.apiKey;
const auth = firebase.auth();
const firestore = firebase.firestore();
const storage = firebase.storage();

export{auth, apiKey, firestore, storage};