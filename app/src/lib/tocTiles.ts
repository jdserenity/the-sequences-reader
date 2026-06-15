import type { TocSectionKey } from './tocSections';

export const MAX_DETAIL_TILES_DESKTOP = 3;

export function isAtSectionLimit(open: TocSectionKey[], mobile: boolean): boolean {
  return !mobile && open.length >= MAX_DETAIL_TILES_DESKTOP;
}

export function canOpenSection(open: TocSectionKey[], key: TocSectionKey, mobile: boolean): boolean {
  if (open.includes(key)) return true;
  if (mobile) return true;
  return open.length < MAX_DETAIL_TILES_DESKTOP;
}

/** Toggle a section tile; mobile keeps at most one detail pane. Desktop blocks new opens at the cap. */
export function toggleOpenSection(open: TocSectionKey[], key: TocSectionKey, mobile: boolean): TocSectionKey[] {
  if (open.includes(key)) return open.filter((k) => k !== key);
  if (mobile) return [key];
  if (open.length >= MAX_DETAIL_TILES_DESKTOP) return open;
  return [...open, key];
}

export function tileCount(open: TocSectionKey[]): number { return 1 + open.length; }

export function hasOpenTocTiles(openSections: TocSectionKey[], exitingKeys: TocSectionKey[]): boolean {
  return openSections.length >= 1 || exitingKeys.length >= 1;
}
