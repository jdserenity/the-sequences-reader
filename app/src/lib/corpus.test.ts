import { describe, expect, it } from 'vitest';
import {
  corpus,
  corpusWordCount,
  countableEssayCount,
  getEssayWordCount,
  isReferenceEssay,
  tocReference,
} from './corpus';

describe('corpus word counts', () => {
  it('exposes per-essay counts that sum to the countable corpus total', () => {
    let sum = 0;
    for (const essay of corpus.essays) {
      if (!isReferenceEssay(essay.id)) sum += getEssayWordCount(essay.id);
    }
    expect(sum).toBe(corpusWordCount);
    expect(corpusWordCount).toBeGreaterThan(100_000);
  });

  it('excludes bibliography and glossary from countable essays', () => {
    expect(tocReference.map((i) => i.id)).toEqual(['bibliography', 'glossary']);
    expect(countableEssayCount).toBe(corpus.essays.length - 2);
    expect(getEssayWordCount('bibliography')).toBeGreaterThan(0);
    expect(getEssayWordCount('glossary')).toBeGreaterThan(0);
  });
});
