import type { ReadingProgress } from './progress-types';

export type MergeSource = 'none' | 'local' | 'remote';

export type MergeResult = { progress: ReadingProgress | null; source: MergeSource };

/** Last-write-wins on updatedAt; local wins ties. */
export function mergeProgress(local: ReadingProgress | null, remote: ReadingProgress | null): MergeResult {
  if (!local && !remote) return { progress: null, source: 'none' };
  if (!local) return { progress: remote, source: 'remote' };
  if (!remote) return { progress: local, source: 'local' };
  if (local.updatedAt >= remote.updatedAt) return { progress: local, source: 'local' };
  return { progress: remote, source: 'remote' };
}

export function shouldPushAfterMerge(source: MergeSource, local: ReadingProgress | null, remote: ReadingProgress | null): boolean {
  if (source !== 'local' || !local) return false;
  if (!remote) return true;
  return local.updatedAt > remote.updatedAt;
}
