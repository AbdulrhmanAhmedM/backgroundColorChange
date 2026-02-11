const canvas = document.querySelector("canvas");
const draw = canvas.getContext("2d");

canvas.height = window.innerHeight - 1.5;
canvas.width = window.innerWidth - 1.5;

let mouse = {
  X: undefined,
  Y: undefined,
};

let maxRad = 40;

class circle {
  constructor(px, py, rad, sAng, eAng, isClockWise, sColor, fColor, dx, dy) {
    this.px = px || 105;
    this.py = py || 105;
    this.rad = rad || 30;
    this.sAng = sAng || 0;
    this.eAng = eAng || Math.PI * 2;
    this.isClockWise = isClockWise || false;
    this.sColor = sColor || `rgb(0,0,0)`;
    this.fColor = fColor || `rgb(0,0,0)`;
    this.dx = dx;
    this.dy = dy;
    this.originRad = this.rad
  }

  draw() {
    draw.beginPath();
    draw.arc(
      this.px,
      this.py,
      Math.abs(this.rad),
      this.sAng,
      this.eAng,
      this.isClockWise,
    );
    draw.strokeStyle = this.sColor;
    draw.fillStyle = this.fColor;
    draw.stroke();
    draw.fill();
  }

  update() {
    this.px += this.dx;
    this.py += this.dy;

    if (this.px + this.rad >= canvas.width) {
      this.dx = -this.dx;
    } else if (this.px - this.rad <= canvas.clientLeft) {
      this.dx = -this.dx;
    } else if (this.py + this.rad >= canvas.height) {
      this.dy = -this.dy;
    } else if (this.py - this.rad <= canvas.offsetTop) {
      this.dy = -this.dy;
    }

    // interactivity
    if (
      mouse.X - this.px <= 50 &&
      mouse.X - this.px >= -50 &&
      mouse.Y - this.py <= 50 &&
      mouse.Y - this.py >= -50
    ) {
      if (this.rad < maxRad) {
        this.rad += 1;
      }
    } else if (this.rad > this.originRad) {
      this.rad -= 1;
    }
  }
}

let circles = [];

window.addEventListener("mousemove", function (event) {
  mouse.X = event.x;
  mouse.Y = event.y;
});

for (let i = 0; i < 200; i++) {
  let px1 = Math.random() * canvas.width;
  let px2 = Math.random() * canvas.width;
  let px3 = Math.random() * canvas.width;

  let py1 = Math.random() * canvas.height;
  let py2 = Math.random() * canvas.height;
  let py3 = Math.random() * canvas.height;

  let rad1 = Math.random() * 15;
  let rad2 = Math.random() * 15;
  let rad3 = Math.random() * 15;

  let directionX = Math.random();
  let directiony = Math.random();

  let speedX = Math.random() * 2;
  let speedY = Math.random() * 2;

  circles.push(
    new circle(
      px1 >= canvas.width / 4 ? px1 : canvas.width / 4,
      py1 >= canvas.height / 4 ? py1 : canvas.height / 4,
      rad1,
      null,
      null,
      false,
      "rgb(44, 62, 80)",
      "rgb(44, 62, 80)",
      directionX >= 0.5 ? speedX : -speedX,
      directiony >= 0.5 ? speedY : -speedY,
    ),
  );
  circles.push(
    new circle(
      px2 >= canvas.width / 4 ? px2 : canvas.width / 4,
      py2 >= canvas.height / 4 ? py2 : canvas.height / 4,
      rad2,
      null,
      null,
      false,
      "rgb(224, 76, 60)",
      "rgb(224, 76, 60)",
      directionX >= 0.5 ? speedX : -speedX,
      directiony >= 0.5 ? speedY : -speedY,
    ),
  );
  circles.push(
    new circle(
      px3 >= canvas.width / 4 ? px3 : canvas.width / 4,
      py3 >= canvas.height / 4 ? py3 : canvas.height / 4,
      rad3,
      null,
      null,
      false,
      "rgb(236, 243, 245)",
      "rgb(236, 243, 245)",
      directionX >= 0.5 ? speedX : -speedX,
      directiony >= 0.5 ? speedY : -speedY,
    ),
  );
}

function animate() {
  requestAnimationFrame(animate);
  draw.clearRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < circles.length; i++) {
    let Circle = circles[i];
    Circle.draw();
    Circle.update();
  }
}

animate();
