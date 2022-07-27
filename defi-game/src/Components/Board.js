import React, { useRef, useEffect } from "react";
import { Howl } from "howler";
import Sprites from "../Classes/Sprites";
import AnimationService from "../Services/AnimationService";
import UtilsService from "../Services/UtilsService";
import FirebaseService from "../Services/FirebaseService";
import "firebase/compat/auth";
import "firebase/compat/database";
import firebase from "firebase/compat/app";
import Hud from "./Hud";

export default function Board({
  backgroundImageSrc,
  foregroundImageSrc,
  playerUpImageSrc,
  playerDownImageSrc,
  playerLeftImageSrc,
  playerRightImageSrc,
  nickname,
}) {
  const canvasRef = useRef(null);
  let players = {};

  let config = { playerId: undefined, playerRef: undefined, check: false };

  useEffect(() => {
    async function init() {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      
      const playerDownImage = new Image();
      playerDownImage.src = playerDownImageSrc;

      const continueInit = (myPlayer) => {
        console.log(myPlayer);
        const image = new Image();
        image.src = backgroundImageSrc;

        const foregroundImage = new Image();
        foregroundImage.src = foregroundImageSrc;

        const playerUpImage = new Image();
        playerUpImage.src = playerUpImageSrc;
        const playerDownImage = new Image();
        playerDownImage.src = playerDownImageSrc;
        const playerRightImage = new Image();
        playerRightImage.src = playerRightImageSrc;
        const playerLeftImage = new Image();
        playerLeftImage.src = playerLeftImageSrc;

        const fireballImage = new Image();
        fireballImage.src = "/magic/fireball.png";
        const playerImage = new Image();
        switch (myPlayer.sprite) {
          case "down": {
            playerImage.src = playerDownImageSrc;
            break;
          }
          case "up": {
            playerImage.src = playerUpImageSrc;
            break;
          }
          case "right": {
            playerImage.src = playerRightImageSrc;
            break;
          }
          case "left": {
            playerImage.src = playerLeftImageSrc;
            break;
          }
        }

        //wait for images
        setTimeout(() => {}, 3000);

        //sprites

        console.log("===============")
        console.log(-(myPlayer.x-(canvas.width / 2 - playerDownImage.width / 4 / 2)))
        console.log( -(myPlayer.y-(canvas.height / 2 - playerDownImage.width / 4 / 2)))

        const background = new Sprites.Background({
          position: {
            x: -(myPlayer.x-(canvas.width / 2 - playerDownImage.width / 4 / 2)),
            y: -(myPlayer.y-(canvas.height / 2 - playerDownImage.width / 4 / 2)),
          },
          offset: {
            x: 0,
            y: 0,
          },
          image: image,
        });

        const player = new Sprites.Sprite({
          position: {
            x: canvas.width / 2 - playerDownImage.width / 4 / 2,
            y: canvas.height / 2 - playerDownImage.height / 4 / 2,
          },
          id: config.playerId,
          image: playerImage,
          frames: {
            max: 4,
          },
          sprites: {
            up: playerUpImage,
            down: playerDownImage,
            right: playerRightImage,
            left: playerLeftImage,
          },
          nickname:myPlayer.nickname,
        });

        const foreground = new Sprites.Background({
          position: {
            x: -(myPlayer.x-(canvas.width / 2 - playerDownImage.width / 4 / 2)),
            y: -(myPlayer.y-(canvas.height / 2 - playerDownImage.width / 4 / 2)),
          },
          offset: {
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

        let boundaries = UtilsService.getCollisions(background.position);
        //animation

        let movables = [background, foreground, ...boundaries];

        AnimationService.animateMovement(
          player,
          config,
          background,
          foreground,
          movables,
          canvas,
          boundaries,
          ctx,
          fireball,
          players
        );
      };

      //multiplayer

      await FirebaseService.logMyPlayer(
        config,
        canvas,
        playerDownImage,
        continueInit,
        nickname
      );
      await FirebaseService.setUpPlayers(players, config);

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
    }
    init();
  }, []);

  return (
    <>
      <Hud />
      <canvas
        id="canvas"
        ref={canvasRef}
        width="1300px"
        height="700px"
      ></canvas>
    </>
  );
}
