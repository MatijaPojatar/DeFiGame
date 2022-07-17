import CalculationService from "./CalculationService";

function animateMovement(
  player,
  background,
  foreground,
  movables,
  canvas,
  boundaries,
  ctx,
  fireball
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

  function animate() {
    window.requestAnimationFrame(() => {
      animate();
    });
    background.draw(canvas);
    boundaries.forEach((b) => {
      b.draw(ctx);
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
      if(!fireball.used)fireball.direction="up"
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
      if(!fireball.used)fireball.direction="down"
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
      if(!fireball.used)fireball.direction="left"
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
      if(!fireball.used)fireball.direction="right"
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
        console.log("FIREBALL")
        if(!fireball.used)fireball.position={x:player.position.x,y:player.position.y}
        fireball.used=true
    }
  }
  animate();
}

export default { animateMovement };
