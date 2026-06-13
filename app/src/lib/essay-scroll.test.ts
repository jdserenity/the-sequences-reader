import { describe, expect, it } from 'vitest';
import { essayScrollFraction } from './essay-scroll';

describe('essayScrollFraction', () => {
  it('returns 0 at top and 1 at bottom', () => {
    expect(essayScrollFraction(0, 1000, 400)).toBe(0);
    expect(essayScrollFraction(600, 1000, 400)).toBe(1);
  });

  it('returns 1 when content fits without scrolling', () => {
    expect(essayScrollFraction(0, 400, 400)).toBe(1);
  });

  it('clamps out-of-range values', () => {
    expect(essayScrollFraction(-50, 1000, 400)).toBe(0);
    expect(essayScrollFraction(900, 1000, 400)).toBe(1);
  });
});
