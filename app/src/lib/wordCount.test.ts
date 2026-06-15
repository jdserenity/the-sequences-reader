import { describe, expect, it } from 'vitest';
import { countWords, formatWordCount, formatWordCountProgress } from './wordCount';

describe('countWords', () => {
  it('counts plain words', () => {
    expect(countWords('one two three')).toBe(3);
  });

  it('ignores markdown headers and links', () => {
    expect(countWords('# Title\n\nSee [link](https://x.com) here.')).toBe(4);
  });

  it('ignores fenced code blocks', () => {
    expect(countWords('before\n\n```\nnot counted\n```\n\nafter')).toBe(2);
  });

  it('returns zero for empty text', () => {
    expect(countWords('   \n\n  ')).toBe(0);
  });
});

describe('formatWordCount', () => {
  it('formats with grouping separator', () => {
    expect(formatWordCount(1234567)).toBe('1,234,567 words');
  });
});

describe('formatWordCountProgress', () => {
  it('formats read and total with grouping separators', () => {
    expect(formatWordCountProgress(123456, 1234567)).toBe('123,456 / 1,234,567 words');
  });
});
