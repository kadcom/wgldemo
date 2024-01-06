// Konversi derajat ke radian
const deg2rad = (deg: number): number => {
  return deg * Math.PI / 180.0;
};

// Floating Point Equality 

const EPSILON = 0.0001;

const isEqual = (a: number, b: number): boolean => {
  return Math.abs(a - b) < EPSILON;
}

const isZero = (a: number): boolean => {
  return Math.abs(a) < EPSILON;
}

const isPowerOfTwo = (n: number): boolean => {
  return (n & (n - 1)) == 0;
}

export { deg2rad, isEqual, isZero, isPowerOfTwo};

