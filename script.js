const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
document.body.appendChild(canvas);

canvas.width = window.innerWidth * 4;
canvas.height = window.innerHeight * 4;

const cx = canvas.width / 2;
const cy = canvas.height / 2;

const unit = Math.min(cx, cy) / 50;
const color = { hue: [0, 360], saturation: [100, 100], lightness: [60, 60] };

const triangle = [[0, 0], [0, - 25 * unit], [5 * unit, - 15 * unit], color];
const petalCount = 36;

ctx.translate(cx, cy);

drawFlower(petalCount, triangle)

function drawTriangle(p1, p2, p3, color) {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.moveTo(...p1);
  ctx.lineTo(...p2);
  ctx.lineTo(...p3);
  ctx.closePath();
  ctx.fill();
}

function drawFlower(petalCount, shape) {
  const [p1, p2, p3, color] = shape;
  const { hue, saturation, lightness } = color;
  for (let i = 0; i < petalCount; i++) {
    const angle = i * 2 * Math.PI;
    ctx.save();
    ctx.rotate(angle / petalCount);
    const color = `hsl(${hue[0] + (hue[1] - hue[0]) * i / petalCount}, ${saturation[0] + (saturation[1] - saturation[0]) * i / petalCount}%, ${lightness[0] + (lightness[1] - lightness[0]) * i / petalCount}%)`;
    drawTriangle(p1, p2, p3, color);
    ctx.restore();
  }
}