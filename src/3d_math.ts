// Row-Major, Left-Handed, Post-Multiply Matrix 

class Vec2 {
  data: Float32Array;

  constructor(x: number = 0.0, y: number = 0.0) {
    this.data = new Float32Array(2);
    this.data[0] = x;
    this.data[1] = y;
  }

  get x(): number { return this.data[0]; }
  get y(): number { return this.data[1]; }

  set x(value: number) { this.data[0] = value; }
  set y(value: number) { this.data[1] = value; }

  add(other: Vec2): Vec2 {
    const result = new Vec2();
    result.x = this.x + other.x;
    result.y = this.y + other.y;
    return result;
  }

  subtract(other: Vec2): Vec2 {
    const result = new Vec2();
    result.x = this.x - other.x;
    result.y = this.y - other.y;
    return result;
  }

  scale(scalar: number): Vec2 {
    const result = new Vec2();
    result.x = this.x * scalar;
    result.y = this.y * scalar;
    return result;
  }
}

class Vec3 {
  data: Float32Array;

  constructor(x: number = 0.0, y: number = 0.0, z: number = 0.0) {
    this.data = new Float32Array(3);
    this.data[0] = x;
    this.data[1] = y;
    this.data[2] = z;
  }

  // Position

  get x(): number { return this.data[0]; }
  get y(): number { return this.data[1]; }
  get z(): number { return this.data[2]; }

  set x(value: number) { this.data[0] = value; }
  set y(value: number) { this.data[1] = value; }
  set z(value: number) { this.data[2] = value; }
 
  // Colour
  get r(): number { return this.data[0]; }
  get g(): number { return this.data[1]; }
  get b(): number { return this.data[2]; }
  
  set r(value: number) { this.data[0] = value; }
  set g(value: number) { this.data[1] = value; }
  set b(value: number) { this.data[2] = value; }

  get htmlHex(): string {
    const r = Math.floor(this.r * 255);
    const g = Math.floor(this.g * 255);
    const b = Math.floor(this.b * 255);
    return `#${r.toString(16)}${g.toString(16)}${b.toString(16)}`;
  }

  add(other: Vec3): Vec3 {
    const result = new Vec3();
    result.x = this.x + other.x;
    result.y = this.y + other.y;
    result.z = this.z + other.z;
    return result;
  }

  subtract(other: Vec3): Vec3 {
    const result = new Vec3();
    result.x = this.x - other.x;
    result.y = this.y - other.y;
    result.z = this.z - other.z;
    return result;
  }

  scale(scalar: number): Vec3 {
    const result = new Vec3();
    result.x = this.x * scalar;
    result.y = this.y * scalar;
    result.z = this.z * scalar;
    return result;
  }

  dot(other: Vec3): number {
    return this.x * other.x + this.y * other.y + this.z * other.z;
  }

  cross(other: Vec3): Vec3 {
    const result = new Vec3();
    result.x = this.y * other.z - this.z * other.y;
    result.y = this.z * other.x - this.x * other.z;
    result.z = this.x * other.y - this.y * other.x;
    return result;
  }

  magnitude(): number {
    return Math.sqrt(this.dot(this));
  }

  normalised(): Vec3 {
    const result = new Vec3();
    const overMag = 1.0/ this.magnitude();
    result.x = this.x * overMag;
    result.y = this.y * overMag;
    result.z = this.z * overMag;
    return result;
  }

  static get zero(): Vec3 {
    const result = new Vec3();
    result.x = 0.0;
    result.y = 0.0;
    result.z = 0.0;
    return result;
  }

  static get up(): Vec3 {
    const result = new Vec3();
    result.x = 0.0;
    result.y = 1.0;
    result.z = 0.0;
    return result;
  }

  static get down(): Vec3 {
    const result = new Vec3();
    result.x = 0.0;
    result.y = -1.0;
    result.z = 0.0;
    return result;
  }

  static get left(): Vec3 {
    const result = new Vec3();
    result.x = -1.0;
    result.y = 0.0;
    result.z = 0.0;
    return result;
  }

  static get right(): Vec3 {
    const result = new Vec3();
    result.x = 1.0;
    result.y = 0.0;
    result.z = 0.0;
    return result;
  }

  static get forward(): Vec3 {
    const result = new Vec3();
    result.x = 0.0;
    result.y = 0.0;
    result.z = 1.0;
    return result;
  }

  static get backward(): Vec3 {
    const result = new Vec3();
    result.x = 0.0;
    result.y = 0.0;
    result.z = -1.0;
    return result;
  }

  static fromVec2(vec2: Vec2): Vec3 {
    const result = new Vec3();
    result.x = vec2.x;
    result.y = vec2.y;
    result.z = 0.0;
    return result;
  }
}

