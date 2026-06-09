import { describe, expect, it } from 'vitest';
import {
  getNavigationType,
  hasSeenSplash,
  markSplashSeen,
  shouldPlaySplash,
  SPLASH_SEEN_KEY,
} from './splash-gate';

describe('shouldPlaySplash', () => {
  it('plays on hard refresh even when seen before', () => {
    expect(shouldPlaySplash('reload', true)).toBe(true);
  });

  it('plays on first navigate when never seen', () => {
    expect(shouldPlaySplash('navigate', false)).toBe(true);
  });

  it('skips on navigate when already seen', () => {
    expect(shouldPlaySplash('navigate', true)).toBe(false);
  });

  it('skips on back_forward', () => {
    expect(shouldPlaySplash('back_forward', false)).toBe(false);
  });
});

describe('splash seen storage', () => {
  it('tracks seen flag in localStorage', () => {
    const store = new Map<string, string>();
    const storage = {
      getItem: (k: string) => store.get(k) ?? null,
      setItem: (k: string, v: string) => { store.set(k, v); },
    };
    expect(hasSeenSplash(storage)).toBe(false);
    markSplashSeen(storage);
    expect(hasSeenSplash(storage)).toBe(true);
    expect(store.get(SPLASH_SEEN_KEY)).toBe('1');
  });
});

describe('getNavigationType', () => {
  it('defaults to navigate when no entry', () => {
    expect(getNavigationType([])).toBe('navigate');
  });

  it('reads first navigation entry type', () => {
    expect(getNavigationType([{ type: 'reload' }])).toBe('reload');
  });
});
