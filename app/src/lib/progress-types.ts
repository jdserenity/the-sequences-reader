export type EssayHighlight = {
  id: string;
  essayId: string;
  start: number;
  end: number;
  text: string;
  color: 'yellow';
  createdAt: number;
};

export type ReadingProgress = {
  lastEssayId: string;
  scrollByEssay: Record<string, number>;
  readEssayIds: string[];
  highlights: EssayHighlight[];
  /** Bumped when readEssayIds change. */
  updatedAt: number;
  /** Bumped on scroll/resume changes only. */
  scrollUpdatedAt: number;
};

export type ReadStats = { read: number; total: number; percent: number; wordsRead: number; wordsTotal: number };

export function normalizeProgress(p: ReadingProgress): ReadingProgress {
  const scrollUpdatedAt = p.scrollUpdatedAt ?? p.updatedAt;
  return { ...p, highlights: p.highlights ?? [], scrollUpdatedAt };
}
