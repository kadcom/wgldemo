import { deg2rad, isEqual } from "./math";

// Row-Major, Left-Handed, Post-Multiply Matrix 
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

  scale(value: number): Mat4x4 {
    const mat = new Mat4x4();
    mat.m11 = this.m11 * value;
    mat.m12 = this.m12 * value;
    mat.m13 = this.m13 * value;
    mat.m14 = this.m14 * value;
    mat.m21 = this.m21 * value;
    mat.m22 = this.m22 * value;
    mat.m23 = this.m23 * value;
    mat.m24 = this.m24 * value;
    mat.m31 = this.m31 * value;
    mat.m32 = this.m32 * value;
    mat.m33 = this.m33 * value;
    mat.m34 = this.m34 * value;
    mat.m41 = this.m41 * value;
    mat.m42 = this.m42 * value;
    mat.m43 = this.m43 * value;
    mat.m44 = this.m44 * value;
    return mat;
  }

  get transpose(): Mat4x4 {
    const mat = new Mat4x4();
    mat.m11 = this.m11;
    mat.m12 = this.m21;
    mat.m13 = this.m31;
    mat.m14 = this.m41;
    mat.m21 = this.m12;
    mat.m22 = this.m22;
    mat.m23 = this.m32;
    mat.m24 = this.m42;
    mat.m31 = this.m13;
    mat.m32 = this.m23;
    mat.m33 = this.m33;
    mat.m34 = this.m43;
    mat.m41 = this.m14;
    mat.m42 = this.m24;
    mat.m43 = this.m34;
    mat.m44 = this.m44;
    return mat;
  }

  get inverse(): Mat4x4 {
    const mat = new Mat4x4();
    const m11 = this.m11; const m12 = this.m12; const m13 = this.m13; const m14 = this.m14;
    const m21 = this.m21; const m22 = this.m22; const m23 = this.m23; const m24 = this.m24;
    const m31 = this.m31; const m32 = this.m32; const m33 = this.m33; const m34 = this.m34;
    const m41 = this.m41; const m42 = this.m42; const m43 = this.m43; const m44 = this.m44;

    mat.m11 = m23 * m34 * m42 - m24 * m33 * m42 + m24 * m32 * m43 - m22 * m34 * m43 - m23 * m32 * m44 + m22 * m33 * m44;
    mat.m12 = m14 * m33 * m42 - m13 * m34 * m42 - m14 * m32 * m43 + m12 * m34 * m43 + m13 * m32 * m44 - m12 * m33 * m44;
    mat.m13 = m13 * m24 * m42 - m14 * m23 * m42 + m14 * m22 * m43 - m12 * m24 * m43 - m13 * m22 * m44 + m12 * m23 * m44;
    mat.m14 = m14 * m23 * m32 - m13 * m24 * m32 - m14 * m22 * m33 + m12 * m24 * m33 + m13 * m22 * m34 - m12 * m23 * m34;
    mat.m21 = m24 * m33 * m41 - m23 * m34 * m41 - m24 * m31 * m43 + m21 * m34 * m43 + m23 * m31 * m44 - m21 * m33 * m44;
    mat.m22 = m13 * m34 * m41 - m14 * m33 * m41 + m14 * m31 * m43 - m11 * m34 * m43 - m13 * m31 * m44 + m11 * m33 * m44;
    mat.m23 = m14 * m23 * m41 - m13 * m24 * m41 - m14 * m21 * m43 + m11 * m24 * m43 + m13 * m21 * m44 - m11 * m23 * m44;
    mat.m24 = m13 * m24 * m31 - m14 * m23 * m31 + m14 * m21 * m33 - m11 * m24 * m33 - m13 * m21 * m34 + m11 * m23 * m34;
    mat.m31 = m22 * m34 * m41 - m24 * m32 * m41 + m24 * m31 * m42 - m21 * m34 * m42 - m22 * m31 * m44 + m21 * m32 * m44;
    mat.m32 = m14 * m32 * m41 - m12 * m34 * m41 - m14 * m31 * m42 + m11 * m34 * m42 + m12 * m31 * m44 - m11 * m32 * m44;
    mat.m33 = m12 * m24 * m41 - m14 * m22 * m41 + m14 * m21 * m42 - m11 * m24 * m42 - m12 * m21 * m44 + m11 * m22 * m44;
    mat.m34 = m14 * m22 * m31 - m12 * m24 * m31 - m14 * m21 * m32 + m11 * m24 * m32 + m12 * m21 * m34 - m11 * m22 * m34;
    mat.m41 = m23 * m32 * m41 - m22 * m33 * m41 - m23 * m31 * m42 + m21 * m33 * m42 + m22 * m31 * m43 - m21 * m32 * m43;
    mat.m42 = m12 * m33 * m41 - m13 * m32 * m41 + m13 * m31 * m42 - m11 * m33 * m42 - m12 * m31 * m43 + m11 * m32 * m43;
    mat.m43 = m13 * m22 * m41 - m12 * m23 * m41 - m13 * m21 * m42 + m11 * m23 * m42 + m12 * m21 * m43 - m11 * m22 * m43;
    mat.m44 = m12 * m23 * m31 - m13 * m22 * m31 + m13 * m21 * m32 - m11 * m23 * m32 - m12 * m21 * m33 + m11 * m22 * m33;

    const det = m11 * mat.m11 + m21 * mat.m12 + m31 * mat.m13 + m41 * mat.m14;
    if (det === 0.0) {
      throw new Error("Matrix is not invertible");
    }

    const invDet = 1.0 / det;
    mat.m11 *= invDet;
    mat.m12 *= invDet;
    mat.m13 *= invDet;
    mat.m14 *= invDet;
    mat.m21 *= invDet;
    mat.m22 *= invDet;
    mat.m23 *= invDet;
    mat.m24 *= invDet;
    mat.m31 *= invDet;
    mat.m32 *= invDet;
    mat.m33 *= invDet;
    mat.m34 *= invDet;
    mat.m41 *= invDet;
    mat.m42 *= invDet;
    mat.m43 *= invDet;
    mat.m44 *= invDet;
    
    return mat;

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
    const zAxis = target.subtract(eye).normalised;
    const xAxis = up.cross(zAxis).normalised;
    const yAxis = zAxis.cross(xAxis).normalised;

    mat.m11 = xAxis.x;
    mat.m12 = yAxis.x;
    mat.m13 = zAxis.x;
    mat.m14 = 0.0;

    mat.m21 = xAxis.y;
    mat.m22 = yAxis.y;
    mat.m23 = zAxis.y;
    mat.m24 = 0.0;

    mat.m31 = xAxis.z;
    mat.m32 = yAxis.z;
    mat.m33 = zAxis.z;
    mat.m34 = 0.0;

    mat.m41 = -xAxis.dot(eye);
    mat.m42 = -yAxis.dot(eye);
    mat.m43 = -zAxis.dot(eye);
    mat.m44 = 1.0;

    return mat;
  }
};

