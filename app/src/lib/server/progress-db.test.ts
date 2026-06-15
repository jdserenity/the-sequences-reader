import { describe, expect, it } from 'vitest';
import { isReadingProgress, loadProgress, parseProgressRow, saveProgress } from '$lib/server/progress-db';
import type { ReadingProgress } from '$lib/progress-types';

const sample: ReadingProgress = {
  lastEssayId: 'essay-1',
  scrollByEssay: { 'essay-1': 40 },
  readEssayIds: ['essay-1', 'essay-2'],
  updatedAt: 500,
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
      } : null,
      bind: (...args: unknown[]) => ({
        run: async () => {
          if (sql.includes('INSERT INTO progress')) {
            stored = {
              lastEssayId: args[0] as string,
              scrollByEssay: JSON.parse(args[1] as string),
              readEssayIds: JSON.parse(args[2] as string),
              updatedAt: args[3] as number,
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
    };
    expect(parseProgressRow(row).lastEssayId).toBe('essay-1');
  });

  it('loads and saves progress', async () => {
    const db = mockDb();
    expect(await loadProgress(db)).toBeNull();
    await saveProgress(db, sample);
    expect(await loadProgress(db)).toEqual(sample);
  });

  it('rejects stale writes', async () => {
    const db = mockDb(sample);
    const stale = { ...sample, lastEssayId: 'old', updatedAt: 100 };
    const saved = await saveProgress(db, stale);
    expect(saved.lastEssayId).toBe('essay-1');
  });

  it('validates progress payloads', () => {
    expect(isReadingProgress(sample)).toBe(true);
    expect(isReadingProgress({ ...sample, readEssayIds: 'nope' })).toBe(false);
  });
});
