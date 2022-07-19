import React from "react";
import LevelOne from "../Maps/LevelOne";
import { useEffect, useState } from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/database";
import FirebaseService from "../Services/FirebaseService";
import { VStack, Text, HStack } from "@chakra-ui/react";

export default function GameScreen() {
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
        <HStack marginBottom="10px">
          <Text
            margin="0"
            lineHeight="1.15"
            fontSize={["1.5em", "2em", "3em", "4em"]}
            fontWeight="600"
          >
            DeFi Hero
          </Text>
        </HStack>
        <LevelOne />
      </VStack>
    </div>
  );
}
