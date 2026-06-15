import { describe, expect, it } from 'vitest';
import { mergeProgress } from '$lib/progress-merge';
import { isReadingProgress, loadProgress, parseProgressRow, saveProgress } from '$lib/server/progress-db';
import type { ReadingProgress } from '$lib/progress-types';

const sample: ReadingProgress = {
  lastEssayId: 'essay-1',
  scrollByEssay: { 'essay-1': 40 },
  readEssayIds: ['essay-1', 'essay-2'],
  updatedAt: 500,
  scrollUpdatedAt: 600,
};

function mockDb(row: ReturnType<typeof parseProgressRow> | null = null) {
  let stored = row;
  const db = {
    prepare: (sql: string) => ({
      first: async () => stored ? {
        last_essay_id: stored.lastEssayId,
        scroll_by_essay: JSON.stringify(stored.scrollByEssay),
        read_essay_ids: JSON.stringify(stored.readEssayIds),
        updated_at: stored.updatedAt,
        scroll_updated_at: stored.scrollUpdatedAt,
      } : null,
      bind: (...args: unknown[]) => ({
        run: async () => {
          if (sql.includes('INSERT INTO progress')) {
            stored = {
              lastEssayId: args[0] as string,
              scrollByEssay: JSON.parse(args[1] as string),
              readEssayIds: JSON.parse(args[2] as string),
              updatedAt: args[3] as number,
              scrollUpdatedAt: args[4] as number,
            };
          }
        },
      }),
    }),
  };
  return db as unknown as D1Database;
}

describe('progress-db', () => {
  it('parses stored rows', () => {
    const row = {
      last_essay_id: 'essay-1',
      scroll_by_essay: '{"essay-1":1}',
      read_essay_ids: '["essay-1"]',
      updated_at: 1,
      scroll_updated_at: 2,
    };
    expect(parseProgressRow(row).scrollUpdatedAt).toBe(2);
  });

  it('loads and saves progress', async () => {
    const db = mockDb();
    expect(await loadProgress(db)).toBeNull();
    await saveProgress(db, sample);
    expect(await loadProgress(db)).toEqual(sample);
  });

  it('merges incoming writes with existing reads', async () => {
    const db = mockDb(sample);
    const incoming: ReadingProgress = {
      lastEssayId: 'essay-9',
      scrollByEssay: { 'essay-9': 1 },
      readEssayIds: ['essay-9'],
      updatedAt: 100,
      scrollUpdatedAt: 900,
    };
    await saveProgress(db, incoming);
    const stored = await loadProgress(db);
    expect(stored?.readEssayIds).toEqual(expect.arrayContaining(['essay-1', 'essay-2', 'essay-9']));
    expect(stored?.scrollByEssay['essay-9']).toBe(1);
  });

  it('validates progress payloads', () => {
    expect(isReadingProgress(sample)).toBe(true);
    expect(isReadingProgress({ ...sample, readEssayIds: 'nope' })).toBe(false);
  });
});
