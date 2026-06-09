import { TOC_DETAIL_ENTER_MS, TOC_DETAIL_EXIT_MS } from './tocAnim';

/** Ease-out curve for TOC tile enter/exit. */
export function tocEaseOut(t: number): number {
  return 1 - Math.pow(1 - t, 4);
}

export const TOC_TILE_IN_MS = TOC_DETAIL_ENTER_MS;
export const TOC_TILE_OUT_MS = TOC_DETAIL_EXIT_MS;
