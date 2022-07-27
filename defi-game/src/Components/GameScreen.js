import React from "react";
import LevelOne from "../Maps/LevelOne";
import { useEffect, useState } from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/database";
import FirebaseService from "../Services/FirebaseService";
import { VStack, Text, HStack } from "@chakra-ui/react";

export default function GameScreen({nickname}) {
  useEffect(() => {
    firebase
      .auth()
      .signInAnonymously()
      .then(() => {})
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
      });

  
  }, []);

  return (
    <div style={{ backgroundImage: "url(/background.jpg)" }}>
      <VStack justifyContent="center" alignItems="center" h="100vh">
        <LevelOne nickname={nickname}/>
      </VStack>
    </div>
  );
}
