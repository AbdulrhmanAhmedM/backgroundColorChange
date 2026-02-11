// get context
const canvas = document.querySelector("canvas");
const draw = canvas.getContext("2d");

// make the world fullScreen
canvas.height = window.innerHeight - 1.5;
canvas.width = window.innerWidth - 1.5;
// world object
const world = {
  gravity: 9.8,
};
// ball class object for easy control of balls
class ball {
  constructor(px, py, rad, sAng, eAng, isClockWise, mass, frame, velocity,forcePower) {
    //ball constructor
    this.px = px;
    this.py = py;
    this.rad = rad;
    this.sAng = sAng;
    this.eAng = eAng;
    this.isClockWise = isClockWise;
    //ball constructor
    // gravity
    this.mass = mass;
    this.frame = frame;
    this.currentVelocity = velocity / this.frame;
    this.finalVelocity = -this.currentVelocity;
    this.force = 0;
    this.resistance = 0.99
    //gravity
    
    //forcePower
    this.vx = forcePower
    //forcePower
  }

  draw() {
    draw.beginPath();
    draw.arc(
      this.px,
      this.py,
      this.rad,
      this.sAng,
      this.eAng,
      this.isClockWise,
    );
    draw.strokeStyle = "rgb(0,0,0)";
    draw.fillStyle = "rgb(255,0,0)";
    // draw.lineWidth = 1
    draw.fill();
    draw.stroke();
  }

  update() {
    this.px += this.vx

    if (this.py + this.rad <= canvas.height) {
      this.py += this.currentVelocity;
      this.currentVelocity += 0.2;

      this.currentVelocity *= this.resistance

    };
    
    if (this.px + this.rad >= canvas.width){
        console.log("hited the wall!")
        this.vx = -this.vx
    } else if (this.px - this.rad <=canvas.offsetLeft){
        this.px = this.rad
        this.vs = -this.vx * 0.7
    }


    if (this.py + this.rad >= canvas.height) {
      this.py = canvas.height - this.rad;
      this.currentVelocity = -this.currentVelocity * 0.7;

      this.force = Math.abs(
        (this.mass * (this.finalVelocity - this.currentVelocity)) / this.frame,
      );
      
      if (this.force <= 0.1){
        this.currentVelocity = 0;
        this.force = 0;
      }
    }
  }
}

let Ball = new ball(
  canvas.width / 2,
  canvas.height / 2,
  30,
  0,
  Math.PI * 2,
  false,
  60,
  60,
  2,
  0,
);

function animate() {
  requestAnimationFrame(animate);
  draw.clearRect(0, 0, innerWidth, innerHeight);

  Ball.draw();
  Ball.update();
}

animate();
