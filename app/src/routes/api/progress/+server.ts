import { isReadingProgress, loadProgress, saveProgress } from '$lib/server/progress-db';
import type { ReadingProgress } from '$lib/progress-types';
import { json, type RequestHandler } from '@sveltejs/kit';

function dbUnavailable(): Response {
  return json({ error: 'progress database unavailable' }, { status: 503 });
}

export const GET: RequestHandler = async ({ platform }) => {
  const db = platform?.env?.DB;
  if (!db) return dbUnavailable();
  const progress = await loadProgress(db);
  return json(progress);
};

export const PUT: RequestHandler = async ({ platform, request }) => {
  const db = platform?.env?.DB;
  if (!db) return dbUnavailable();
  let body: unknown;
  try { body = await request.json(); }
  catch { return json({ error: 'invalid json' }, { status: 400 }); }
  if (!isReadingProgress(body)) return json({ error: 'invalid progress' }, { status: 400 });
  const saved = await saveProgress(db, body as ReadingProgress);
  return json(saved);
};
