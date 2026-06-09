import { describe, expect, it } from 'vitest';
import { scrollTopToCenterTarget } from './tocScroll';

describe('scrollTopToCenterTarget', () => {
  it('returns unchanged scroll when target is already centered', () => {
    expect(scrollTopToCenterTarget(100, 0, 200, 90, 20)).toBe(100);
  });

  it('scrolls down when target sits below center', () => {
    expect(scrollTopToCenterTarget(0, 0, 200, 180, 20)).toBe(90);
  });

  it('never returns negative scroll', () => {
    expect(scrollTopToCenterTarget(0, 0, 200, 10, 20)).toBe(0);
  });
});
