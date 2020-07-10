import { Segment } from './lineSeg.js';
import { Ray } from './ray.js'

let bgColor;
let nextColor = () => bgColor = (bgColor + 0.1) % 360;
const walls = [];
let source;
const rays = [];

const randPt = () => [random(0, width), random(0, height)];

export const setup = () => {
  bgColor = random(100);
  createCanvas(400, 300);
  colorMode(HSL);
  background(bgColor);
  for (let i = 3; i--;) {
    Array(3).fill().map(() => randPt()).forEach((pt, i, shape) => {
      walls.push(new Segment(...pt, ...(!i ? shape[shape.length - 1] : shape[i - 1])));
    })
  }
  walls.push(
    new Segment(0, 0, width, 0),
    new Segment(0, 0, 0, height),
    new Segment(width, 0, width, height),
    new Segment(0, height, width, height),
  )
  source = [0, 0];
  rays.push(...Array(360).fill().map((_, i) => new Ray(...source, i, 75)));
}

export const draw = () => {
  background(nextColor(), 75 + 25 * sin(bgColor * 0.2), 50);
  stroke(0);
  walls.forEach(wall => wall.draw());
  stroke((bgColor + 180) % 360, 75 + 25 * cos(bgColor * 0.2), 50, 0.25);
  source = [mouseX, mouseY];
  rays.forEach(ray => {
    ray.pos = source;
    const wallHits = walls.map(wall => ray.cast(wall)).filter(({ hit }) => hit);
    if (!wallHits) return;
    const nearest = Math.min(...wallHits.map(({ dist }) => dist));
    const closest = wallHits.find(({ dist }) => nearest === dist);
    if (closest) line(...ray.pos, ...closest.point)
  });
}