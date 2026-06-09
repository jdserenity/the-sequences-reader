import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { getLastEssayId, getResumePath, getScroll, saveScroll } from './progress';

function mockLocalStorage(): void {
  const store = new Map<string, string>();
  vi.stubGlobal('localStorage', {
    getItem: (k: string) => store.get(k) ?? null,
    setItem: (k: string, v: string) => { store.set(k, v); },
    removeItem: (k: string) => { store.delete(k); },
    clear: () => { store.clear(); },
    key: () => null,
    length: 0,
  });
}

describe('progress', () => {
  beforeEach(() => { mockLocalStorage(); });
  afterEach(() => { vi.unstubAllGlobals(); });

  it('returns null when nothing saved', () => {
    expect(getLastEssayId()).toBeNull();
    expect(getScroll('essay-1')).toBe(0);
  });

  it('saves last essay and scroll position', () => {
    saveScroll('essay-1', 420);
    expect(getLastEssayId()).toBe('essay-1');
    expect(getScroll('essay-1')).toBe(420);
  });

  it('keeps per-essay scroll while updating last essay', () => {
    saveScroll('essay-1', 100);
    saveScroll('essay-2', 250);
    expect(getLastEssayId()).toBe('essay-2');
    expect(getScroll('essay-1')).toBe(100);
    expect(getScroll('essay-2')).toBe(250);
  });

  it('clamps negative scroll to zero', () => {
    saveScroll('essay-1', -50);
    expect(getScroll('essay-1')).toBe(0);
  });

  it('builds resume path from last essay or fallback', () => {
    expect(getResumePath('first')).toBe('/read/first');
    saveScroll('essay-2', 10);
    expect(getResumePath('first')).toBe('/read/essay-2');
  });
});
