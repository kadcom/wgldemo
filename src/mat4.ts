export class Mat4x4 {
  data: Float32Array;

  constructor() {
    this.data = new Float32Array(16);
  }

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

  add(other: Mat4x4): Mat4x4 {
    const m = new Mat4x4();

    m.m11 = this.m11 + other.m11;
    m.m12 = this.m12 + other.m12;
    m.m13 = this.m13 + other.m13;
    m.m14 = this.m14 + other.m14;

    m.m21 = this.m21 + other.m21;
    m.m22 = this.m22 + other.m22;
    m.m23 = this.m23 + other.m23;
    m.m24 = this.m24 + other.m24;

    m.m31 = this.m31 + other.m31;
    m.m32 = this.m32 + other.m32;
    m.m33 = this.m33 + other.m33;
    m.m34 = this.m34 + other.m34;

    m.m41 = this.m41 + other.m41;
    m.m42 = this.m42 + other.m42;
    m.m43 = this.m43 + other.m43;
    m.m44 = this.m44 + other.m44;

    return m;
  }

  sub(other: Mat4x4): Mat4x4 {
    const m = new Mat4x4();

    m.m11 = this.m11 - other.m11;
    m.m12 = this.m12 - other.m12;
    m.m13 = this.m13 - other.m13;
    m.m14 = this.m14 - other.m14;

    m.m21 = this.m21 - other.m21;
    m.m22 = this.m22 - other.m22;
    m.m23 = this.m23 - other.m23;
    m.m24 = this.m24 - other.m24;

    m.m31 = this.m31 - other.m31;
    m.m32 = this.m32 - other.m32;
    m.m33 = this.m33 - other.m33;
    m.m34 = this.m34 - other.m34;

    m.m41 = this.m41 - other.m41;
    m.m42 = this.m42 - other.m42;
    m.m43 = this.m43 - other.m43;
    m.m44 = this.m44 - other.m44;

    return m;
  }

  multiply(other: Mat4x4): Mat4x4 {
    const m = new Mat4x4();

    m.m11 = this.m11 * other.m11 + this.m12 * other.m21 + this.m13 * other.m31 + this.m14 * other.m41;
    m.m12 = this.m11 * other.m12 + this.m12 * other.m22 + this.m13 * other.m32 + this.m14 * other.m42;
    m.m13 = this.m11 * other.m13 + this.m12 * other.m23 + this.m13 * other.m33 + this.m14 * other.m43;
    m.m14 = this.m11 * other.m14 + this.m12 * other.m24 + this.m13 * other.m34 + this.m14 * other.m44;

    m.m21 = this.m21 * other.m11 + this.m22 * other.m21 + this.m23 * other.m31 + this.m24 * other.m41;
    m.m22 = this.m21 * other.m12 + this.m22 * other.m22 + this.m23 * other.m32 + this.m24 * other.m42;
    m.m23 = this.m21 * other.m13 + this.m22 * other.m23 + this.m23 * other.m33 + this.m24 * other.m43;
    m.m24 = this.m21 * other.m14 + this.m22 * other.m24 + this.m23 * other.m34 + this.m24 * other.m44;

    m.m31 = this.m31 * other.m11 + this.m32 * other.m21 + this.m33 * other.m31 + this.m34 * other.m41;
    m.m32 = this.m31 * other.m12 + this.m32 * other.m22 + this.m33 * other.m32 + this.m34 * other.m42;
    m.m33 = this.m31 * other.m13 + this.m32 * other.m23 + this.m33 * other.m33 + this.m34 * other.m43;
    m.m34 = this.m31 * other.m14 + this.m32 * other.m24 + this.m33 * other.m34 + this.m34 * other.m44;

    m.m41 = this.m41 * other.m11 + this.m42 * other.m21 + this.m43 * other.m31 + this.m44 * other.m41;
    m.m42 = this.m41 * other.m12 + this.m42 * other.m22 + this.m43 * other.m32 + this.m44 * other.m42;
    m.m43 = this.m41 * other.m13 + this.m42 * other.m23 + this.m43 * other.m33 + this.m44 * other.m43;
    m.m44 = this.m41 * other.m14 + this.m42 * other.m24 + this.m43 * other.m34 + this.m44 * other.m44;

    return m;
  }

  scalarMultiply(scalar: number): Mat4x4 {
    const m = new Mat4x4();

    m.m11 = this.m11 * scalar;
    m.m12 = this.m12 * scalar;
    m.m13 = this.m13 * scalar;
    m.m14 = this.m14 * scalar;

    m.m21 = this.m21 * scalar;
    m.m22 = this.m22 * scalar;
    m.m23 = this.m23 * scalar;
    m.m24 = this.m24 * scalar;

    m.m31 = this.m31 * scalar;
    m.m32 = this.m32 * scalar;
    m.m33 = this.m33 * scalar;
    m.m34 = this.m34 * scalar;

    m.m41 = this.m41 * scalar;
    m.m42 = this.m42 * scalar;
    m.m43 = this.m43 * scalar;
    m.m44 = this.m44 * scalar;

    return m;
  }

  static identity(): Mat4x4 {
    const m = new Mat4x4();

    m.m11 = 1.0;
    m.m22 = 1.0;
    m.m33 = 1.0;
    m.m44 = 1.0;

    return m;
  }

  static ortho(left: number, right: number, bottom: number, top: number, near: number, far: number): Mat4x4 {
    // left-handed positive z into the screen orthographic projection matrix, row major
    const m = Mat4x4.identity();

    const xrange = right - left;
    const yrange = top - bottom;
    const zrange = far - near;

    m.m11 = 2.0 / xrange;
    m.m22 = 2.0 / yrange;
    m.m33 = 2.0 / zrange;

    m.m41 = -(right + left) / xrange;
    m.m42 = -(top + bottom) / yrange;
    m.m43 = -(far + near) / zrange;
    return m;
  }

  static perspective(fov: number, aspect: number, near: number, far: number): Mat4x4 {
    const m = Mat4x4.identity();

    const f = 1.0 / Math.tan(fov / 2.0);

    m.m11 = f / aspect;
    m.m22 = f;
    m.m33 = (far + near) / (near - far);
    m.m34 = -1.0;
    m.m43 = (2.0 * far * near) / (near - far);
    m.m44 = 0.0;

    return m;
  }

  static translation(x: number, y: number, z: number): Mat4x4 {
    const m = Mat4x4.identity();

    m.m41 = x;
    m.m42 = y;
    m.m43 = z;

    return m;
  }

  static rotationX(angle: number): Mat4x4 {

    const m = Mat4x4.identity();

    const c = Math.cos(angle);
    const s = Math.sin(angle);

    m.m22 = c;
    m.m23 = s;
    m.m32 = -s;
    m.m33 = c;

    return m;
  }

  static rotationY(angle: number): Mat4x4 {
    const m = Mat4x4.identity();

    const c = Math.cos(angle);
    const s = Math.sin(angle);

    m.m11 = c;
    m.m13 = -s;
    m.m31 = s;
    m.m33 = c;

    return m;
  }

  static rotationZ(angle: number): Mat4x4 {

    const m = Mat4x4.identity();

    const c = Math.cos(angle);
    const s = Math.sin(angle);

    m.m11 = c;
    m.m12 = s;
    m.m21 = -s;
    m.m22 = c;

    return m;
  }

  static scale(x: number, y: number, z: number): Mat4x4 {
    const m = Mat4x4.identity();

    m.m11 = x;
    m.m22 = y;
    m.m33 = z;

    return m;
  }
}

