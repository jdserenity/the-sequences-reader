import { describe, expect, it } from 'vitest';
import {
  blobCountForWidth,
  createInkBlobs,
  inkExpansion,
  inkWashAlpha,
  overlayOpacity,
  splashProgress,
  SPLASH_DURATION_MS,
  SPLASH_DURATION_REDUCED_MS,
} from './ink-bloom';

describe('splash timing', () => {
  it('uses cinematic duration longer than reduced motion', () => {
    expect(SPLASH_DURATION_MS).toBeGreaterThan(SPLASH_DURATION_REDUCED_MS);
  });

  it('reaches full progress at duration', () => {
    expect(splashProgress(SPLASH_DURATION_MS, SPLASH_DURATION_MS)).toBe(1);
    expect(splashProgress(0, SPLASH_DURATION_MS)).toBe(0);
  });

  it('holds overlay opaque through bloom then fades', () => {
    expect(overlayOpacity(0)).toBe(1);
    expect(overlayOpacity(0.5)).toBe(1);
    expect(overlayOpacity(0.72)).toBe(1);
    expect(overlayOpacity(1)).toBe(0);
  });

  it('expands ink before overlay fade begins', () => {
    expect(inkExpansion(0.62)).toBe(1);
    expect(inkExpansion(0)).toBe(0);
  });

  it('washes ink in then out with the dissolve', () => {
    expect(inkWashAlpha(0)).toBe(0);
    expect(inkWashAlpha(0.4)).toBeGreaterThan(0.5);
    expect(inkWashAlpha(1)).toBe(0);
  });
});

describe('ink blobs', () => {
  it('creates the requested blob count', () => {
    expect(createInkBlobs(8)).toHaveLength(8);
  });

  it('scales blob count down on narrow viewports', () => {
    expect(blobCountForWidth(400)).toBeLessThan(blobCountForWidth(1200));
  });
});
