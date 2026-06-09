import { describe, expect, it } from 'vitest';
import { cleanEssayMarkdown } from './markdown';

describe('cleanEssayMarkdown', () => {
  it('strips nav before ❦ marker', () => {
    const raw = '# Title\n\n[Home]\n\n# Title\n\n❦\n\nBody paragraph.';
    expect(cleanEssayMarkdown(raw)).toBe('Body paragraph.');
  });
});
