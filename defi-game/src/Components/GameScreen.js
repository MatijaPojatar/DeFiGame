import React from "react";
import LevelOne from "../Maps/LevelOne";
import { useEffect, useState } from "react";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/database';
import FirebaseService from "../Services/FirebaseService";

export default function GameScreen() {

  useEffect(() => {

    firebase.auth().signInAnonymously()
      .then(() => {
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage)
      });
  }, []);

  return <LevelOne/>;
}