type Colour3 = Vec3;

class Vec4 {
  data: Float32Array;

  constructor(x: number = 0.0, y: number = 0.0, z: number = 0.0, w: number = 1.0) {
    this.data = new Float32Array(4);
    this.data[0] = x;
    this.data[1] = y;
    this.data[2] = z;
    this.data[3] = w;
  }

  get x(): number { return this.data[0]; }
  get y(): number { return this.data[1]; }
  get z(): number { return this.data[2]; }
  get w(): number { return this.data[3]; }

  set x(value: number) { this.data[0] = value; }
  set y(value: number) { this.data[1] = value; }
  set z(value: number) { this.data[2] = value; }
  set w(value: number) { this.data[3] = value; }

  get r(): number { return this.data[0]; }
  get g(): number { return this.data[1]; }
  get b(): number { return this.data[2]; }
  get a(): number { return this.data[3]; }

  set r(value: number) { this.data[0] = value; }
  set g(value: number) { this.data[1] = value; }
  set b(value: number) { this.data[2] = value; }
  set a(value: number) { this.data[3] = value; }

  add(other: Vec4): Vec4 {
    const result = new Vec4();
    result.x = this.x + other.x;
    result.y = this.y + other.y;
    result.z = this.z + other.z;
    result.w = this.w + other.w;
    return result;
  }

  subtract(other: Vec4): Vec4 {
    const result = new Vec4();
    result.x = this.x - other.x;
    result.y = this.y - other.y;
    result.z = this.z - other.z;
    result.w = this.w - other.w;
    return result;
  }

  scale(scalar: number): Vec4 {
    const result = new Vec4();
    result.x = this.x * scalar;
    result.y = this.y * scalar;
    result.z = this.z * scalar;
    result.w = this.w * scalar;
    return result;
  }

  dot(other: Vec4): number {
    return this.x * other.x + this.y * other.y + this.z * other.z + this.w * other.w;
  }

  cross(other: Vec4): Vec4 {
    const result = new Vec4();
    result.x = this.y * other.z - this.z * other.y;
    result.y = this.z * other.x - this.x * other.z;
    result.z = this.x * other.y - this.y * other.x;
    result.w = 0.0;
    return result;
  }

  magnitude(): number {
    return Math.sqrt(this.dot(this));
  }

  normalised(): Vec4 {
    const result = new Vec4();
    const overMag = 1.0/ this.magnitude();
    result.x = this.x * overMag;
    result.y = this.y * overMag;
    result.z = this.z * overMag;
    result.w = this.w * overMag;
    return result;
  }

  matmul(mat: Mat4x4): Vec4 {
    const result = new Vec4();
    result.x = this.x * mat.m11 + this.y * mat.m21 + this.z * mat.m31 + this.w * mat.m41;
    result.y = this.x * mat.m12 + this.y * mat.m22 + this.z * mat.m32 + this.w * mat.m42;
    result.z = this.x * mat.m13 + this.y * mat.m23 + this.z * mat.m33 + this.w * mat.m43;
    result.w = this.x * mat.m14 + this.y * mat.m24 + this.z * mat.m34 + this.w * mat.m44;
    return result;
  }

  static fromVec3(vec3: Vec3): Vec4 {
    const result = new Vec4();
    result.x = vec3.x;
    result.y = vec3.y;
    result.z = vec3.z;
    result.w = 1.0;
    return result;
  }
}

type Colour4 = Vec4;

class Mat4x4 {
  data: Float32Array;

  constructor() {
    this.data = new Float32Array(16);
  }

  get m11(): number { return this.data[0]; }
  get m12(): number { return this.data[1]; }
  get m13(): number { return this.data[2]; }
  get m14(): number { return this.data[3]; }
  get m21(): number { return this.data[4]; }
  get m22(): number { return this.data[5]; }
  get m23(): number { return this.data[6]; }
  get m24(): number { return this.data[7]; }
  get m31(): number { return this.data[8]; }
  get m32(): number { return this.data[9]; }
  get m33(): number { return this.data[10]; }
  get m34(): number { return this.data[11]; }
  get m41(): number { return this.data[12]; }
  get m42(): number { return this.data[13]; }
  get m43(): number { return this.data[14]; }
  get m44(): number { return this.data[15]; }

