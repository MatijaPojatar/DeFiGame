import React, { useRef, useEffect } from "react";

export default function Board() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const image = new Image();
    image.src = "/clear_maps/FirstLevel.png";

    const playerImage = new Image();
    playerImage.src = "/sprites/player/playerDown.png";

    //sprites

    class Sprite {
      constructor({ position, velocity, image }) {
        this.position = position;
        this.image = image;
      }

      draw() {
        ctx.drawImage(this.image, this.position.x, this.position.y);
      }
    }

    const background = new Sprite({
      position: {
        x: 0,
        y: 0,
      },
      image: image,
    });

    //movement

    const keys = {
      w: {
        pressed: false,
      },
      a: {
        pressed: false,
      },
      s: {
        pressed: false,
      },
      d: {
        pressed: false,
      },
    };

    let lastKey=""

    window.addEventListener("keydown", (e) => {
      switch (e.key) {
        case "w": {
          keys.w.pressed = true;
          lastKey='w'
          break;
        }
        case "a": {
          keys.a.pressed = true;
          lastKey='a'
          break;
        }
        case "d": {
          keys.d.pressed = true;
          lastKey='d'
          break;
        }
        case "s": {
          keys.s.pressed = true;
          lastKey='s'
          break;
        }
      }
    });

    window.addEventListener("keyup", (e) => {
      switch (e.key) {
        case "w": {
          keys.w.pressed = false;
          break;
        }
        case "a": {
          keys.a.pressed = false;
          break;
        }
        case "d": {
          keys.d.pressed = false;
          break;
        }
        case "s": {
          keys.s.pressed = false;
          break;
        }
      }
    });

    //animation

    function animate() {
      window.requestAnimationFrame(animate);
      background.draw();

      ctx.drawImage(
        playerImage,
        0,
        0,
        playerImage.width / 4,
        playerImage.height,
        canvas.width / 2 - playerImage.width / 4 / 2,
        canvas.height / 2 - playerImage.width / 4 / 2,
        playerImage.width / 4,
        playerImage.height
      );

      if (keys.w.pressed && lastKey === 'w') background.position.y = background.position.y + 3;
      else if(keys.s.pressed && lastKey === 's') background.position.y = background.position.y - 3;
      else if(keys.a.pressed && lastKey === 'a') background.position.x = background.position.x + 3;
      else if(keys.d.pressed && lastKey === 'd') background.position.x = background.position.x - 3;
    }
    animate();
  }, []);

  return (
    <canvas id="canvas" ref={canvasRef} width="1024px" height="576px"></canvas>
  );
}
