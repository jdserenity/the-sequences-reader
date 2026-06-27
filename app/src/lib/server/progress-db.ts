import { mergeProgress } from '$lib/progress-merge';
import type { ReadingProgress } from '$lib/progress-types';
import { normalizeProgress } from '$lib/progress-types';

type ProgressRow = {
  last_essay_id: string;
  scroll_by_essay: string;
  read_essay_ids: string;
  highlights: string;
  updated_at: number;
  scroll_updated_at: number;
};

export function parseProgressRow(row: ProgressRow): ReadingProgress {
  return normalizeProgress({
    lastEssayId: row.last_essay_id,
    scrollByEssay: JSON.parse(row.scroll_by_essay) as Record<string, number>,
    readEssayIds: JSON.parse(row.read_essay_ids) as string[],
    highlights: JSON.parse(row.highlights ?? '[]') as ReadingProgress['highlights'],
    updatedAt: row.updated_at,
    scrollUpdatedAt: row.scroll_updated_at,
  });
}

export async function loadProgress(db: D1Database): Promise<ReadingProgress | null> {
  const row = await db.prepare(
    'SELECT last_essay_id, scroll_by_essay, read_essay_ids, highlights, updated_at, scroll_updated_at FROM progress WHERE id = 1',
  ).first<ProgressRow>();
  return row ? parseProgressRow(row) : null;
}

export async function saveProgress(db: D1Database, progress: ReadingProgress): Promise<ReadingProgress> {
  const existing = await loadProgress(db);
  const incoming = normalizeProgress(progress);
  const { progress: merged } = mergeProgress(existing, incoming);
  const store = merged ?? incoming;
  await db.prepare(
    `INSERT INTO progress (id, last_essay_id, scroll_by_essay, read_essay_ids, highlights, updated_at, scroll_updated_at)
     VALUES (1, ?, ?, ?, ?, ?, ?)
     ON CONFLICT(id) DO UPDATE SET
       last_essay_id = excluded.last_essay_id,
       scroll_by_essay = excluded.scroll_by_essay,
       read_essay_ids = excluded.read_essay_ids,
       highlights = excluded.highlights,
       updated_at = excluded.updated_at,
       scroll_updated_at = excluded.scroll_updated_at`,
  ).bind(
    store.lastEssayId,
    JSON.stringify(store.scrollByEssay),
    JSON.stringify(store.readEssayIds),
    JSON.stringify(store.highlights ?? []),
    store.updatedAt,
    store.scrollUpdatedAt,
  ).run();
  return (await loadProgress(db)) ?? store;
}

export function isReadingProgress(value: unknown): value is ReadingProgress {
  if (!value || typeof value !== 'object') return false;
  const p = value as Partial<ReadingProgress>;
  return typeof p.lastEssayId === 'string'
    && typeof p.scrollByEssay === 'object' && p.scrollByEssay !== null
    && Array.isArray(p.readEssayIds)
    && (p.highlights === undefined || Array.isArray(p.highlights))
    && typeof p.updatedAt === 'number';
}
