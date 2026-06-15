export type ReadingProgress = {
  lastEssayId: string;
  scrollByEssay: Record<string, number>;
  readEssayIds: string[];
  /** Bumped when readEssayIds change. */
  updatedAt: number;
  /** Bumped on scroll/resume changes only. */
  scrollUpdatedAt: number;
};

export type ReadStats = { read: number; total: number; percent: number; wordsRead: number; wordsTotal: number };

export function normalizeProgress(p: ReadingProgress): ReadingProgress {
  const scrollUpdatedAt = p.scrollUpdatedAt ?? p.updatedAt;
  return { ...p, scrollUpdatedAt };
}