  set m11(value: number) { this.data[0] = value; }
  set m12(value: number) { this.data[1] = value; }
  set m13(value: number) { this.data[2] = value; }
  set m14(value: number) { this.data[3] = value; }
  set m21(value: number) { this.data[4] = value; }
  set m22(value: number) { this.data[5] = value; }
  set m23(value: number) { this.data[6] = value; }
  set m24(value: number) { this.data[7] = value; }
  set m31(value: number) { this.data[8] = value; }
  set m32(value: number) { this.data[9] = value; }
  set m33(value: number) { this.data[10] = value; }
  set m34(value: number) { this.data[11] = value; }
  set m41(value: number) { this.data[12] = value; }
  set m42(value: number) { this.data[13] = value; }
  set m43(value: number) { this.data[14] = value; }
  set m44(value: number) { this.data[15] = value; }

  multiply(other: Mat4x4): Mat4x4 {
    const result = new Mat4x4();
    result.m11 = this.m11 * other.m11 + this.m12 * other.m21 + this.m13 * other.m31 + this.m14 * other.m41;
    result.m12 = this.m11 * other.m12 + this.m12 * other.m22 + this.m13 * other.m32 + this.m14 * other.m42;
    result.m13 = this.m11 * other.m13 + this.m12 * other.m23 + this.m13 * other.m33 + this.m14 * other.m43;
    result.m14 = this.m11 * other.m14 + this.m12 * other.m24 + this.m13 * other.m34 + this.m14 * other.m44;
    result.m21 = this.m21 * other.m11 + this.m22 * other.m21 + this.m23 * other.m31 + this.m24 * other.m41;
    result.m22 = this.m21 * other.m12 + this.m22 * other.m22 + this.m23 * other.m32 + this.m24 * other.m42;
    result.m23 = this.m21 * other.m13 + this.m22 * other.m23 + this.m23 * other.m33 + this.m24 * other.m43;
    result.m24 = this.m21 * other.m14 + this.m22 * other.m24 + this.m23 * other.m34 + this.m24 * other.m44;
    result.m31 = this.m31 * other.m11 + this.m32 * other.m21 + this.m33 * other.m31 + this.m34 * other.m41;
    result.m32 = this.m31 * other.m12 + this.m32 * other.m22 + this.m33 * other.m32 + this.m34 * other.m42;
    result.m33 = this.m31 * other.m13 + this.m32 * other.m23 + this.m33 * other.m33 + this.m34 * other.m43;
    result.m34 = this.m31 * other.m14 + this.m32 * other.m24 + this.m33 * other.m34 + this.m34 * other.m44;
    result.m41 = this.m41 * other.m11 + this.m42 * other.m21 + this.m43 * other.m31 + this.m44 * other.m41;
    result.m42 = this.m41 * other.m12 + this.m42 * other.m22 + this.m43 * other.m32 + this.m44 * other.m42;
    result.m43 = this.m41 * other.m13 + this.m42 * other.m23 + this.m43 * other.m33 + this.m44 * other.m43;
    result.m44 = this.m41 * other.m14 + this.m42 * other.m24 + this.m43 * other.m34 + this.m44 * other.m44;
    return result;
  }

  static scale(x: number, y: number, z: number): Mat4x4 {
    const mat = new Mat4x4();
    mat.m11 = x;
    mat.m22 = y;
    mat.m33 = z;
    mat.m44 = 1.0;
    return mat;
  }

  static translate(x: number, y: number, z: number): Mat4x4 {
    const mat = Mat4x4.identity;
    mat.m41 = x;
    mat.m42 = y;
    mat.m43 = z;
    return mat;
  }

  // rotate Z, left-handed, post-multiply, positive angle is clockwise
  static rotateZ(angle: number): Mat4x4 {
    const mat = Mat4x4.identity;

    const cos = Math.cos(angle);
    const sin = Math.sin(angle);

    mat.m11 = cos;
    mat.m12 = -sin;
    mat.m21 = sin;
    mat.m22 = cos;

    return mat;
  }

  static rotateY(angle: number): Mat4x4 {
    const mat = Mat4x4.identity;

    const cos = Math.cos(angle);
    const sin = Math.sin(angle);

    mat.m11 = cos;
    mat.m13 = sin;
    mat.m31 = -sin;
    mat.m33 = cos;

    return mat;
  }

  static rotateX(angle: number): Mat4x4 {
    const mat = Mat4x4.identity;

    const cos = Math.cos(angle);
    const sin = Math.sin(angle);

    mat.m22 = cos;
    mat.m23 = -sin;
    mat.m32 = sin;
    mat.m33 = cos;

    return mat;
  }

  static get identity(): Mat4x4 {
    const mat = new Mat4x4();
    mat.m11 = 1.0;
    mat.m22 = 1.0;
    mat.m33 = 1.0;
    mat.m44 = 1.0;
    return mat;
  }

