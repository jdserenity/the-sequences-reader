import { getEssayWordCount, isReferenceEssay } from './corpus';
import type { ReadingProgress, ReadStats } from './progress-types';
import { scheduleProgressPush, syncProgress } from './progress-sync';
import { bumpReadEpoch } from './progress.svelte';

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
