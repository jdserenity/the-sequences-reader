const STORAGE_KEY = 'sequences-reader:progress';

export type ReadingProgress = {
  lastEssayId: string;
  scrollByEssay: Record<string, number>;
  updatedAt: number;
};

function readStore(): ReadingProgress | null {
  if (typeof localStorage === 'undefined') return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as ReadingProgress;
    if (!parsed?.lastEssayId || typeof parsed.scrollByEssay !== 'object') return null;
    return parsed;
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
  writeStore({ lastEssayId: essayId, scrollByEssay, updatedAt: Date.now() });
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
