import { describe, expect, it } from 'vitest';
import { mergeProgress, shouldPushAfterSync } from './progress-merge';
import type { ReadingProgress } from './progress-types';

const local: ReadingProgress = {
  lastEssayId: 'essay-a',
  scrollByEssay: { 'essay-a': 10 },
  readEssayIds: ['essay-a'],
  updatedAt: 100,
  scrollUpdatedAt: 500,
};

const remote: ReadingProgress = {
  lastEssayId: 'essay-b',
  scrollByEssay: { 'essay-b': 20 },
  readEssayIds: ['essay-b', 'essay-c'],
  updatedAt: 200,
  scrollUpdatedAt: 100,
};

describe('mergeProgress', () => {
  it('returns none when both missing', () => {
    expect(mergeProgress(null, null)).toEqual({ progress: null, source: 'none' });
  });

  it('prefers remote when only remote exists', () => {
    expect(mergeProgress(null, remote).source).toBe('remote');
  });

  it('prefers local when only local exists', () => {
    expect(mergeProgress(local, null).source).toBe('local');
  });

  it('unions read essays from both sides', () => {
    const merged = mergeProgress(local, remote).progress!;
    expect(merged.readEssayIds.sort()).toEqual(['essay-a', 'essay-b', 'essay-c']);
  });

  it('keeps newer scroll positions without clobbering reads', () => {
    const merged = mergeProgress(local, remote).progress!;
    expect(merged.scrollByEssay).toEqual({ 'essay-b': 20, 'essay-a': 10 });
    expect(merged.lastEssayId).toBe('essay-a');
  });

  it('pulls remote reads even when local scroll is newer', () => {
    const demoLocal = {
      ...local,
      readEssayIds: ['biases-an-introduction'],
      updatedAt: 9_999,
      scrollUpdatedAt: 9_999,
    };
    const seededRemote = {
      ...remote,
      readEssayIds: ['preface', 'biases-an-introduction', 'essay-b'],
      updatedAt: 100,
      scrollUpdatedAt: 100,
    };
    const merged = mergeProgress(demoLocal, seededRemote).progress!;
    expect(merged.readEssayIds).toContain('preface');
    expect(merged.readEssayIds).toContain('essay-b');
  });
});

describe('shouldPushAfterSync', () => {
  it('pushes when merged reads grew on server', () => {
    const merged = mergeProgress(local, remote).progress!;
    expect(shouldPushAfterSync(remote, merged)).toBe(true);
  });

  it('does not push when remote already matches merged', () => {
    expect(shouldPushAfterSync(remote, remote)).toBe(false);
  });
});
