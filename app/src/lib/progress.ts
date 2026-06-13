import { isReferenceEssay } from './corpus';

const STORAGE_KEY = 'sequences-reader:progress';
let readGeneration = 0;

export type ReadingProgress = {
  lastEssayId: string;
  scrollByEssay: Record<string, number>;
  readEssayIds: string[];
  updatedAt: number;
};

export type ReadStats = { read: number; total: number; percent: number };

/** Scattered demo reads so TOC polish is visible before real completion tracking ships. */
export const DEMO_READ_ESSAY_IDS = [
  'biases-an-introduction',
  'what-do-i-mean-by-rationality',
  'the-proper-use-of-humility',
];

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

function writeStore(store: ReadingProgress): void {
  if (typeof localStorage === 'undefined') return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
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

export function getReadGeneration(): number { return readGeneration; }

export function isEssayRead(essayId: string): boolean {
  if (isReferenceEssay(essayId)) return false;
  return readStore()?.readEssayIds.includes(essayId) ?? false;
}

export function markEssayRead(essayId: string): void {
  if (isReferenceEssay(essayId)) return;
  const prev = readStore();
  const readEssayIds = [...(prev?.readEssayIds ?? [])];
  if (readEssayIds.includes(essayId)) return;
  readEssayIds.push(essayId);
  writeStore({
    lastEssayId: prev?.lastEssayId ?? essayId,
    scrollByEssay: prev?.scrollByEssay ?? {},
    readEssayIds,
    updatedAt: Date.now(),
  });
  readGeneration++;
}

export function getReadStats(totalEssays: number): ReadStats {
  const read = readStore()?.readEssayIds.filter((id) => !isReferenceEssay(id)).length ?? 0;
  const total = totalEssays;
  const percent = total > 0 ? (read / total) * 100 : 0;
  return { read, total, percent };
}

export function seedDemoReadsIfEmpty(): void {
  const prev = readStore();
  if (prev && prev.readEssayIds.length > 0) return;
  writeStore({
    lastEssayId: prev?.lastEssayId ?? DEMO_READ_ESSAY_IDS[0],
    scrollByEssay: prev?.scrollByEssay ?? {},
    readEssayIds: [...DEMO_READ_ESSAY_IDS],
    updatedAt: Date.now(),
  });
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
