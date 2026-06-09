/** Drop PmWiki markdown export nav boilerplate before essay body. */
export function cleanEssayMarkdown(raw: string): string {
  const mark = '\n\n❦';
  const i = raw.indexOf(mark);
  if (i >= 0) return raw.slice(i + mark.length).trim();
  return raw.trim();
}
