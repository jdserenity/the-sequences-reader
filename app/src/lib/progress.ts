import { getEssayWordCount, isReferenceEssay } from './corpus';
import type { ReadingProgress, ReadStats } from './progress-types';
import { scheduleProgressPush, syncProgress } from './progress-sync';
import { bumpReadEpoch } from './progress.svelte';

const STORAGE_KEY = 'sequences-reader:progress';

/** Scattered demo reads so TOC polish is visible before real completion tracking ships. */
export const DEMO_READ_ESSAY_IDS = [
  'biases-an-introduction',
  'what-do-i-mean-by-rationality',
  'the-proper-use-of-humility',
];

const progressIo = {
  read: readStore,
  write: (store: ReadingProgress) => writeStore(store, false),
};

function readStore(): ReadingProgress | null {
  if (typeof localStorage === 'undefined') return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<ReadingProgress>;
    if (!parsed?.lastEssayId || typeof parsed.scrollByEssay !== 'object') return null;
    return {
      lastEssayId: parsed.lastEssayId,
      scrollByEssay: parsed.scrollByEssay,
      readEssayIds: Array.isArray(parsed.readEssayIds) ? parsed.readEssayIds : [],
      updatedAt: parsed.updatedAt ?? Date.now(),
    };
  } catch { return null; }
}

function writeStore(store: ReadingProgress, schedulePush = true): void {
  if (typeof localStorage === 'undefined') return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
  if (schedulePush) scheduleProgressPush(progressIo);
}

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
  writeStore({ lastEssayId: essayId, scrollByEssay, readEssayIds: prev?.readEssayIds ?? [], updatedAt: Date.now() });
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

export function seedDemoReadsIfEmpty(): void {
  const prev = readStore();
  if (prev && prev.readEssayIds.length > 0) return;
  writeStore({
    lastEssayId: prev?.lastEssayId ?? DEMO_READ_ESSAY_IDS[0],
    scrollByEssay: prev?.scrollByEssay ?? {},
    readEssayIds: [...DEMO_READ_ESSAY_IDS],
    updatedAt: Date.now(),
  }, false);
  bumpReadEpoch();
}

export async function syncProgressFromServer(): Promise<void> {
  await syncProgress(progressIo);
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

export { readStore as readLocalProgress, type ReadingProgress, type ReadStats };
