import { describe, expect, it } from 'vitest';
import {
  corpus,
  corpusWordCount,
  countableEssayCount,
  getNeighbors,
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

  it('defers bibliography and glossary to the end of reading navigation', () => {
    const intro = getNeighbors('biases-an-introduction');
    expect(intro.next?.id).toBe('what-do-i-mean-by-rationality');
    expect(intro.next?.id).not.toBe('bibliography');

    const last = getNeighbors('go-forth-and-create-the-art');
    expect(last.next?.id).toBe('bibliography');

    const bib = getNeighbors('bibliography');
    expect(bib.prev?.id).toBe('go-forth-and-create-the-art');
    expect(bib.next?.id).toBe('glossary');

    const glossary = getNeighbors('glossary');
    expect(glossary.prev?.id).toBe('bibliography');
    expect(glossary.next).toBeUndefined();
  });
});
