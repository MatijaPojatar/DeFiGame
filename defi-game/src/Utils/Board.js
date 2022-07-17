import React, { useRef, useEffect } from "react";
import { Howl } from "howler";
import Sprites from "../Classes/Sprites";
import AnimationService from "../Services/AnimationService";
import UtilsService from "../Services/UtilsService";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/database";

export default function Board() {
  const canvasRef = useRef(null);
  let players = {};

  useEffect(() => {
    //init

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const image = new Image();
    image.src = "/clear_maps/FirstLevel.png";

    const playerUpImage = new Image();
    playerUpImage.src = "/sprites/player/playerUp.png";
    const playerDownImage = new Image();
    playerDownImage.src = "/sprites/player/playerDown.png";
    const playerRightImage = new Image();
    playerRightImage.src = "/sprites/player/playerRight.png";
    const playerLeftImage = new Image();
    playerLeftImage.src = "/sprites/player/playerLeft.png";

    const girlUpImage = new Image();
    girlUpImage.src = "/sprites/girl_char/girl_char_up.png";
    const girlDownImage = new Image();
    girlDownImage.src = "/sprites/girl_char/girl_char_down.png";
    const girlRightImage = new Image();
    girlRightImage.src = "/sprites/girl_char/girl_char_right.png";
    const girlLeftImage = new Image();
    girlLeftImage.src = "/sprites/girl_char/girl_char_left.png";

    const foregroundImage = new Image();
    foregroundImage.src = "/foregrounds/foregroundFirstLevel.png";

    const fireballImage = new Image();
    fireballImage.src = "/magic/fireball.png";

    //multiplayer

    const allPlayersRef = firebase.database().ref("players");

    let playerId;
    let playerRef;

    firebase.auth().onAuthStateChanged((user) => {
      console.log(user);
      if (user) {
        playerId = user.uid;
        playerRef = firebase.database().ref(`players/${playerId}`);

        playerRef.set({
          id: playerId,
          x: canvas.width / 2 - girlDownImage.width / 4 / 2,
          y: canvas.height / 2 - girlDownImage.width / 4 / 2,
          sprite: "down",
          val:0,
          nickname: "girl",
        });

        playerRef.onDisconnect().remove();
      } else {
      }
    });

    allPlayersRef.on("value", (snapshot) => {
      let playersTemp = snapshot.val() || {};
      Object.keys(playersTemp).forEach((key) => {
        if (key === playerId) return;
        players[key] = playersTemp[key];
      });
    });

    allPlayersRef.on("child_added", (snapshot) => {
      const addedPlayer = snapshot.val();
      console.log("NEW PLAYER");
      console.log(addedPlayer);
      if (addedPlayer.id !== playerId) {
        players[addedPlayer.id] = addedPlayer;
      }
    });

    const callbackLoadPlayers = () => {
      let allPlayerSprites = [];
      if (Object.keys(players).length) {
        Object.keys(players).forEach((key) => {
          let tempImg=new Image();
          if(players[key].sprite==="up"){
            console.log("UP")
            console.log(players[key].nickname)
            switch(players[key].nickname){
              case "girl":{
                console.log("UP GIRL")
                tempImg.src = "/sprites/girl_char/girl_char_up.png";
                break;
              }
              case "player":{
                tempImg.src = "/sprites/player/playerUp.png";
                break;
              }
            }
          }else if(players[key].sprite==="left"){
            switch(players[key].nickname){
              case "girl":{
                tempImg.src = "/sprites/girl_char/girl_char_left.png";
                break;
              }
              case "player":{
                tempImg.src = "/sprites/player/playerLeft.png";
                break;
              }
            }
          }else if(players[key].sprite==="right"){
            switch(players[key].nickname){
              case "girl":{
                tempImg.src = "/sprites/girl_char/girl_char_right.png";
                break;
              }
              case "player":{
                tempImg.src = "/sprites/player/playerRight.png";
                break;
              }
            }
          }else{
            switch(players[key].nickname){
              case "girl":{
                tempImg.src = "/sprites/girl_char/girl_char_down.png";
                break;
              }
              case "player":{
                tempImg.src = "/sprites/player/playerDown.png";
                break;
              }
            }
          }

          allPlayerSprites.push(
            new Sprites.Sprite({
              position: {
                x: players[key].x,
                y: players[key].y,
              },
              id: key,
              image: tempImg,
              frames: {
                max: 4,
              },
              sprites: {
                up: playerUpImage,
                down: playerDownImage,
                right: playerRightImage,
                left: playerLeftImage,
              },
              val:players[key].val
            })
          );
        });
      }
      //console.log(allPlayerSprites)
      return allPlayerSprites;
    };

    const callbackSave = (x, y,direction,val,nickname) => {
      if (playerRef !== undefined) {
        playerRef.set({
          id: playerId,
          x: x,
          y: y,
          sprite: direction,
          val:val,
          nickname: nickname
        });
      }
    };

    //sprites

    const background = new Sprites.Sprite({
      position: {
        x: 0,
        y: 0,
      },
      image: image,
    });

    const girl = new Sprites.Sprite({
      position: {
        x: canvas.width / 2 - girlDownImage.width / 4 / 2,
        y: canvas.height / 2 - girlDownImage.width / 4 / 2,
      },
      id: playerId,
      image: girlDownImage,
      frames: {
        max: 4,
      },
      sprites: {
        up: girlUpImage,
        down: girlDownImage,
        right: girlRightImage,
        left: girlLeftImage,
      },
      nickname: "girl"
    });

    const foreground = new Sprites.Sprite({
      position: {
        x: 0,
        y: 0,
      },
      image: foregroundImage,
    });

    const fireball = new Sprites.Magic({
      position: {
        x: 0,
        y: 0,
      },
      image: fireballImage,
      frames: {
        max: 7,
      },
    });

    //collisions

    let boundaries = UtilsService.getCollisions();
    //animation

    let movables = [background, foreground, ...boundaries];

    AnimationService.animateMovement(
      girl,
      background,
      foreground,
      movables,
      canvas,
      boundaries,
      ctx,
      fireball,
      callbackLoadPlayers,
      callbackSave
    );

    //music
    /**let clicked = false;
    window.addEventListener("click", () => {
      if (!clicked) {
        clicked = true;
        var sound = new Howl({
          src: ["music/theme.mp3"],
          html5: true,
          autoplay: true,
          loop: true,
        });

        sound.play();
      }
    });*/
  }, []);

  return (
    <canvas id="canvas" ref={canvasRef} width="1024px" height="576px"></canvas>
  );
}
