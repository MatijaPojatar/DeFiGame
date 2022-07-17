import { Howl } from "howler";

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

class Magic {
  constructor({ position, velocity, image, frames = { max: 1 },direction="down" }) {
    this.position = position;
    this.image = image;
    this.frames = { ...frames, val: 0, elapsed: 0 };
    this.image.onload = () => {
      this.width = this.image.width / this.frames.max;
      this.height = this.image.height;
    };
    this.used = false;
    this.direction=direction
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
    if (this.used) {
      if (this.frames.max > 1) {
        this.frames.elapsed++;
      }

      if (this.frames.elapsed % 10 === 0) {
        if (this.frames.val < this.frames.max - 1) {
          this.frames.val++;
          switch (this.direction) {
            case "up": {
              this.position.y -= 30;
              break;
            }
            case "down": {
              this.position.y += 30;
              break;
            }
            case "left": {
              this.position.x -= 30;
              break;
            }
            case "right": {
              this.position.x += 30;
              break;
            }
          }
        } else {
          this.frames.val = 0;
          var sound = new Howl({
            src: ["soundeffect/fireball.wav"],
            html5: true,
          });
  
          sound.play();
          this.used = false;
        }
      }
    }
  }
}

export default { Sprite, Magic };
