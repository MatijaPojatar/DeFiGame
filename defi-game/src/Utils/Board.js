import React, { useRef, useEffect } from "react";
import { Howl } from "howler";
import Sprites from "../Classes/Sprites";
import AnimationService from "../Services/AnimationService";
import UtilsService from "../Services/UtilsService";

export default function Board() {
  const canvasRef = useRef(null);

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

    const foregroundImage = new Image();
    foregroundImage.src = "/foregrounds/foregroundFirstLevel.png";

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
    });

    const foreground = new Sprites.Sprite({
      position: {
        x: 0,
        y: 0,
      },
      image: foregroundImage,
    });

    //collisions

    let boundaries = UtilsService.getCollisions();
    //animation

    let movables = [background, foreground, ...boundaries];

    AnimationService.animateMovement(
      player,
      background,
      foreground,
      movables,
      canvas,
      boundaries,
      ctx,
    );

    //music
    let clicked = false;
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
    });
  }, []);

  return (
    <canvas id="canvas" ref={canvasRef} width="1024px" height="576px"></canvas>
  );
}
