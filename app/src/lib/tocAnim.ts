export const TOC_FIRST_SPLIT_MS = 1100;
export const TOC_DETAIL_ENTER_MS = 720;
export const TOC_DETAIL_ENTER_SLOW_MS = 1150;
export const TOC_DETAIL_EXIT_MS = 920;
export const TOC_DETAIL_EXIT_MULTI_MS = 920;
export const TOC_VIGNETTE_OUT_MS = 760;

export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined' || !window.matchMedia) return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export function delay(ms: number): Promise<void> {
  if (ms <= 0 || prefersReducedMotion()) return Promise.resolve();
  return new Promise((resolve) => { setTimeout(resolve, ms); });
}
