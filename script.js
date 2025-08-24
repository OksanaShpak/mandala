const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
document.body.appendChild(canvas);

canvas.width = window.innerWidth * 4;
canvas.height = window.innerHeight * 4;
class Shape {
  constructor(color, ...points) {
    this.points = points.map(([x, y]) => [x * unit, y * unit]);
    this.color = color;
  }
}

const cx = canvas.width / 2;
const cy = canvas.height / 2;

const unit = Math.min(cx, cy) / 50;
const color1 = { hue: [0, 360], saturation: [100, 100], lightness: [60, 60] };
const color2 = { hue: [30, 60], saturation: [100, 100], lightness: [60, 60] };

const shape1 = new Shape(color1, [0, 0], [-5, -15], [0, -25], [5, -15]);
const shape2 = new Shape(color2, [20, 20], [15, 5], [25, 15]);

const petalCount = 24;

ctx.translate(cx, cy);

drawFlower(petalCount, shape1, shape2);

function drawPolygon(points, color) {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.moveTo(...points[0]);
  for (let i = 1; i < points.length; i++) {
    ctx.lineTo(...points[i]);
  }
  ctx.closePath();
  ctx.fill();
}

function drawFlower(petalCount, ...petalShapes) {
  for (const petal of petalShapes) {
    const { points, color } = petal;
    const { hue, saturation, lightness } = color;
    for (let i = 0; i < petalCount; i++) {
      const angle = i * 2 * Math.PI;
      const color = calcColor(i, petalCount, hue, saturation, lightness);
      ctx.save();
      ctx.rotate(angle / petalCount);
      drawPolygon(points, color);
      ctx.restore();
    }
  }
}

function calcColor(i, petalCount, hue, saturation, lightness) {
  const firstHalf = i < petalCount / 2;
  const h = firstHalf
    ? hue[0] + (hue[1] - hue[0]) * i / petalCount * 2
    : hue[1] - (hue[1] - hue[0]) * i / petalCount * 2;
  petalCount /= 2;
  const s = firstHalf
    ? saturation[0] + (saturation[1] - saturation[0]) * i / petalCount
    : saturation[1] - (saturation[1] - saturation[0]) * i / petalCount;
  const l = firstHalf
    ? lightness[0] + (lightness[1] - lightness[0]) * i / petalCount
    : lightness[1] - (lightness[1] - lightness[0]) * i / petalCount;

  const color = `hsl(${h}, ${s}%, ${l}%)`;
  return color;
}