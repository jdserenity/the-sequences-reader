import manifest from '@content/manifest.json';
import type { EssayEntry, Manifest } from './types';
import { cleanEssayMarkdown } from './markdown';
import { countWords } from './wordCount';

export const corpus = manifest as Manifest;

/** Bibliography and glossary: navigable but not counted in stats or completion. */
export const REFERENCE_ESSAY_IDS = new Set(['bibliography', 'glossary']);

export function isReferenceEssay(id: string): boolean { return REFERENCE_ESSAY_IDS.has(id); }

export const tocFrontMatter = corpus.standalone.filter((i) => !isReferenceEssay(i.id));
export const tocReference = corpus.standalone.filter((i) => isReferenceEssay(i.id));
export const countableEssays = corpus.essays.filter((e) => !isReferenceEssay(e.id));
export const countableEssayCount = countableEssays.length;

const essayModules = import.meta.glob('@content/essays/*.md', { query: '?raw', import: 'default', eager: true }) as Record<string, string>;

const essayBodies = new Map<string, string>();
const essayWordCounts = new Map<string, number>();
let corpusWordCount = 0;
for (const [path, raw] of Object.entries(essayModules)) {
  const m = path.match(/\/([^/]+)\.md$/);
  if (m) {
    const body = cleanEssayMarkdown(raw);
    essayBodies.set(m[1], body);
    const words = countWords(body);
    essayWordCounts.set(m[1], words);
    if (!isReferenceEssay(m[1])) corpusWordCount += words;
  }
}
export { corpusWordCount };

const byId = new Map<string, EssayEntry>(corpus.essays.map((e) => [e.id, e]));
const byOrder = [...corpus.essays].sort((a, b) => a.order - b.order);
/** Reading sequence: corpus order with bibliography and glossary deferred to the end. */
export const readingNavOrder = [
  ...byOrder.filter((e) => !isReferenceEssay(e.id)),
  ...byOrder.filter((e) => isReferenceEssay(e.id)),
];

export function getEssay(id: string): EssayEntry | undefined { return byId.get(id); }

export function getEssayBody(id: string): string | undefined { return essayBodies.get(id); }

export function getEssayWordCount(id: string): number { return essayWordCounts.get(id) ?? 0; }

export function getNeighbors(id: string): { prev?: EssayEntry; next?: EssayEntry } {
  const i = readingNavOrder.findIndex((e) => e.id === id);
  if (i < 0) return {};
  return { prev: readingNavOrder[i - 1], next: readingNavOrder[i + 1] };
}
