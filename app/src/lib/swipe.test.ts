import { describe, expect, it } from 'vitest';
import { isSwipeLeft, isSwipeRight } from './swipe';

describe('isSwipeLeft', () => {
  it('detects horizontal swipe left', () => {
    expect(isSwipeLeft({ x: 200, y: 300 }, { x: 100, y: 310 })).toBe(true);
  });

  it('rejects short or vertical gestures', () => {
    expect(isSwipeLeft({ x: 200, y: 300 }, { x: 180, y: 300 })).toBe(false);
    expect(isSwipeLeft({ x: 200, y: 300 }, { x: 100, y: 500 })).toBe(false);
    expect(isSwipeLeft({ x: 100, y: 300 }, { x: 200, y: 300 })).toBe(false);
  });

  it('detects horizontal swipe right', () => {
    expect(isSwipeRight({ x: 100, y: 300 }, { x: 200, y: 310 })).toBe(true);
  });
});