class Vec2 {
  data: Float32Array;

  constructor(x: number = 0, y: number = 0) {
    this.data = new Float32Array(2);
    this.data[0] = x;
    this.data[1] = y;
  }

  get x(): number { return this.data[0]; }
  get y(): number { return this.data[1]; }

  set x(value: number) { this.data[0] = value; }
  set y(value: number) { this.data[1] = value; }

  get u(): number { return this.data[0]; }
  get v(): number { return this.data[1]; }

  set u(value: number) { this.data[0] = value; }
  set v(value: number) { this.data[1] = value; }

  equals(other: Vec2): boolean {
    return isEqual(this.x, other.x) && isEqual(this.y, other.y);
  }
}

class Vec3 {
  data: Float32Array;

  constructor(x: number = 0, y: number = 0 , z: number = 0) {
    this.data = new Float32Array(3);
    this.data[0] = x;
    this.data[1] = y;
    this.data[2] = z;
  }

  equals(other: Vec3): boolean {
    return isEqual(this.x, other.x) && isEqual(this.y, other.y) && isEqual(this.z, other.z);
  }

  get x(): number { return this.data[0]; }
  get y(): number { return this.data[1]; }
  get z(): number { return this.data[2]; }

  set x(value: number) { this.data[0] = value; }
  set y(value: number) { this.data[1] = value; }
  set z(value: number) { this.data[2] = value; }

  set r(value: number) { this.data[0] = value; }
  set g(value: number) { this.data[1] = value; }
  set b(value: number) { this.data[2] = value; }

  get r(): number { return this.data[0]; }
  get g(): number { return this.data[1]; }
  get b(): number { return this.data[2]; }

  get magnitude(): number {
    return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
  }

  get normalised(): Vec3 {
    const overMag = 1.0/this.magnitude;
    return new Vec3(this.x * overMag, this.y * overMag, this.z * overMag);
  }

  scale(value: number): Vec3 {
    return new Vec3(this.x * value, this.y * value, this.z * value);
  }

  add(other: Vec3): Vec3 {
    return new Vec3(this.x + other.x, this.y + other.y, this.z + other.z);
  }

  subtract(other: Vec3): Vec3 {
    return new Vec3(this.x - other.x, this.y - other.y, this.z - other.z);
  }

  dot(other: Vec3): number {
    return this.x * other.x + this.y * other.y + this.z * other.z;
  }

  cross(other: Vec3): Vec3 {
    return new Vec3(
      this.y * other.z - this.z * other.y,
      this.z * other.x - this.x * other.z, 
      this.x * other.y - this.y * other.x
    );
  }

  static get zero(): Vec3 {
    return new Vec3();
  }

  static get one(): Vec3 {
    return new Vec3(1, 1, 1);
  }

  static get up(): Vec3 {
    return new Vec3(0, 1, 0);
  }

  static get down(): Vec3 {
    return new Vec3(0, -1, 0);
  }

  static get left(): Vec3 {
    return new Vec3(-1, 0, 0);
  }

  static get right(): Vec3 {
    return new Vec3(1, 0, 0);
  }

  static get forward(): Vec3 {
    return new Vec3(0, 0, 1);
  }

  static get back(): Vec3 {
    return new Vec3(0, 0, -1);
  }
};

