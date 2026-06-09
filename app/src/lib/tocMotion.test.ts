import { describe, expect, it } from 'vitest';
import { TOC_TILE_IN_MS, TOC_TILE_OUT_MS, tocEaseOut } from './tocMotion';

describe('tocMotion', () => {
  it('eases out from zero to one', () => {
    expect(tocEaseOut(0)).toBe(0);
    expect(tocEaseOut(1)).toBe(1);
    expect(tocEaseOut(0.5)).toBeGreaterThan(0.5);
  });

  it('exports staged motion durations', () => {
    expect(TOC_TILE_IN_MS).toBeGreaterThan(500);
    expect(TOC_TILE_OUT_MS).toBeGreaterThan(TOC_TILE_IN_MS);
  });
});
