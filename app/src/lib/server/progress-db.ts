import type { ReadingProgress } from '$lib/progress-types';

type ProgressRow = {
  last_essay_id: string;
  scroll_by_essay: string;
  read_essay_ids: string;
  updated_at: number;
};

export function parseProgressRow(row: ProgressRow): ReadingProgress {
  return {
    lastEssayId: row.last_essay_id,
    scrollByEssay: JSON.parse(row.scroll_by_essay) as Record<string, number>,
    readEssayIds: JSON.parse(row.read_essay_ids) as string[],
    updatedAt: row.updated_at,
  };
}

export async function loadProgress(db: D1Database): Promise<ReadingProgress | null> {
  const row = await db.prepare(
    'SELECT last_essay_id, scroll_by_essay, read_essay_ids, updated_at FROM progress WHERE id = 1',
  ).first<ProgressRow>();
  return row ? parseProgressRow(row) : null;
}

export async function saveProgress(db: D1Database, progress: ReadingProgress): Promise<ReadingProgress> {
  const existing = await loadProgress(db);
  if (existing && progress.updatedAt < existing.updatedAt) return existing;
  await db.prepare(
    `INSERT INTO progress (id, last_essay_id, scroll_by_essay, read_essay_ids, updated_at)
     VALUES (1, ?, ?, ?, ?)
     ON CONFLICT(id) DO UPDATE SET
       last_essay_id = excluded.last_essay_id,
       scroll_by_essay = excluded.scroll_by_essay,
       read_essay_ids = excluded.read_essay_ids,
       updated_at = excluded.updated_at
     WHERE excluded.updated_at >= progress.updated_at`,
  ).bind(
    progress.lastEssayId,
    JSON.stringify(progress.scrollByEssay),
    JSON.stringify(progress.readEssayIds),
    progress.updatedAt,
  ).run();
  return (await loadProgress(db)) ?? progress;
}

export function isReadingProgress(value: unknown): value is ReadingProgress {
  if (!value || typeof value !== 'object') return false;
  const p = value as Partial<ReadingProgress>;
  return typeof p.lastEssayId === 'string'
    && typeof p.scrollByEssay === 'object' && p.scrollByEssay !== null
    && Array.isArray(p.readEssayIds)
    && typeof p.updatedAt === 'number';
}
