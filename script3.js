const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth - 1.5;
canvas.height = window.innerHeight - 1.5;


let rectangleInfo = {
  width: canvas.width,
  height: canvas.height,
};

class rectangle {
  constructor(w, h, px, py) {
    this.w = w;
    this.h = h;
    this.px = px;
    this.py = py;
    this.H = 0;
    this.S = 100;
    this.B = 50;
  }

  draw() {
    ctx.beginPath();

    ctx.fillStyle = `hsl(${this.H},${this.S}%,${this.B}%)`;
    ctx.strokeStyle = `hsl(${this.H},${this.S}%,${this.B}%)`;
    ctx.fillRect(this.px, this.py, this.w, this.h);
    ctx.strokeRect(this.px, this.py, this.w, this.h);

    ctx.fillStyle = `black`;
    ctx.strokeStyle = `black`;
    ctx.textAlign = "center"
    ctx.textRendering = "optimizeSpeed"
    ctx.measureText("200px")
    ctx.strokeText("HELLO FROM OTHER WORLD",canvas.width / 2,canvas.height / 2,900)
    
}

  update() {
    this.H += 1;

    if (this.H >= 360) {
      this.H = 0;
    }
  }
}
let rect = new rectangle(rectangleInfo.width, rectangleInfo.height, 0, 0);

function animate() {
  requestAnimationFrame(animate);
  ctx.clearRect(0, 0, innerWidth, innerHeight);
  rect.draw();
  rect.update();
}

animate();

window.addEventListener("resize", function () {
  canvas.width = window.innerWidth - 1.5;
  canvas.height = window.innerHeight - 1.5;

  rectangleInfo = {
    width: canvas.width,
    height: canvas.height,
  };

  let rect = new rectangle(rectangleInfo.width, rectangleInfo.height, 0, 0);

  function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, innerWidth, innerHeight);
    rect.draw();
    rect.update();
  }

  animate();
});
