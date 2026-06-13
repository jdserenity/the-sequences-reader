import { describe, expect, it } from 'vitest';
import { isSwipeLeft, isSwipeRight, SWIPE_MIN_DISTANCE, touchGestureLock } from './swipe';

describe('isSwipeLeft', () => {
  it('detects horizontal swipe left', () => {
    expect(isSwipeLeft({ x: 220, y: 300 }, { x: 100, y: 305 })).toBe(true);
  });

  it('rejects short or vertical gestures', () => {
    expect(isSwipeLeft({ x: 200, y: 300 }, { x: 180, y: 300 })).toBe(false);
    expect(isSwipeLeft({ x: 200, y: 300 }, { x: 100, y: 500 })).toBe(false);
    expect(isSwipeLeft({ x: 100, y: 300 }, { x: 200, y: 300 })).toBe(false);
    expect(isSwipeLeft({ x: 200, y: 300 }, { x: 120, y: 360 })).toBe(false);
  });

  it('requires a longer horizontal travel distance', () => {
    expect(SWIPE_MIN_DISTANCE).toBeGreaterThan(50);
    expect(isSwipeLeft({ x: 200, y: 300 }, { x: 140, y: 302 })).toBe(false);
  });

  it('detects horizontal swipe right', () => {
    expect(isSwipeRight({ x: 100, y: 300 }, { x: 220, y: 305 })).toBe(true);
  });
});

describe('touchGestureLock', () => {
  it('locks vertical movement before horizontal swipes', () => {
    expect(touchGestureLock({ x: 100, y: 100 }, { x: 102, y: 140 })).toBe('vertical');
    expect(touchGestureLock({ x: 100, y: 100 }, { x: 180, y: 110 })).toBe('horizontal');
  });
});
