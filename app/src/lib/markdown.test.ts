import { describe, expect, it } from 'vitest';
import { buildFootnoteMap, cleanEssayMarkdown, injectFootnoteAnchors, parseRefDefs, resolveReferenceLinks, sortFootnoteSection, stripEssayFooter, stripTrailingNavLinks, wrapFootnotesCollapsible } from './markdown';

describe('cleanEssayMarkdown', () => {
  it('strips nav before ❦ marker', () => {
    const raw = '# Title\n\n[Home]\n\n# Title\n\n❦\n\nBody paragraph.';
    expect(cleanEssayMarkdown(raw)).toBe('Body paragraph.');
  });

  it('injects citation and footnote anchors for backlinks', () => {
    const raw = `❦\n\nText here.[1][8]\n\nFootnote block. [↩][45]\n\n [8]: #footnote1\n [45]: #citation1`;
    const out = cleanEssayMarkdown(raw);
    expect(out).toContain('id="citation1"');
    expect(out).toContain('href="#footnote1"');
    expect(out).toContain('id="footnote1"');
    expect(out).toContain('class="footnote-num">1.</span>');
    expect(out).toContain('<a href="#citation1">↩</a>');
  });

  it('uses ↩ citation for block id even with other inline footnote refs on the line', () => {
    const defs = parseRefDefs('[55]: #footnote21\n [59]: #citation11');
    const body = 'Long note.[21][55] [↩][59]';
    const map = buildFootnoteMap(body, defs);
    expect(map.get(11)).toBe(11);
    expect(map.get(21)).toBe(21);
    const out = injectFootnoteAnchors(body, defs, map);
    expect(out).toContain('id="footnote11"');
    expect(out).toContain('class="footnote-num">11.</span>');
    expect(out).toContain('href="#footnote21">21</a>');
    expect(out).toContain('<a href="#citation11">↩</a>');
  });

  it('sorts footnote blocks by citation number', () => {
    const defs = parseRefDefs('[45]: #citation1\n [59]: #citation11\n [65]: #citation14');
    const body = 'Intro.\n\n❖\n\nBlock eleven. [↩][59]\n\nBlock one. [↩][45]\n\nBlock fourteen. [↩][65]';
    const sorted = sortFootnoteSection(body, defs);
    expect(sorted.indexOf('Block one')).toBeLessThan(sorted.indexOf('Block eleven'));
    expect(sorted.indexOf('Block eleven')).toBeLessThan(sorted.indexOf('Block fourteen'));
  });

  it('strips site footer nav before reference definitions', () => {
    const body = 'Essay ends here.\n\n[Top][7]\n\n[Book I | Rationality][32]\n\n[Next Essay][16]';
    expect(stripEssayFooter(body)).toBe('Essay ends here.');
  });

  it('strips multiline sequence footer before Top', () => {
    const body = 'Essay ends here.\n\n[Predictably Wrong\n(sequence)][27]\n\n[Top][7]';
    expect(stripEssayFooter(body)).toBe('Essay ends here.');
  });

  it('keeps footnotes when a comment marker appears before them', () => {
    const raw = `# Title\n\n❦\n\nEssay body.\n\n[ ][20]\n\nNote. [↩][24]\n\n[Top][7]\n\n [20]: https://www.greaterwrong.com/x\n [24]: #citation1`;
    const out = cleanEssayMarkdown(raw);
    expect(out).toContain('footnotes-collapse');
    expect(out).toContain('↩');
    expect(out).not.toContain('[Top]');
  });

  it('strips resolved next-essay nav link at the end', () => {
    const body = 'Essay ends here.\n\n[Rationalization](https://www.readthesequences.com/Rationalization)';
    expect(stripTrailingNavLinks(body)).toBe('Essay ends here.');
  });

  it('resolves reference links to markdown URLs', () => {
    const defs = parseRefDefs('[28]: https://example.com/ob\n [29]: https://example.com/lw');
    const out = resolveReferenceLinks('blogs *[Overcoming Bias][28]* and *[Less Wrong][29]*.', defs);
    expect(out).toBe('blogs *[Overcoming Bias](https://example.com/ob)* and *[Less Wrong](https://example.com/lw)*.');
  });

  it('wraps footnote blocks in a collapsed details section', () => {
    const body = 'Main text.\n\n❖\n\n<span id="footnote1"></span><span class="footnote-num">1.</span> Note. <a href="#citation1">↩</a>';
    const out = wrapFootnotesCollapsible(body);
    expect(out).toContain('<details class="footnotes-collapse">');
    expect(out).toContain('footnotes-chevron');
    expect(out).toContain('<summary>');
    expect(out).not.toContain('open');
    expect(out.startsWith('Main text.')).toBe(true);
  });

  it('resolves body links from pmwiki reference block', () => {
    const raw = `# Title\n\n❦\n\nSee *[Less Wrong][29]*.\n\n [29]: https://www.greaterwrong.com/`;
    expect(cleanEssayMarkdown(raw)).toBe('See *[Less Wrong](https://www.greaterwrong.com/)*.');
  });

  it('removes site nav footer from a real essay export', () => {
    const raw = `# Title\n\n❦\n\nEssay body.\n\n[Rationalization][13]\n\n[Top][7]\n\n[Book][14]\n\n [13]: https://www.readthesequences.com/Rationalization\n [7]: https://www.readthesequences.com/Contents`;
    expect(cleanEssayMarkdown(raw)).toBe('Essay body.');
  });
});
