import { corpus } from '$lib/corpus';
import { getLastEssayId, seedDemoReadsIfEmpty } from '$lib/progress';

export type Panel = 'read' | 'toc';

function firstEssayId(): string {
  return [...corpus.essays].sort((a, b) => a.order - b.order)[0]?.id ?? '';
}

export const app = $state({ panel: 'read' as Panel, essayId: firstEssayId() });

export function initApp(): void {
  seedDemoReadsIfEmpty();
  app.essayId = getLastEssayId() ?? firstEssayId();
}

export function showRead(essayId?: string): void {
  if (essayId) app.essayId = essayId;
  app.panel = 'read';
}

export function showToc(): void {
  app.panel = 'toc';
}

export function trackOffset(panel: Panel): string {
  return panel === 'read' ? '0%' : '-50%';
}
