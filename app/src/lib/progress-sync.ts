import { mergeProgress, shouldPushAfterSync } from './progress-merge';
import type { ReadingProgress } from './progress-types';
import { normalizeProgress } from './progress-types';
import { bumpReadEpoch } from './progress.svelte';

const API = '/api/progress';
const PUSH_DEBOUNCE_MS = 500;

let pushTimer: ReturnType<typeof setTimeout> | null = null;

type ProgressIO = {
  read: () => ReadingProgress | null;
  write: (store: ReadingProgress) => void;
};

function readIdsChanged(a: ReadingProgress | null, b: ReadingProgress): boolean {
  if (!a) return true;
  if (a.readEssayIds.length !== b.readEssayIds.length) return true;
  const set = new Set(a.readEssayIds);
  return b.readEssayIds.some((id) => !set.has(id));
}

function localChanged(a: ReadingProgress | null, b: ReadingProgress): boolean {
  if (!a) return true;
  return readIdsChanged(a, b)
    || a.lastEssayId !== b.lastEssayId
    || a.updatedAt !== b.updatedAt
    || (a.scrollUpdatedAt ?? a.updatedAt) !== (b.scrollUpdatedAt ?? b.updatedAt)
    || JSON.stringify(a.scrollByEssay) !== JSON.stringify(b.scrollByEssay);
}

export async function fetchRemoteProgress(fetchFn: typeof fetch = fetch): Promise<ReadingProgress | null> {
  try {
    const res = await fetchFn(API);
    if (res.status === 503) return null;
    if (!res.ok) return null;
    const data: unknown = await res.json();
    if (!data) return null;
    return normalizeProgress(data as ReadingProgress);
  } catch { return null; }
}

export async function pushRemoteProgress(progress: ReadingProgress, fetchFn: typeof fetch = fetch): Promise<ReadingProgress | null> {
  try {
    const res = await fetchFn(API, {
      method: 'PUT',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(normalizeProgress(progress)),
    });
    if (!res.ok) return null;
    return normalizeProgress(await res.json() as ReadingProgress);
  } catch { return null; }
}

export async function syncProgress(io: ProgressIO, fetchFn: typeof fetch = fetch): Promise<void> {
  const local = io.read();
  const remote = await fetchRemoteProgress(fetchFn);
  const { progress } = mergeProgress(local, remote);
  if (!progress) return;
  if (localChanged(local, progress)) {
    io.write(progress);
    bumpReadEpoch();
  }
  if (shouldPushAfterSync(remote, progress)) await pushRemoteProgress(progress, fetchFn);
}

export function scheduleProgressPush(io: ProgressIO, fetchFn: typeof fetch = fetch): void {
  if (pushTimer) clearTimeout(pushTimer);
  pushTimer = setTimeout(() => {
    pushTimer = null;
    const local = io.read();
    if (local) void pushRemoteProgress(normalizeProgress(local), fetchFn);
  }, PUSH_DEBOUNCE_MS);
}
