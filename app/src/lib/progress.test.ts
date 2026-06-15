import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { corpusWordCount, countableEssayCount } from './corpus';
import { readState } from './progress.svelte';
import {
  DEMO_READ_ESSAY_IDS,
  getLastEssayId,
  getReadStats,
  getReadWordCount,
  getResumePath,
  getScroll,
  isEssayRead,
  markEssayRead,
  markEssaysRead,
  saveScroll,
  seedDemoReadsIfEmpty,
} from './progress';

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
  beforeEach(() => { mockLocalStorage(); readState.epoch = 0; });
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

  it('tracks read essays independently of scroll order', () => {
    expect(readState.epoch).toBe(0);
    markEssayRead('essay-a');
    markEssayRead('essay-z');
    expect(readState.epoch).toBe(2);
    expect(isEssayRead('essay-a')).toBe(true);
    expect(isEssayRead('essay-z')).toBe(true);
    expect(isEssayRead('essay-m')).toBe(false);
    markEssayRead('essay-a');
    expect(readState.epoch).toBe(2);
    expect(getReadStats(100, 50_000)).toEqual({ read: 2, total: 100, percent: 2, wordsRead: expect.any(Number), wordsTotal: 50_000 });
  });

  it('preserves read essays when saving scroll', () => {
    markEssayRead('essay-1');
    saveScroll('essay-2', 50);
    expect(isEssayRead('essay-1')).toBe(true);
    expect(getScroll('essay-2')).toBe(50);
  });

  it('seeds demo reads only when none marked yet', () => {
    seedDemoReadsIfEmpty();
    expect(DEMO_READ_ESSAY_IDS.every((id) => isEssayRead(id))).toBe(true);
    markEssayRead('custom-essay');
    seedDemoReadsIfEmpty();
    expect(isEssayRead('custom-essay')).toBe(true);
    expect(getReadStats(countableEssayCount, corpusWordCount).read).toBe(DEMO_READ_ESSAY_IDS.length + 1);
  });

  it('bulk mark dedupes reference essays and existing reads', () => {
    markEssaysRead(['essay-a', 'essay-a', 'bibliography']);
    expect(isEssayRead('essay-a')).toBe(true);
    expect(getReadStats(countableEssayCount, corpusWordCount).read).toBe(1);
  });

  it('sums word counts for read essays only', () => {
    markEssaysRead(['preface', 'biases-an-introduction']);
    const words = getReadWordCount(['preface', 'biases-an-introduction', 'bibliography']);
    expect(words).toBeGreaterThan(0);
    expect(getReadStats(countableEssayCount, corpusWordCount).wordsRead).toBe(words);
  });

  it('ignores reference essays for read state and stats', () => {
    markEssayRead('bibliography');
    markEssayRead('glossary');
    markEssayRead('essay-1');
    expect(isEssayRead('bibliography')).toBe(false);
    expect(isEssayRead('glossary')).toBe(false);
    expect(getReadStats(countableEssayCount, corpusWordCount).read).toBe(1);
  });

  it('migrates legacy progress without readEssayIds', () => {
    localStorage.setItem('sequences-reader:progress', JSON.stringify({
      lastEssayId: 'essay-1',
      scrollByEssay: { 'essay-1': 10 },
      updatedAt: 1,
    }));
    expect(isEssayRead('essay-1')).toBe(false);
    saveScroll('essay-1', 20);
    markEssayRead('essay-1');
    expect(isEssayRead('essay-1')).toBe(true);
    expect(getScroll('essay-1')).toBe(20);
  });
});
