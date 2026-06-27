import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import type { ReadingProgress } from './progress-types';
import { fetchRemoteProgress, flushProgressPush, pushRemoteProgress, scheduleProgressPush, syncProgress } from './progress-sync';

const sample: ReadingProgress = {
  lastEssayId: 'essay-1',
  scrollByEssay: { 'essay-1': 12 },
  readEssayIds: ['essay-1', 'essay-2'],
  highlights: [],
  updatedAt: 100,
  scrollUpdatedAt: 100,
};

function mockFetch(handler: (url: string, init?: RequestInit) => Response | Promise<Response>): typeof fetch {
  return vi.fn((input: RequestInfo | URL, init?: RequestInit) => {
    const url = typeof input === 'string' ? input : input.toString();
    return Promise.resolve(handler(url, init));
  }) as typeof fetch;
}

describe('progress-sync', () => {
  beforeEach(() => { vi.useFakeTimers(); });
  afterEach(() => { vi.useRealTimers(); vi.restoreAllMocks(); });

  it('pulls remote reads into local even when local scroll is newer', async () => {
    const local: ReadingProgress = {
      lastEssayId: 'essay-1',
      scrollByEssay: { 'essay-1': 99 },
      readEssayIds: ['biases-an-introduction'],
      highlights: [],
      updatedAt: 500,
      scrollUpdatedAt: 9_000,
    };
    const remote: ReadingProgress = {
      lastEssayId: 'doublethink-choosing-to-be-biased',
      scrollByEssay: {},
      readEssayIds: ['preface', 'biases-an-introduction', 'essay-2'],
      highlights: [],
      updatedAt: 100,
      scrollUpdatedAt: 100,
    };
    const writes: ReadingProgress[] = [];
    const fetchFn = mockFetch((url) => {
      if (url === '/api/progress') return new Response(JSON.stringify(remote));
      return new Response('{}', { status: 404 });
    });
    await syncProgress({ read: () => local, write: (p) => { writes.push(p); } }, fetchFn);
    expect(writes[0]?.readEssayIds).toContain('preface');
    expect(writes[0]?.readEssayIds).toContain('essay-2');
    expect(writes[0]?.scrollByEssay['essay-1']).toBe(99);
  });

  it('pushes local progress when remote is missing', async () => {
    const puts: ReadingProgress[] = [];
    const fetchFn = mockFetch((url, init) => {
      if (url === '/api/progress' && !init?.method) return new Response('null');
      if (url === '/api/progress' && init?.method === 'PUT') {
        puts.push(JSON.parse(String(init.body)) as ReadingProgress);
        return new Response(JSON.stringify(sample));
      }
      return new Response('{}', { status: 404 });
    });
    await syncProgress({ read: () => sample, write: () => {} }, fetchFn);
    expect(puts.length).toBe(1);
  });

  it('debounces remote pushes into one flush', async () => {
    const fetchFn = mockFetch((url, init) => {
      if (url === '/api/progress' && !init?.method) return new Response('null');
      if (init?.method === 'PUT') return new Response(JSON.stringify(sample));
      return new Response('null');
    });
    const io = { read: () => sample, write: () => {} };
    scheduleProgressPush(io, fetchFn);
    scheduleProgressPush(io, fetchFn);
    await vi.advanceTimersByTimeAsync(500);
    await Promise.resolve();
    await Promise.resolve();
    const puts = fetchFn.mock.calls.filter(([, init]) => init?.method === 'PUT');
    expect(puts.length).toBe(1);
  });

  it('merges with remote before push so scroll-only state cannot drop reads', async () => {
    const local: ReadingProgress = {
      lastEssayId: 'essay-1',
      scrollByEssay: { 'essay-1': 99 },
      readEssayIds: [],
      highlights: [],
      updatedAt: 1,
      scrollUpdatedAt: 9_000,
    };
    const remote: ReadingProgress = {
      lastEssayId: 'essay-2',
      scrollByEssay: {},
      readEssayIds: ['preface', 'essay-2'],
      highlights: [],
      updatedAt: 100,
      scrollUpdatedAt: 100,
    };
    let putBody: ReadingProgress | null = null;
    const fetchFn = mockFetch((url, init) => {
      if (url === '/api/progress' && !init?.method) return new Response(JSON.stringify(remote));
      if (init?.method === 'PUT') {
        putBody = JSON.parse(String(init.body)) as ReadingProgress;
        return new Response(JSON.stringify(putBody));
      }
      return new Response('null');
    });
    await flushProgressPush({ read: () => local, write: () => {} }, fetchFn);
    expect(putBody?.readEssayIds).toContain('preface');
    expect(putBody?.readEssayIds).toContain('essay-2');
    expect(putBody?.scrollByEssay['essay-1']).toBe(99);
  });

  it('treats 503 as offline', async () => {
    const fetchFn = mockFetch(() => new Response('{}', { status: 503 }));
    expect(await fetchRemoteProgress(fetchFn)).toBeNull();
    expect(await pushRemoteProgress(sample, fetchFn)).toBeNull();
  });
});
