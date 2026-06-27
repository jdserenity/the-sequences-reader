import { corpus } from './corpus';
import { getEssayWordCount, isReferenceEssay } from './corpus';
import type { EssayHighlight, ReadingProgress, ReadStats } from './progress-types';
import { scheduleProgressPush, syncProgress } from './progress-sync';
import { bumpHighlightEpoch, bumpReadEpoch } from './progress.svelte';

let memoryStore: ReadingProgress | null = null;
let hydrated = false;

const progressIo = {
  read: readStore,
  write: (store: ReadingProgress) => writeStore(store, false),
};

function readStore(): ReadingProgress | null { return memoryStore; }

function writeStore(store: ReadingProgress, schedulePush = true): void {
  memoryStore = store;
  if (schedulePush && hydrated) scheduleProgressPush(progressIo);
}

/** Test helper — clears in-memory progress cache. */
export function resetProgressStore(): void { memoryStore = null; hydrated = false; }

export function getLastEssayId(): string | null {
  return readStore()?.lastEssayId ?? null;
}

export function getResumePath(fallbackEssayId?: string): string {
  const id = getLastEssayId() ?? fallbackEssayId;
  return id ? `/read/${id}` : '/';
}

export function getScroll(essayId: string): number {
  return readStore()?.scrollByEssay[essayId] ?? 0;
}

export function saveScroll(essayId: string, scrollY: number): void {
  const prev = readStore();
  const scrollByEssay = { ...prev?.scrollByEssay, [essayId]: Math.max(0, scrollY) };
  const now = Date.now();
  writeStore({
    lastEssayId: essayId,
    scrollByEssay,
    readEssayIds: prev?.readEssayIds ?? [],
    highlights: prev?.highlights ?? [],
    updatedAt: prev?.updatedAt ?? now,
    scrollUpdatedAt: now,
  });
}

export function isEssayRead(essayId: string): boolean {
  if (isReferenceEssay(essayId)) return false;
  return readStore()?.readEssayIds.includes(essayId) ?? false;
}

export function markEssayRead(essayId: string): void {
  if (isReferenceEssay(essayId)) return;
  markEssaysRead([essayId]);
}

export function markEssaysRead(essayIds: string[]): void {
  const countable = essayIds.filter((id) => !isReferenceEssay(id));
  if (!countable.length) return;
  const prev = readStore();
  const readSet = new Set(prev?.readEssayIds ?? []);
  let changed = false;
  for (const id of countable) {
    if (!readSet.has(id)) { readSet.add(id); changed = true; }
  }
  if (!changed) return;
  const readEssayIds = [...readSet];
  writeStore({
    lastEssayId: prev?.lastEssayId ?? countable[countable.length - 1],
    scrollByEssay: prev?.scrollByEssay ?? {},
    readEssayIds,
    highlights: prev?.highlights ?? [],
    updatedAt: Date.now(),
    scrollUpdatedAt: prev?.scrollUpdatedAt ?? prev?.updatedAt ?? Date.now(),
  });
  bumpReadEpoch();
}

export function getReadWordCount(readEssayIds: string[]): number {
  let sum = 0;
  for (const id of readEssayIds) {
    if (!isReferenceEssay(id)) sum += getEssayWordCount(id);
  }
  return sum;
}

export function getReadStats(totalEssays: number, wordsTotal: number): ReadStats {
  const readEssayIds = readStore()?.readEssayIds ?? [];
  const read = readEssayIds.filter((id) => !isReferenceEssay(id)).length;
  const total = totalEssays;
  const percent = total > 0 ? (read / total) * 100 : 0;
  const wordsRead = getReadWordCount(readEssayIds);
  return { read, total, percent, wordsRead, wordsTotal };
}

export function isBookRead(bookId: string): boolean {
  const book = corpus.books.find((b) => b.id === bookId);
  if (!book) return false;
  for (const seq of book.sequences) {
    for (const essay of seq.essays) {
      if (!isEssayRead(essay.id)) return false;
    }
  }
  return true;
}

export function getHighlightsForEssay(essayId: string): EssayHighlight[] {
  return (readStore()?.highlights ?? []).filter((h) => h.essayId === essayId);
}

export function addHighlight(essayId: string, range: { start: number; end: number; text: string }): EssayHighlight | null {
  const prev = readStore();
  const existing = prev?.highlights ?? [];
  const overlap = existing.some((h) => h.essayId === essayId && h.start < range.end && h.end > range.start);
  if (overlap) return null;
  const highlight: EssayHighlight = {
    id: crypto.randomUUID(),
    essayId,
    start: range.start,
    end: range.end,
    text: range.text,
    color: 'yellow',
    createdAt: Date.now(),
  };
  writeStore({
    lastEssayId: prev?.lastEssayId ?? essayId,
    scrollByEssay: prev?.scrollByEssay ?? {},
    readEssayIds: prev?.readEssayIds ?? [],
    highlights: [...existing, highlight],
    updatedAt: Date.now(),
    scrollUpdatedAt: prev?.scrollUpdatedAt ?? prev?.updatedAt ?? Date.now(),
  });
  bumpHighlightEpoch();
  return highlight;
}

export function removeHighlight(highlightId: string): boolean {
  const prev = readStore();
  const existing = prev?.highlights ?? [];
  const highlights = existing.filter((h) => h.id !== highlightId);
  if (highlights.length === existing.length) return false;
  writeStore({
    lastEssayId: prev?.lastEssayId ?? '',
    scrollByEssay: prev?.scrollByEssay ?? {},
    readEssayIds: prev?.readEssayIds ?? [],
    highlights,
    updatedAt: Date.now(),
    scrollUpdatedAt: prev?.scrollUpdatedAt ?? prev?.updatedAt ?? Date.now(),
  });
  bumpHighlightEpoch();
  return true;
}

export async function syncProgressFromServer(): Promise<void> {
  await syncProgress(progressIo);
  hydrated = true;
}

export function attachScrollTracking(essayId: string, el: HTMLElement): () => void {
  const restore = () => { requestAnimationFrame(() => { el.scrollTop = getScroll(essayId); }); };
  restore();
  let t: ReturnType<typeof setTimeout>;
  const onScroll = () => {
    clearTimeout(t);
    t = setTimeout(() => saveScroll(essayId, el.scrollTop), 150);
  };
  el.addEventListener('scroll', onScroll, { passive: true });
  return () => {
    el.removeEventListener('scroll', onScroll);
    clearTimeout(t);
    saveScroll(essayId, el.scrollTop);
  };
}

export { readStore as readProgress, type ReadingProgress, type ReadStats };
