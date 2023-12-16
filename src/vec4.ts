export class Vec4 {
  private data: Float32Array;
  private offset: number;

  constructor(data: Float32Array, offset: number) {
    this.data = data;
    this.offset = offset;
  }

  public dot(other: Vec4): number {
    return this.x * other.x + this.y * other.y + this.z * other.z + this.w * other.w;
  }

  public cross(other: Vec4): Vec4 {
    return new Vec4(new Float32Array([
      this.y * other.z - this.z * other.y,
      this.z * other.x - this.x * other.z,
      this.x * other.y - this.y * other.x,
      0,
    ]), 0);
  }

  public add(other: Vec4): Vec4 {
    return new Vec4(new Float32Array([
      this.x + other.x,
      this.y + other.y,
      this.z + other.z,
      this.w + other.w,
    ]), 0);
  }

  public sub(other: Vec4): Vec4 {
    return new Vec4(new Float32Array([
      this.x - other.x,
      this.y - other.y,
      this.z - other.z,
      this.w - other.w,
    ]), 0);
  }

  public scale(scalar: number): Vec4 {
    return new Vec4(new Float32Array([
      this.x * scalar,
      this.y * scalar,
      this.z * scalar,
      this.w * scalar,
    ]), 0);
  }

  public normalised(): Vec4 {
    return this.scale(1 / this.magnitude);
  }
 
  public get magnitude(): number {
    return Math.sqrt(this.dot(this));
  }

  public get x(): number {
    return this.data[this.offset];
  }

  public set x(value: number) {
    this.data[this.offset] = value;
  }

  public get y(): number {
    return this.data[this.offset + 1];
  }

  public set y(value: number) {
    this.data[this.offset + 1] = value;
  }

  public get z(): number {
    return this.data[this.offset + 2];
  }

  public set z(value: number) {
    this.data[this.offset + 2] = value;
  }

  public get w(): number {
    return this.data[this.offset + 3];
  }

  public set w(value: number) {
    this.data[this.offset + 3] = value;
  }

  static get zero(): Vec4 {
    return new Vec4(new Float32Array([0, 0, 0, 0]), 0);
  }

  static get one(): Vec4 {
    return new Vec4(new Float32Array([1, 1, 1, 1]), 0);
  }

  static fromArray(arr: number[]): Vec4 {
    return new Vec4(new Float32Array(arr), 0);
  }
}
