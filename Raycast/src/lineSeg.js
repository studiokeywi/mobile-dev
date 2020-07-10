export class Segment {
  constructor(px, py, qx, qy) {
    this.points = [px, py, qx, qy];
  }

  draw() {
    line(...this.points);
  }
}