class Vec4 {
  data: Float32Array;

  constructor(x: number = 0, y: number = 0 , z: number = 0, w: number = 0) {
    this.data = new Float32Array(4);
    this.data[0] = x;
    this.data[1] = y;
    this.data[2] = z;
    this.data[3] = w;
  }

  equals(other: Vec4): boolean {
    return isEqual(this.x, other.x) && isEqual(this.y, other.y) && isEqual(this.z, other.z) && isEqual(this.w, other.w);
  }

  get x(): number { return this.data[0]; }
  get y(): number { return this.data[1]; }
  get z(): number { return this.data[2]; }
  get w(): number { return this.data[3]; }

  set x(value: number) { this.data[0] = value; }
  set y(value: number) { this.data[1] = value; }
  set z(value: number) { this.data[2] = value; }
  set w(value: number) { this.data[3] = value; }

  set r(value: number) { this.data[0] = value; }
  set g(value: number) { this.data[1] = value; }
  set b(value: number) { this.data[2] = value; }
  set a(value: number) { this.data[3] = value; }

  get r(): number { return this.data[0]; }
  get g(): number { return this.data[1]; }
  get b(): number { return this.data[2]; }
  get a(): number { return this.data[3]; }

  get xyz(): Vec3 {
    return new Vec3(this.x, this.y, this.z);
  }

  get magnitude(): number {
    return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w);
  }

  get normalised(): Vec4 {
    const overMag = 1.0/this.magnitude;
    return new Vec4(this.x * overMag, this.y * overMag, this.z * overMag, this.w * overMag);
  }

  add(other: Vec4): Vec4 {
    return new Vec4(this.x + other.x, this.y + other.y, this.z + other.z, this.w + other.w);
  }

  subtract(other: Vec4): Vec4 {
    return new Vec4(this.x - other.x, this.y - other.y, this.z - other.z, this.w - other.w);
  }

  dot(other: Vec4): number {
    return this.x * other.x + this.y * other.y + this.z * other.z + this.w * other.w;
  }

  cross(other: Vec4): Vec4 {
    return new Vec4(
      this.y * other.z - this.z * other.y,
      this.z * other.x - this.x * other.z, 
      this.x * other.y - this.y * other.x,
      0.0
    );
  }

  matmul(other: Mat4x4): Vec4 {
    const result = new Vec4();
    result.x = this.x * other.m11 + this.y * other.m21 + this.z * other.m31 + this.w * other.m41;
    result.y = this.x * other.m12 + this.y * other.m22 + this.z * other.m32 + this.w * other.m42;
    result.z = this.x * other.m13 + this.y * other.m23 + this.z * other.m33 + this.w * other.m43;
    result.w = this.x * other.m14 + this.y * other.m24 + this.z * other.m34 + this.w * other.m44;
    return result;
  }

  static get zero(): Vec4 {
    return new Vec4();
  }

  static get one(): Vec4 {
    return new Vec4(1, 1, 1);
  }

  static get up(): Vec4 {
    return new Vec4(0, 1, 0);
  }

  static get down(): Vec4 {
    return new Vec4(0, -1, 0);
  }

  static get left(): Vec4 {
    return new Vec4(-1, 0, 0);
  }

  static get right(): Vec4 {
    return new Vec4(1, 0, 0);
  }

  static get forward(): Vec4 {
    return new Vec4(0, 0, 1);
  }

  static get back(): Vec4 {
    return new Vec4(0, 0, -1);
  }


  static fromVec3(vec: Vec3): Vec4 {
    return new Vec4(vec.x, vec.y, vec.z, 1.0);
  }
};

class Rotation {
  yaw: number = 0.0;
  pitch: number = 0.0;
  roll: number = 0.0;

  get matrix(): Mat4x4 {
    const rotateMatrix = Mat4x4.rotateZ(deg2rad(this.roll))
    .multiply(Mat4x4.rotateX(deg2rad(this.pitch)))
    .multiply(Mat4x4.rotateY(deg2rad(this.yaw)));
    return rotateMatrix;
  }

  constructor(yaw: number = 0.0, pitch: number = 0.0, roll: number = 0.0) {
    this.yaw = yaw;
    this.pitch = pitch;
    this.roll = roll;
  }

  static YawPitchRoll(yaw: number, pitch: number, roll: number): Rotation {
    return new Rotation(yaw, pitch, roll);
  }

  static fromVec3(vec: Vec3): Rotation {
    return new Rotation(vec.x, vec.y, vec.z);
  }
};

class Transform {
  // scale 
  scale: number = 1.0;
  rotation: Rotation = new Rotation();
  position: Vec3 = new Vec3();

  get matrix(): Mat4x4 {
    const scaleMatrix = Mat4x4.scale(this.scale, this.scale, this.scale);
    const translateMatrix = Mat4x4.translate(this.position.x, this.position.y, this.position.z);

    return scaleMatrix.multiply(this.rotation.matrix).multiply(translateMatrix);
  }
}


export { Mat4x4, deg2rad, Transform, Vec2, Vec3, Vec4, Rotation};
