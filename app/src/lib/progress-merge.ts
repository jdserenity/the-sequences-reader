import type { EssayHighlight, ReadingProgress } from './progress-types';
import { normalizeProgress } from './progress-types';

export type MergeSource = 'none' | 'local' | 'remote' | 'merged';

export type MergeResult = { progress: ReadingProgress | null; source: MergeSource };

function scrollAt(p: ReadingProgress): number { return p.scrollUpdatedAt ?? p.updatedAt; }

function unionReadIds(a: string[], b: string[]): string[] {
  return [...new Set([...a, ...b])];
}

function unionHighlights(a: EssayHighlight[], b: EssayHighlight[]): EssayHighlight[] {
  const map = new Map<string, EssayHighlight>();
  for (const h of [...a, ...b]) map.set(h.id, h);
  return [...map.values()].sort((x, y) => x.start - y.start || x.createdAt - y.createdAt);
}

/** Newer updatedAt wins so local deletes are not resurrected from remote; tie → union. */
function mergeHighlights(a: EssayHighlight[], b: EssayHighlight[], atA: number, atB: number): EssayHighlight[] {
  if (atA > atB) return [...a];
  if (atB > atA) return [...b];
  return unionHighlights(a, b);
}

/** Union read sets; scroll positions last-write-wins on scrollUpdatedAt. */
export function mergeProgress(local: ReadingProgress | null, remote: ReadingProgress | null): MergeResult {
  if (!local && !remote) return { progress: null, source: 'none' };
  if (!local) return { progress: normalizeProgress(remote!), source: 'remote' };
  if (!remote) return { progress: normalizeProgress(local), source: 'local' };
  const l = normalizeProgress(local);
  const r = normalizeProgress(remote);
  const scrollFromLocal = scrollAt(l) >= scrollAt(r);
  return {
    progress: {
      lastEssayId: scrollFromLocal ? l.lastEssayId : r.lastEssayId,
      scrollByEssay: scrollFromLocal ? { ...r.scrollByEssay, ...l.scrollByEssay } : { ...l.scrollByEssay, ...r.scrollByEssay },
      readEssayIds: unionReadIds(l.readEssayIds, r.readEssayIds),
      highlights: mergeHighlights(l.highlights ?? [], r.highlights ?? [], l.updatedAt, r.updatedAt),
      updatedAt: Math.max(l.updatedAt, r.updatedAt),
      scrollUpdatedAt: Math.max(scrollAt(l), scrollAt(r)),
    },
    source: 'merged',
  };
}

export function shouldPushAfterSync(remote: ReadingProgress | null, merged: ReadingProgress): boolean {
  if (!remote) return true;
  const r = normalizeProgress(remote);
  const m = normalizeProgress(merged);
  if (m.readEssayIds.length !== r.readEssayIds.length) return true;
  const readSet = new Set(r.readEssayIds);
  if (m.readEssayIds.some((id) => !readSet.has(id))) return true;
  if ((m.highlights ?? []).length !== (r.highlights ?? []).length) return true;
  const highlightIds = new Set((r.highlights ?? []).map((h) => h.id));
  if ((m.highlights ?? []).some((h) => !highlightIds.has(h.id))) return true;
  if ((r.highlights ?? []).some((h) => !new Set((m.highlights ?? []).map((x) => x.id)).has(h.id))) return true;
  if (m.scrollUpdatedAt > scrollAt(r)) return true;
  if (m.updatedAt > r.updatedAt) return true;
  return JSON.stringify(m.scrollByEssay) !== JSON.stringify(r.scrollByEssay);
}
