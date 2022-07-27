import CalculationService from "./CalculationService";
import Sprites from "../Classes/Sprites";

function animateMovement(
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
) {

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
    j: {
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
      case "j": {
        keys.j.pressed = true;
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
      case "j": {
        keys.j.pressed = false;
        break;
      }
    }
  });

  const callbackLoadPlayers = () => {
    let allPlayerSprites = [];
    if (Object.keys(players).length) {
      Object.keys(players).forEach((key) => {
        let tempImg = new Image();
        tempImg.src="/sprites/"+players[key].nickname+"/"+players[key].sprite+".png"
  
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
            val: players[key].val,
          })
        );
      });
    }
    //console.log(allPlayerSprites)
    return allPlayerSprites;
  };
  
  const callbackSave = (x, y, direction, val, nickname) => {
    if (config.playerRef !== undefined) {
      config.playerRef.set({
        id: config.playerId,
        x: x,
        y: y,
        sprite: direction,
        val: val,
        nickname: nickname,
      });
    }
  };

  function animate() {
    window.requestAnimationFrame(() => {
      animate();
    });
    let otherPlayers = callbackLoadPlayers(players);
    background.draw(canvas);
    boundaries.forEach((b) => {
      b.draw(ctx);
    });
    if (otherPlayers)
      otherPlayers.forEach((p) => {
        p.draw(canvas,true,{x_offset:background.position.x,y_offset:background.position.y});
      });
    player.draw(canvas);
    foreground.draw(canvas);
    fireball.draw(canvas);

    //moving

    let moving = true;
    player.moving = false;
    if (keys.w.pressed && lastKey === "w") {
      player.moving = true;
      player.image = player.sprites.up;
      if (!fireball.used) fireball.direction = "up";
      for (let i = 0; i < boundaries.length; i++) {
        const boundary = boundaries[i];
        if (
          CalculationService.rectangularCollision({
            rectangle1: player,
            rectangle2: {
              ...boundary,
              position: {
                x: boundary.position.x,
                y: boundary.position.y + 3,
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
      if (!fireball.used) fireball.direction = "down";
      for (let i = 0; i < boundaries.length; i++) {
        const boundary = boundaries[i];
        if (
          CalculationService.rectangularCollision({
            rectangle1: player,
            rectangle2: {
              ...boundary,
              position: {
                x: boundary.position.x,
                y: boundary.position.y - 3,
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
      if (!fireball.used) fireball.direction = "left";
      for (let i = 0; i < boundaries.length; i++) {
        const boundary = boundaries[i];
        if (
          CalculationService.rectangularCollision({
            rectangle1: player,
            rectangle2: {
              ...boundary,
              position: {
                x: boundary.position.x + 3,
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
      if (!fireball.used) fireball.direction = "right";
      for (let i = 0; i < boundaries.length; i++) {
        const boundary = boundaries[i];
        if (
          CalculationService.rectangularCollision({
            rectangle1: player,
            rectangle2: {
              ...boundary,
              position: {
                x: boundary.position.x - 3,
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

    //magic
    if (keys.j.pressed) {
      console.log("FIREBALL");
      if (!fireball.used)
        fireball.position = { x: player.position.x, y: player.position.y };
      fireball.used = true;
    }

    //save changes
    let direction;
    if(player.image.src.toLowerCase().includes("up")){
      direction="up"
    }
    else if(player.image.src.toLowerCase().includes("left")){
      direction="left"
    }
    else if(player.image.src.toLowerCase().includes("right")){
      direction="right"
    }
    else{
      direction="down"
    }
    callbackSave(player.position.x-background.position.x,player.position.y-background.position.y,direction,player.frames.val,player.nickname)

  }
  animate();
}

export default { animateMovement };
