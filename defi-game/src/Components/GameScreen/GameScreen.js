import React from "react";
import { useEffect, useState } from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/database";
import FirebaseService from "../../Services/FirebaseService";
import { VStack, Text, HStack } from "@chakra-ui/react";
import "./GameScreen.css";
import Board from "../Board/Board";
import CharSelect from "../CharSelect/CharSelect";
import ChatBox from "../ChatBox/ChatBox";

export default function GameScreen() {
  const [loading, setLoading] = useState(true);
  const [showCharSelect, setShowCharSelect] = useState(true);
  const [boardWidth, setBoardWidth] = useState(1300);
  const [boardHeight, setBoardHeight] = useState(700);
  const [myPlayer, setMyPlayer] = useState({});
  const [config, setConfig] = useState({});
  const [charType, setCharType] = useState("");
  const [messages, setMessages] = useState([]);

  const backgroundImage = "/clear_maps/FirstLevel.png";
  const foregroundImage = "/foregrounds/foregroundFirstLevel.png";

  const callbackLog = (myPlayerTemp, isNewPlayer, configTemp) => {
    console.log(isNewPlayer);
    console.log(myPlayerTemp);
    console.log(config);
    setShowCharSelect(isNewPlayer);
    setMyPlayer(myPlayerTemp);
    setConfig(configTemp);
    setLoading(false);
    if (!isNewPlayer) {
      FirebaseService.sendMessage("has logged in!",myPlayerTemp.nickname,true)
    }
  };

  const callbackDisconnect=()=>{
    FirebaseService.sendMessage("has logged out!", myPlayer.nickname, true);
  }

  const charSelected = (charTypeSelected, nickname) => {
    const image = new Image();
    image.src = "/sprites/" + charTypeSelected + "/down.png";
    let myPlayerTemp = {
      id: config.playerId,
      x: boardWidth / 2 - image.width / 4 / 2,
      y: boardHeight / 2 - image.width / 4 / 2,
      sprite: "down",
      val: 0,
      charType: charTypeSelected,
      health: 5,
      maxHealth: 5,
      nickname: nickname,
    };
    FirebaseService.sendMessage("has logged in!", myPlayerTemp.nickname, true);
    config.playerRef.set(myPlayerTemp);
    setMyPlayer(myPlayerTemp);
    setCharType(charTypeSelected);
    setShowCharSelect(false);
  };

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

    FirebaseService.setUpChat(setMessages);

    FirebaseService.logMyPlayerV2(charType, callbackLog,callbackDisconnect);
  }, []);

  return (
    <div
      style={{ backgroundImage: "url(/background.jpg)" }}
      className="game-container"
    >
      {!loading ? (
        <>
          {showCharSelect ? (
            <CharSelect charSelected={charSelected} />
          ) : (
            <>
              <Board
                backgroundImageSrc={backgroundImage}
                foregroundImageSrc={foregroundImage}
                playerDownImageSrc={"/sprites/" + charType + "/down.png"}
                playerLeftImageSrc={"/sprites/" + charType + "/left.png"}
                playerUpImageSrc={"/sprites/" + charType + "/up.png"}
                playerRightImageSrc={"/sprites/" + charType + "/right.png"}
                charType={charType}
                config={config}
                myPlayer={myPlayer}
                boardHeight={boardHeight}
                boardWidth={boardWidth}
                className="board"
              />
              <ChatBox messages={messages} nickname={myPlayer.nickname} />
            </>
          )}
        </>
      ) : (
        <div className="spinner-box">
          <div className="configure-border-1">
            <div className="configure-core"></div>
          </div>
          <div className="configure-border-2">
            <div className="configure-core"></div>
          </div>
        </div>
      )}
    </div>
  );
}
