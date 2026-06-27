import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { corpus } from './corpus';
import { corpusWordCount, countableEssayCount } from './corpus';
import { readState } from './progress.svelte';
import {
  addHighlight,
  getHighlightsForEssay,
  getLastEssayId,
  getReadStats,
  getReadWordCount,
  getResumePath,
  getScroll,
  isBookRead,
  isEssayRead,
  markEssayRead,
  markEssaysRead,
  resetProgressStore,
  saveScroll,
} from './progress';

describe('progress', () => {
  beforeEach(() => { resetProgressStore(); readState.epoch = 0; });
  afterEach(() => { resetProgressStore(); });

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

  it('starts with no reads after reset', () => {
    markEssayRead('essay-1');
    resetProgressStore();
    expect(isEssayRead('essay-1')).toBe(false);
  });

  it('marks a book read only when every essay in it is read', () => {
    const book = corpus.books[0];
    expect(isBookRead(book.id)).toBe(false);
    for (const seq of book.sequences) {
      for (const essay of seq.essays) markEssayRead(essay.id);
    }
    expect(isBookRead(book.id)).toBe(true);
  });

  it('stores highlights per essay', () => {
    const saved = addHighlight('essay-1', { start: 1, end: 4, text: 'foo' });
    expect(saved?.color).toBe('yellow');
    expect(getHighlightsForEssay('essay-1')).toHaveLength(1);
    expect(addHighlight('essay-1', { start: 2, end: 5, text: 'overlap' })).toBeNull();
  });
});
