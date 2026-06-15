import { describe, expect, it } from 'vitest';
import { mergeProgress, shouldPushAfterMerge } from './progress-merge';
import type { ReadingProgress } from './progress-types';

const local: ReadingProgress = {
  lastEssayId: 'essay-a',
  scrollByEssay: { 'essay-a': 10 },
  readEssayIds: ['essay-a'],
  updatedAt: 100,
};

const remote: ReadingProgress = {
  lastEssayId: 'essay-b',
  scrollByEssay: { 'essay-b': 20 },
  readEssayIds: ['essay-b'],
  updatedAt: 200,
};

describe('mergeProgress', () => {
  it('returns none when both missing', () => {
    expect(mergeProgress(null, null)).toEqual({ progress: null, source: 'none' });
  });

  it('prefers remote when only remote exists', () => {
    expect(mergeProgress(null, remote)).toEqual({ progress: remote, source: 'remote' });
  });

  it('prefers local when only local exists', () => {
    expect(mergeProgress(local, null)).toEqual({ progress: local, source: 'local' });
  });

  it('last-write-wins on updatedAt', () => {
    expect(mergeProgress(local, remote).progress).toBe(remote);
    expect(mergeProgress({ ...local, updatedAt: 300 }, remote).progress?.lastEssayId).toBe('essay-a');
  });

  it('local wins ties on updatedAt', () => {
    const tied = { ...remote, updatedAt: local.updatedAt };
    expect(mergeProgress(local, tied).source).toBe('local');
  });
});

describe('shouldPushAfterMerge', () => {
  it('pushes when local wins and is newer', () => {
    expect(shouldPushAfterMerge('local', { ...local, updatedAt: 300 }, remote)).toBe(true);
  });

  it('pushes when seeding remote from local-only state', () => {
    expect(shouldPushAfterMerge('local', local, null)).toBe(true);
  });

  it('does not push when remote wins', () => {
    expect(shouldPushAfterMerge('remote', local, remote)).toBe(false);
  });
});
