export const SPLASH_SEEN_KEY = 'sequences-splash-seen';

export function shouldPlaySplash(navigationType: string, hasSeenSplash: boolean): boolean {
  if (navigationType === 'reload') return true;
  if (navigationType === 'navigate' && !hasSeenSplash) return true;
  return false;
}

export function hasSeenSplash(storage: Pick<Storage, 'getItem'>): boolean {
  return storage.getItem(SPLASH_SEEN_KEY) === '1';
}

export function markSplashSeen(storage: Pick<Storage, 'setItem'>): void {
  storage.setItem(SPLASH_SEEN_KEY, '1');
}

export function getNavigationType(entries: { type: string }[]): string {
  return entries[0]?.type ?? 'navigate';
}
