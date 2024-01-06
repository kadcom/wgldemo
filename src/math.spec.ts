import {test, expect, describe} from 'bun:test';
import {isEqual, isZero, isPowerOfTwo} from './math';

describe ("Float Equality", () => {
  test ("should be equal", () => {
    expect (isEqual(0.1 + 0.2, 0.3)).toBeTrue();
  });

  test ("should not be equal", () => {
    expect (isEqual(0.1 + 0.2, 0.301)).toBeFalse();
  });

  test ("should be zero", () => {
    expect (isZero(0.1 + 0.2 - 0.3)).toBeTrue();
  });
});

describe ("Power of Two", () => {
  test ("should be power of two", () => {
    expect (isPowerOfTwo(256)).toBeTrue();
  });

  test ("should not be power of two", () => {
    expect (isPowerOfTwo(254)).toBeFalse();
  });
});
