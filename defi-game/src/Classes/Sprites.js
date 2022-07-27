import { Howl } from "howler";

class Sprite {
  constructor({ position, velocity, image, frames = { max: 1 }, sprites,id,val=0,charType,nickname }) {
    this.position = position;
    this.id=id
    this.image = image;
    this.frames = { ...frames,val, elapsed: 0 };
    this.image.onload = () => {
      this.width = this.image.width / this.frames.max;
      this.height = this.image.height;
    };
    this.moving = false;
    this.sprites = sprites;
    this.charType=charType
    this.nickname=nickname
  }

  draw(canvas, multi = false,background) {
    const ctx = canvas.getContext("2d");

    const shadow=new Image();
    shadow.src="/effects/Shadow.png"


    if (multi) {
      const shadow_x=(this.position.x+background.x_offset+this.image.width / this.frames.max/2)-shadow.width/2
      const shadow_y=(this.position.y+background.y_offset)+this.image.height/1.4
      ctx.drawImage(shadow,shadow_x,shadow_y)
      ctx.drawImage(
        this.image,
        this.frames.val * (this.image.width / this.frames.max),
        0,
        this.image.width / this.frames.max,
        this.image.height,
        this.position.x+background.x_offset,
        this.position.y+background.y_offset,
        this.image.width / this.frames.max,
        this.image.height
      );

      ctx.fillStyle = "blue";
      ctx.fillText(this.nickname, this.position.x+background.x_offset, this.position.y+background.y_offset-5);

      return;
    }

    const shadow_x=(this.position.x+this.width/2)-shadow.width/2
    const shadow_y=this.position.y+this.height/1.4
    ctx.drawImage(shadow,shadow_x,shadow_y)

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

    ctx.fillStyle = "red";
    ctx.beginPath();
    ctx.moveTo(this.position.x+15, this.position.y-15);
    ctx.lineTo(this.position.x+this.width-15, this.position.y-15);
    ctx.lineTo(this.position.x+this.width/2, this.position.y-5);
    ctx.fill();

    ctx.fillText(this.nickname, this.position.x, this.position.y-20);


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

class Background{
  constructor({ position, image, offset}) {
    this.position = position;
    this.offset = offset;
    this.image = image;
    this.image.onload = () => {
      this.width = this.image.width ;
      this.height = this.image.height;
    };
  }

  draw(canvas) {
    const ctx = canvas.getContext("2d");

    ctx.drawImage(
      this.image,
      this.offset.x,
      this.offset.y,
      this.image.width ,
      this.image.height,
      this.position.x,
      this.position.y,
      this.image.width ,
      this.image.height
    );
  }
}

class Magic {
  constructor({
    position,
    velocity,
    image,
    frames = { max: 1 },
    direction = "down",
  }) {
    this.position = position;
    this.image = image;
    this.frames = { ...frames, val: 0, elapsed: 0 };
    this.image.onload = () => {
      this.width = this.image.width / this.frames.max;
      this.height = this.image.height;
    };
    this.used = false;
    this.direction = direction;
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

export default { Sprite, Magic,Background };
