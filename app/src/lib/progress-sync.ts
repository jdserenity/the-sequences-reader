import { mergeProgress, shouldPushAfterMerge } from './progress-merge';
import type { ReadingProgress } from './progress-types';
import { bumpReadEpoch } from './progress.svelte';

const API = '/api/progress';
const PUSH_DEBOUNCE_MS = 500;

let pushTimer: ReturnType<typeof setTimeout> | null = null;

type ProgressIO = {
  read: () => ReadingProgress | null;
  write: (store: ReadingProgress) => void;
};

export async function fetchRemoteProgress(fetchFn: typeof fetch = fetch): Promise<ReadingProgress | null> {
  try {
    const res = await fetchFn(API);
    if (res.status === 503) return null;
    if (!res.ok) return null;
    const data: unknown = await res.json();
    return data as ReadingProgress | null;
  } catch { return null; }
}

export async function pushRemoteProgress(progress: ReadingProgress, fetchFn: typeof fetch = fetch): Promise<ReadingProgress | null> {
  try {
    const res = await fetchFn(API, {
      method: 'PUT',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(progress),
    });
    if (!res.ok) return null;
    return await res.json() as ReadingProgress;
  } catch { return null; }
}

export async function syncProgress(io: ProgressIO, fetchFn: typeof fetch = fetch): Promise<void> {
  const local = io.read();
  const remote = await fetchRemoteProgress(fetchFn);
  const { progress, source } = mergeProgress(local, remote);
  if (!progress) return;
  const changed = !local
    || progress.updatedAt !== local.updatedAt
    || progress.lastEssayId !== local.lastEssayId
    || progress.readEssayIds.length !== local.readEssayIds.length;
  if (changed) {
    io.write(progress);
    bumpReadEpoch();
  }
  if (shouldPushAfterMerge(source, local, remote)) await pushRemoteProgress(progress, fetchFn);
}

export function scheduleProgressPush(io: ProgressIO, fetchFn: typeof fetch = fetch): void {
  if (pushTimer) clearTimeout(pushTimer);
  pushTimer = setTimeout(() => {
    pushTimer = null;
    const local = io.read();
    if (local) void pushRemoteProgress(local, fetchFn);
  }, PUSH_DEBOUNCE_MS);
}
