const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d");

canvas.width = innerWidth;
canvas.height = innerHeight;

class Partical {
  constructor(x, y) {
    this.r = Math.random() * 7 + 1;
    this.speed = Math.random() * 3 + 1;
    this.color = `hsl(${Math.random() * 255}, 100%, 50%)`;
    this.x = x;
    this.y = y;
    this.dx = Math.sin(this.speed * Math.PI);
    this.dy = Math.cos(this.speed * Math.PI);
  }
  update() {
    this.x += this.dx;
    this.y += this.dy;

    this.draw();
  }

  draw() {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
    ctx.fill();
    ctx.closePath();
  }
}
const points = [];
canvas.addEventListener("mousemove", _event);

function _event(e) {
  points.push(new Partical(e.offsetX, e.offsetY));
  if (points.length > 50) points.shift();
}

function anmate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  points.forEach((point) => point.update());

  requestAnimationFrame(anmate);
}
anmate();
document.body.appendChild(canvas);

// // notfication
// Notification.requestPermission()
//   .then((data) => {
//     if (data == "granted")
//       new Notification("this is title", {
//         silent: false,
//         body: "body lorem ipsom",
//         icon: "./trueemit.png",
//       });
//   })
//   .catch((err) => console.log({ err }));
