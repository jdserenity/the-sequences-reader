import manifest from '@content/manifest.json';
import type { EssayEntry, Manifest } from './types';
import { cleanEssayMarkdown } from './markdown';

export const corpus = manifest as Manifest;

const essayModules = import.meta.glob('@content/essays/*.md', { query: '?raw', import: 'default', eager: true }) as Record<string, string>;

const essayBodies = new Map<string, string>();
for (const [path, raw] of Object.entries(essayModules)) {
  const m = path.match(/\/([^/]+)\.md$/);
  if (m) essayBodies.set(m[1], cleanEssayMarkdown(raw));
}

const byId = new Map<string, EssayEntry>(corpus.essays.map((e) => [e.id, e]));
const byOrder = [...corpus.essays].sort((a, b) => a.order - b.order);

export function getEssay(id: string): EssayEntry | undefined { return byId.get(id); }

export function getEssayBody(id: string): string | undefined { return essayBodies.get(id); }

export function getNeighbors(id: string): { prev?: EssayEntry; next?: EssayEntry } {
  const i = byOrder.findIndex((e) => e.id === id);
  if (i < 0) return {};
  return { prev: byOrder[i - 1], next: byOrder[i + 1] };
}
