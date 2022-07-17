import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getFirestore } from "firebase/firestore/lite"; 
import firebase from 'firebase/compat/app';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API,
  authDomain: "defi-hero-7b739.firebaseapp.com",
  databaseURL:
    "https://defi-hero-7b739-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "defi-hero-7b739",
  storageBucket: "defi-hero-7b739.appspot.com",
  messagingSenderId: "429303155701",
  appId: "1:429303155701:web:089c3f29b3cb52f0b62ebc",
};

const app=firebase.initializeApp(firebaseConfig);

export default {app};
