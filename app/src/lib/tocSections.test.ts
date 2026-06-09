import { describe, expect, it } from 'vitest';
import { bookSectionKey, getBookForSection, parseSectionKey, tocBookSections } from './tocSections';

describe('tocSections', () => {
  it('lists books only as openable sections', () => {
    expect(tocBookSections.length).toBeGreaterThan(0);
    expect(tocBookSections.every((s) => s.key.startsWith('book:'))).toBe(true);
    expect(tocBookSections.some((s) => s.title.includes('essay'))).toBe(false);
  });

  it('parses book section keys', () => {
    expect(parseSectionKey(bookSectionKey('book-i-map-and-territory'))).toEqual({
      bookId: 'book-i-map-and-territory',
    });
  });

  it('resolves book content for book sections', () => {
    const key = bookSectionKey('book-i-map-and-territory');
    expect(getBookForSection(key)?.title).toContain('Book I');
  });
});
