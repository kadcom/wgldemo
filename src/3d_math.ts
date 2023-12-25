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

  static scale(x: number, y: number, z: number): Mat4x4 {
    const mat = new Mat4x4();
    mat.m11 = x;
    mat.m22 = y;
    mat.m33 = z;
    mat.m44 = 1.0;
    return mat;
  }

  static translate(x: number, y: number, z: number): Mat4x4 {
    const mat = Mat4x4.identity();
    mat.m41 = x;
    mat.m42 = y;
    mat.m43 = z;
    return mat;
  }

  // rotate Z, left-handed, post-multiply, positive angle is clockwise
  static rotateZ(angle: number): Mat4x4 {
    const mat = Mat4x4.identity();

    const cos = Math.cos(angle);
    const sin = Math.sin(angle);

    mat.m11 = cos;
    mat.m12 = -sin;
    mat.m21 = sin;
    mat.m22 = cos;

    return mat;
  }

  static rotateY(angle: number): Mat4x4 {
    const mat = Mat4x4.identity();

    const cos = Math.cos(angle);
    const sin = Math.sin(angle);

    mat.m11 = cos;
    mat.m13 = sin;
    mat.m31 = -sin;
    mat.m33 = cos;

    return mat;
  }

  static rotateX(angle: number): Mat4x4 {
    const mat = Mat4x4.identity();

    const cos = Math.cos(angle);
    const sin = Math.sin(angle);

    mat.m22 = cos;
    mat.m23 = -sin;
    mat.m32 = sin;
    mat.m33 = cos;

    return mat;
  }

  static identity(): Mat4x4 {
    const mat = new Mat4x4();
    mat.m11 = 1.0;
    mat.m22 = 1.0;
    mat.m33 = 1.0;
    mat.m44 = 1.0;
    return mat;
  }

  static orthoOffCenter(left: number, right: number, bottom: number, top: number, near: number, far: number): Mat4x4 {
    const mat = Mat4x4.identity();
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

};

const deg2rad = (deg: number): number => {
  return deg * Math.PI / 180.0;
}

class Transform {
  // scale 
  scale: number = 1.0;

  // rotation
  yaw: number = 0.0;
  pitch: number = 0.0;
  roll: number = 0.0;

  // translation
  x: number = 0.0;
  y: number = 0.0;
  z: number = 0.0;

  get matrix(): Mat4x4 {
    const scaleMatrix = Mat4x4.scale(this.scale, this.scale, this.scale);
    const rotateMatrix = Mat4x4.rotateZ(deg2rad(this.roll))
    .multiply(Mat4x4.rotateX(deg2rad(this.pitch)))
    .multiply(Mat4x4.rotateY(deg2rad(this.yaw)));
    const translateMatrix = Mat4x4.translate(this.x, this.y, this.z);

    return scaleMatrix.multiply(rotateMatrix).multiply(translateMatrix);
  }
}


export { Mat4x4, deg2rad, Transform };