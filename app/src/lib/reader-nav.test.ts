import { beforeEach, describe, expect, it, vi } from 'vitest';
import { essayReaderMetaFromEntry, getEssayReaderMeta, isFootnoteHash, openFootnotesSection, scrollToHashInPanel } from './reader-nav';

describe('getEssayReaderMeta', () => {
  it('returns title, book, source, and neighbor ids', () => {
    const meta = getEssayReaderMeta('what-do-i-mean-by-rationality');
    expect(meta?.title).toBe('What Do I Mean By “Rationality”?');
    expect(meta?.bookTitle).toBe('Book I: Map and Territory');
    expect(meta?.sourceUrl).toBe('https://www.readthesequences.com/What-Do-I-Mean-By-Rationality');
    expect(meta?.prevId).toBeDefined();
    expect(meta?.nextId).toBe('feeling-rational');
  });

  it('includes neighbor titles', () => {
    const meta = getEssayReaderMeta('what-do-i-mean-by-rationality');
    expect(meta?.nextTitle).toBe('Feeling Rational');
    expect(meta?.prevTitle).toBeDefined();
  });

  it('omits book title when essay has none', () => {
    const meta = essayReaderMetaFromEntry({
      id: 'glossary',
      title: 'Glossary',
      slug: 'Glossary',
      source_url: 'https://www.readthesequences.com/Glossary',
      content_path: 'essays/glossary.md',
      order: 0,
    });
    expect(meta.bookTitle).toBeUndefined();
  });
});

describe('isFootnoteHash', () => {
  it('matches footnote and citation anchors', () => {
    expect(isFootnoteHash('#footnote1')).toBe(true);
    expect(isFootnoteHash('#citation12')).toBe(true);
    expect(isFootnoteHash('#top')).toBe(false);
  });
});

describe('openFootnotesSection', () => {
  it('opens the footnotes details element', () => {
    const details = { setAttribute: vi.fn() };
    const scrollEl = { querySelector: vi.fn(() => details) } as unknown as HTMLElement;
    openFootnotesSection(scrollEl);
    expect(scrollEl.querySelector).toHaveBeenCalledWith('.footnotes-collapse');
    expect(details.setAttribute).toHaveBeenCalledWith('open', '');
  });
});

describe('scrollToHashInPanel', () => {
  beforeEach(() => {
    vi.stubGlobal('matchMedia', () => ({ matches: true }));
    vi.stubGlobal('requestAnimationFrame', (cb: FrameRequestCallback) => { cb(0); return 0; });
  });

  it('opens footnotes and scrolls when target moves after open', () => {
    let top = 400;
    const target = { getBoundingClientRect: () => ({ top }) };
    const details = { open: false, setAttribute: vi.fn(function (this: { open: boolean }, k: string) { if (k === 'open') this.open = true; }) };
    const scrollEl = {
      scrollTop: 0,
      getBoundingClientRect: () => ({ top: 0 }),
      querySelector: vi.fn((sel: string) => (sel === '.footnotes-collapse' ? details : sel === '#footnote1' ? target : null)),
    } as unknown as HTMLElement;
    scrollToHashInPanel(scrollEl, '#footnote1');
    expect(details.setAttribute).toHaveBeenCalledWith('open', '');
    top = 150;
    expect(scrollEl.scrollTop).toBeGreaterThan(0);
  });
});
