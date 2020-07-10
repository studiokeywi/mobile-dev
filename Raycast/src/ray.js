export class Ray {
  constructor(x, y, dir) {
    this.pos = [x, y];
    this.setDir(dir);
  }

  setDir(dir) {
    this.dir = Object.values(p5.Vector.fromAngle(radians(dir)));
  }
  get end() {
    return this.pos.map((n, i) => n + this.dir[i]);
  }

  draw() {
    line(...this.pos, ...this.end);
  }

  cast({ points }) {
    const [x1, y1, x2, y2] = points;
    const [x3, y3, x4, y4] = [...this.pos, ...this.end];
    const tNum = (x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4);
    const uNum = (x1 - x2) * (y1 - y3) - (y1 - y2) * (x1 - x3)
    const denom = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);
    const t = tNum / denom;
    const u = -(uNum / denom);
    const hit = (0 < t && 1 > t) && 0 < u;
    const point = hit ? [x1 + t * (x2 - x1), y1 + t * (y2 - y1)] : null;
    const dist = hit ? (point[0] - x3) ** 2 + (point[1] - y3) ** 2 : 0;
    return { dist, hit, t, u, point };
  }
}