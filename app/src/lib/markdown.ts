const BODY_MARK = '\n\n❦';
const REF_DEF_RE = /^\s*\[(\d+)\]:\s+(\S+)/gm;
const INLINE_FOOTNOTE_RE = /\[([^\]]+)\]\[(\d+)\]/g;
const FOOTNOTE_BLOCK_RE = /\[↩\]\[(\d+)\]/;
const FOOTNOTE_BLOCK_LINE_RE = /id="footnote\d+"/;

export type RefDefs = Map<number, string>;

export function parseRefDefs(text: string): RefDefs {
  const defs: RefDefs = new Map();
  for (const m of text.matchAll(REF_DEF_RE)) defs.set(Number(m[1]), m[2]);
  return defs;
}

export function splitBodyAndRefs(text: string): { body: string; refs: RefDefs } {
  const i = text.search(/^\s*\[\d+\]:/m);
  if (i < 0) return { body: text.trim(), refs: new Map() };
  return { body: text.slice(0, i).trim(), refs: parseRefDefs(text.slice(i)) };
}

function footnoteNumFromRef(defs: RefDefs, ref: number): number | undefined {
  const target = defs.get(ref);
  const m = target?.match(/^#footnote(\d+)$/);
  return m ? Number(m[1]) : undefined;
}

function citationNumFromRef(defs: RefDefs, ref: number): number | undefined {
  const target = defs.get(ref);
  const m = target?.match(/^#citation(\d+)$/);
  return m ? Number(m[1]) : undefined;
}

/** PmWiki pairs inline [N] with footnote/citation N; ↩ on a block is authoritative for its id. */
export function buildFootnoteMap(body: string, defs: RefDefs): Map<number, number> {
  const map = new Map<number, number>();
  for (const line of body.split('\n')) {
    const back = line.match(FOOTNOTE_BLOCK_RE);
    if (!back) continue;
    const citationNum = citationNumFromRef(defs, Number(back[1]));
    if (citationNum) map.set(citationNum, citationNum);
  }
  for (const m of body.matchAll(INLINE_FOOTNOTE_RE)) {
    const fn = footnoteNumFromRef(defs, Number(m[2]));
    if (fn !== undefined && !map.has(fn)) map.set(fn, fn);
  }
  return map;
}

/** Sort footnote blocks (after ❖) by their ↩ citation number. */
export function sortFootnoteSection(body: string, defs: RefDefs): string {
  const lines = body.split('\n');
  const diamond = lines.findIndex((l) => l.trim() === '❖');
  if (diamond < 0) return body;
  const main = lines.slice(0, diamond).join('\n');
  const footLines = lines.slice(diamond + 1);
  const blocks: { num: number; lines: string[] }[] = [];
  let cur: string[] = [];
  for (const line of footLines) {
    cur.push(line);
    const back = line.match(FOOTNOTE_BLOCK_RE);
    if (!back) continue;
    const cn = citationNumFromRef(defs, Number(back[1]));
    if (cn !== undefined) { blocks.push({ num: cn, lines: cur }); cur = []; }
  }
  if (cur.some((l) => l.trim())) blocks.push({ num: 9999, lines: cur });
  blocks.sort((a, b) => a.num - b.num);
  return `${main}\n\n❖\n\n${blocks.flatMap((b) => b.lines).join('\n')}`.trimEnd();
}

export function resolveReferenceLinks(body: string, defs: RefDefs): string {
  return body.replace(INLINE_FOOTNOTE_RE, (full, label, refStr) => {
    const target = defs.get(Number(refStr));
    if (!target || target.startsWith('#')) return full;
    const url = target.replace(/^<(.+)>$/, '$1');
    return `[${label}](${url})`;
  });
}

export function injectFootnoteAnchors(body: string, defs: RefDefs, footnoteMap: Map<number, number>): string {
  return body.split('\n').map((line) => {
    let blockNum: number | undefined;
    const back = line.match(FOOTNOTE_BLOCK_RE);
    if (back) blockNum = citationNumFromRef(defs, Number(back[1]));
    let lineOut = line.replace(INLINE_FOOTNOTE_RE, (full, label, refStr) => {
      const fn = footnoteNumFromRef(defs, Number(refStr));
      if (fn === undefined) return full;
      const cn = footnoteMap.get(fn) ?? fn;
      return `<span id="citation${cn}"><a href="#footnote${fn}">${label}</a></span>`;
    });
    lineOut = lineOut.replace(/\[↩\]\[(\d+)\]/g, (full, refStr) => {
      const cn = citationNumFromRef(defs, Number(refStr));
      return cn ? `<a href="#citation${cn}">↩</a>` : full;
    });
    if (blockNum !== undefined) lineOut = `<span id="footnote${blockNum}"></span><span class="footnote-num">${blockNum}.</span> ${lineOut}`;
    return lineOut;
  }).join('\n');
}

const FOOTER_START_RE = /\n\[(?:Top|Preface|Book\b|Sequence\]\[)/;
const FOOTER_SEQUENCE_RE = /\n\[[^\]]*\(sequence\)/i;
const FOOTER_BOOK_PIPE_RE = /\n\[[^\]]*\| Rationality/;

export function wrapFootnotesCollapsible(body: string): string {
  const lines = body.split('\n');
  let start = lines.findIndex((l) => FOOTNOTE_BLOCK_LINE_RE.test(l));
  if (start < 0) return body;
  if (start > 0 && lines[start - 1].trim() === '❖') start -= 1;
  const main = lines.slice(0, start).join('\n').trimEnd();
  const footnotes = lines.slice(start).join('\n').trim();
  if (!footnotes) return body;
  return `${main}\n\n<details class="footnotes-collapse">\n<summary><span class="footnotes-chevron" aria-hidden="true">▸</span> Footnotes</summary>\n\n${footnotes}\n</details>`;
}

export function stripEssayFooter(body: string): string {
  let end = body.length;
  for (const re of [FOOTER_START_RE, FOOTER_SEQUENCE_RE, FOOTER_BOOK_PIPE_RE]) {
    const m = re.exec(body);
    if (m && m.index < end) end = m.index;
  }
  let text = body.slice(0, end).trim();
  const lines = text.split('\n');
  while (lines.length && /^\[[^\]]+\]\[\d+\]\s*$/.test(lines[lines.length - 1].trim())) lines.pop();
  return lines.join('\n').trim();
}

/** Drop PmWiki markdown export nav boilerplate; wire footnote/citation anchors; strip site footer. */
export function cleanEssayMarkdown(raw: string): string {
  const i = raw.indexOf(BODY_MARK);
  let text = i >= 0 ? raw.slice(i + BODY_MARK.length).trim() : raw.trim();
  const { body, refs } = splitBodyAndRefs(text);
  const sorted = sortFootnoteSection(body, refs);
  const footnoteMap = buildFootnoteMap(sorted, refs);
  const anchored = injectFootnoteAnchors(sorted, refs, footnoteMap);
  const linked = resolveReferenceLinks(anchored, refs);
  const trimmed = stripEssayFooter(linked);
  return wrapFootnotesCollapsible(trimmed);
}
