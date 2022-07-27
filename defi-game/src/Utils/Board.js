import React, { useRef, useEffect } from "react";
import { Howl } from "howler";
import Sprites from "../Classes/Sprites";
import AnimationService from "../Services/AnimationService";
import UtilsService from "../Services/UtilsService";
import FirebaseService from "../Services/FirebaseService";
import "firebase/compat/auth";
import "firebase/compat/database";
import firebase from "firebase/compat/app";

export default function Board({backgroundImageSrc,foregroundImageSrc,playerUpImageSrc,playerDownImageSrc,playerLeftImageSrc,playerRightImageSrc}) {
  const canvasRef = useRef(null);
  let players = {};

  let config = { playerId: undefined, playerRef: undefined };

  useEffect(() => {
    async function init() {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");

      const image = new Image();
      console.log(backgroundImageSrc)
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

      //multiplayer

      FirebaseService.logMyPlayer(config, canvas, playerDownImage);
      FirebaseService.setUpPlayers(players, config);

      //sprites

      const background = new Sprites.Sprite({
        position: {
          x: 0,
          y: 0,
        },
        image: image,
      });

      const player = new Sprites.Sprite({
        position: {
          x: canvas.width / 2 - playerDownImage.width / 4 / 2,
          y: canvas.height / 2 - playerDownImage.width / 4 / 2,
        },
        id: config.playerId,
        image: playerDownImage,
        frames: {
          max: 4,
        },
        sprites: {
          up: playerUpImage,
          down: playerDownImage,
          right: playerRightImage,
          left: playerLeftImage,
        },
        nickname: "girl",
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
    init()
  }, []);

  return (
    <canvas id="canvas" ref={canvasRef} width="1300px" height="700px"></canvas>
  );
}
