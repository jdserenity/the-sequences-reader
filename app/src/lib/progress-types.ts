export type ReadingProgress = {
  lastEssayId: string;
  scrollByEssay: Record<string, number>;
  readEssayIds: string[];
  updatedAt: number;
};

export type ReadStats = { read: number; total: number; percent: number; wordsRead: number; wordsTotal: number };
