import React, { useRef, useEffect } from "react";
import Collisions from "../Constants/Collisions";
import { Howl, Howler } from "howler";

export default function Board() {
  const canvasRef = useRef(null);

  class Sprite {
    constructor({ position, velocity, image, frames = { max: 1 }, sprites }) {
      this.position = position;
      this.image = image;
      this.frames = { ...frames, val: 0, elapsed: 0 };
      this.image.onload = () => {
        this.width = this.image.width / this.frames.max;
        this.height = this.image.height;
      };
      this.moving = false;
      this.sprites = sprites;
    }

    draw(canvas) {
      const ctx = canvas.getContext("2d");
      ctx.drawImage(
        this.image,
        this.frames.val * this.width,
        0,
        this.image.width / this.frames.max,
        this.image.height,
        this.position.x,
        this.position.y,
        this.image.width / this.frames.max,
        this.image.height
      );
      if (this.moving) {
        if (this.frames.max > 1) {
          this.frames.elapsed++;
        }

        if (this.frames.elapsed % 10 === 0) {
          if (this.frames.val < this.frames.max - 1) this.frames.val++;
          else this.frames.val = 0;
        }
      }
    }
  }

  class Boundary {
    static width = 48;
    static height = 48;
    constructor({ position }) {
      this.position = position;
      this.width = 48;
      this.height = 48;
    }

    draw(ctx) {
      ctx.fillStyle = "rgba(255,0,0,0)";
      ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
    }
  }

  const getCollisions = () => {
    let collisionMapTemp = [];
    for (let i = 0; i < Collisions.collisionsFirstLevel.length; i += 70) {
      collisionMapTemp.push(Collisions.collisionsFirstLevel.slice(i, i + 70));
    }
    let boundaries = [];
    collisionMapTemp.forEach((row, i) => {
      row.forEach((symbol, j) => {
        if (symbol === 1025) {
          boundaries.push(
            new Boundary({
              position: {
                x: j * Boundary.width,
                y: i * Boundary.height,
              },
            })
          );
        }
      });
    });

    return boundaries;
  };

  useEffect(() => {
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

    const background = new Sprite({
      position: {
        x: 0,
        y: 0,
      },
      image: image,
    });

    const player = new Sprite({
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

    const foreground = new Sprite({
      position: {
        x: 0,
        y: 0,
      },
      image: foregroundImage,
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

    let lastKey = "";

    window.addEventListener("keydown", (e) => {
      switch (e.key) {
        case "w": {
          keys.w.pressed = true;
          lastKey = "w";
          break;
        }
        case "a": {
          keys.a.pressed = true;
          lastKey = "a";
          break;
        }
        case "d": {
          keys.d.pressed = true;
          lastKey = "d";
          break;
        }
        case "s": {
          keys.s.pressed = true;
          lastKey = "s";
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

    //collisions

    let boundaries = getCollisions();
    //animation

    let movables = [background, foreground, ...boundaries];

    function rectangularCollision({ rectangle1, rectangle2 }) {
      return (
        rectangle1.position.x + rectangle1.width >= rectangle2.position.x &&
        rectangle1.position.x <= rectangle2.position.x + rectangle2.width &&
        rectangle1.position.y <= rectangle2.position.y + rectangle2.height &&
        rectangle1.position.y + rectangle1.height >= rectangle2.position.y
      );
    }

    function animate() {
      window.requestAnimationFrame(animate);
      background.draw(canvas);
      boundaries.forEach((b) => {
        b.draw(ctx);
      });
      player.draw(canvas);
      foreground.draw(canvas);

      let moving = true;
      player.moving = false;
      if (keys.w.pressed && lastKey === "w") {
        player.moving = true;
        player.image = player.sprites.up;
        for (let i = 0; i < boundaries.length; i++) {
          const boundary = boundaries[i];
          if (
            rectangularCollision({
              rectangle1: player,
              rectangle2: {
                ...boundary,
                position: {
                  x: boundary.position.x,
                  y: boundary.position.y + 1,
                },
              },
            })
          ) {
            moving = false;
            break;
          }
        }
        if (moving) {
          movables.forEach((movable) => {
            movable.position.y += 3;
          });
        }
      } else if (keys.s.pressed && lastKey === "s") {
        player.moving = true;
        player.image = player.sprites.down;
        for (let i = 0; i < boundaries.length; i++) {
          const boundary = boundaries[i];
          if (
            rectangularCollision({
              rectangle1: player,
              rectangle2: {
                ...boundary,
                position: {
                  x: boundary.position.x,
                  y: boundary.position.y - 1,
                },
              },
            })
          ) {
            moving = false;
            break;
          }
        }
        if (moving) {
          movables.forEach((movable) => {
            movable.position.y -= 3;
          });
        }
      } else if (keys.a.pressed && lastKey === "a") {
        player.moving = true;
        player.image = player.sprites.left;
        for (let i = 0; i < boundaries.length; i++) {
          const boundary = boundaries[i];
          if (
            rectangularCollision({
              rectangle1: player,
              rectangle2: {
                ...boundary,
                position: {
                  x: boundary.position.x + 1,
                  y: boundary.position.y,
                },
              },
            })
          ) {
            moving = false;
            break;
          }
        }
        if (moving) {
          movables.forEach((movable) => {
            movable.position.x += 3;
          });
        }
      } else if (keys.d.pressed && lastKey === "d") {
        player.moving = true;
        player.image = player.sprites.right;
        for (let i = 0; i < boundaries.length; i++) {
          const boundary = boundaries[i];
          if (
            rectangularCollision({
              rectangle1: player,
              rectangle2: {
                ...boundary,
                position: {
                  x: boundary.position.x - 1,
                  y: boundary.position.y,
                },
              },
            })
          ) {
            moving = false;
            break;
          }
        }
        if (moving) {
          movables.forEach((movable) => {
            movable.position.x -= 3;
          });
        }
      }
    }
    animate();

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