  static orthoOffCenter(left: number, right: number, bottom: number, top: number, near: number, far: number): Mat4x4 {
    const mat = Mat4x4.identity;
    const width = right - left;
    const height = top - bottom;
    const depth = far - near;

    mat.m11 = 2.0 / width;
    mat.m22 = 2.0 / height;
    mat.m33 = 2.0 / depth;
    mat.m41 = -(right + left) / width;
    mat.m42 = -(top + bottom) / height;
    mat.m43 = -(far + near) / depth;
    return mat;
  }

  static ortho(width: number, height: number, near: number, far: number): Mat4x4 {
    const halfWidth = width / 2.0;
    const halfHeight = height / 2.0;

    return Mat4x4.orthoOffCenter(-halfWidth, halfWidth, -halfHeight, halfHeight, near, far);
  }

  static perspective(fov: number, aspect: number, near: number, far: number): Mat4x4 {
    const mat = new Mat4x4();
    const tanHalfFov = Math.tan(fov / 2.0);
    const depth = far - near;

    mat.m11 = 1.0 / (aspect * tanHalfFov);
    mat.m22 = 1.0 / tanHalfFov;
    mat.m33 = (far + near) / depth;
    mat.m34 = 1.0;
    mat.m43 = -2.0 * near * far / depth;

    return mat;
  }

  static lookAt(eye: Vec3, target: Vec3, up: Vec3): Mat4x4 {
    const mat = new Mat4x4();
    const zaxis = target.subtract(eye).normalised();
    const xaxis = up.cross(zaxis).normalised();
    const yaxis = zaxis.cross(xaxis);

    mat.m11 = xaxis.x;
    mat.m12 = yaxis.x;
    mat.m13 = zaxis.x;

    mat.m21 = xaxis.y;
    mat.m22 = yaxis.y;
    mat.m23 = zaxis.y;

    mat.m31 = xaxis.z;
    mat.m32 = yaxis.z;
    mat.m33 = zaxis.z;

    mat.m41 = -xaxis.dot(eye);
    mat.m42 = -yaxis.dot(eye);
    mat.m43 = -zaxis.dot(eye);
    mat.m44 = 1.0;
    return mat;
  }

};

const deg2rad = (deg: number): number => {
  return deg * Math.PI / 180.0;
}

const epsilon = 0.00001;

const isEquals = (a: number, b: number): boolean => {
  return Math.abs(a - b) < epsilon;
}

class Transform {

  private _yaw: number = 0.0;
  private _pitch: number = 0.0;
  private _roll: number = 0.0;
  private _scale: number = 1.0;
  private _x: number = 0.0;
  private _y: number = 0.0;
  private _z: number = 0.0;

  private matrixCache: Mat4x4|null = null;
  private dirty: boolean = true;

  private markDirty(): void {
    this.dirty = true;
  }

  get yaw(): number { return this._yaw; }
  get pitch(): number { return this._pitch; }
  get roll(): number { return this._roll; }
  get scale(): number { return this._scale; }
  get x(): number { return this._x; }
  get y(): number { return this._y; }
  get z(): number { return this._z; }

  set yaw(value: number) {
    if (!isEquals(this._yaw, value)) {
      this._yaw = value;
      this.markDirty();
    }
  }

  set pitch(value: number) {
    if (!isEquals(this._pitch, value)) {
      this._pitch = value;
      this.markDirty();
    }
  }

  set roll(value: number) {
    if (!isEquals(this._roll, value)) {
      this._roll = value;
      this.markDirty();
    }
  }

  set scale(value: number) {
    if (!isEquals(this._scale, value)) {
      this._scale = value;
      this.markDirty();
    }
  }

  set x(value: number) {
    if (!isEquals(this._x, value)) {
      this._x = value;
      this.markDirty();
    }
  }

  set y(value: number) {
    if (!isEquals(this._y, value)) {
      this._y = value;
      this.markDirty();
    }
  }

  set z(value: number) {
    if (!isEquals(this._z, value)) {
      this._z = value;
      this.markDirty();
    }
  }

  private updateMatrix(): void {
    const scaleMatrix = Mat4x4.scale(this.scale, this.scale, this.scale);
    const rotateMatrix = Mat4x4.rotateZ(deg2rad(this.roll))
    .multiply(Mat4x4.rotateX(deg2rad(this.pitch)))
    .multiply(Mat4x4.rotateY(deg2rad(this.yaw)));
    const translateMatrix = Mat4x4.translate(this.x, this.y, this.z);

    this.matrixCache = scaleMatrix.multiply(rotateMatrix).multiply(translateMatrix);
    this.dirty = false;
  }

  get matrix(): Mat4x4 {
    if (this.dirty || this.matrixCache === null) {
      this.updateMatrix();
    }
    return this.matrixCache!;
  }
}


export { Mat4x4, deg2rad, Transform, Vec2, Vec3, Vec4, Colour3, Colour4 };
