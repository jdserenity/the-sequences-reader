/** scrollTop that vertically centers target inside container (viewport coords). */
export function scrollTopToCenterTarget(
  scrollTop: number,
  containerTop: number,
  containerHeight: number,
  targetTop: number,
  targetHeight: number,
): number {
  const targetCenter = targetTop + targetHeight / 2;
  const containerCenter = containerTop + containerHeight / 2;
  return Math.max(0, scrollTop + (targetCenter - containerCenter));
}

export function scrollTopToCenterElement(scrollEl: HTMLElement, targetEl: HTMLElement): number {
  const scrollRect = scrollEl.getBoundingClientRect();
  const targetRect = targetEl.getBoundingClientRect();
  return scrollTopToCenterTarget(scrollEl.scrollTop, scrollRect.top, scrollRect.height, targetRect.top, targetRect.height);
}

export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined' || !window.matchMedia) return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export function animateScrollTop(scrollEl: HTMLElement, top: number, duration = 480): Promise<void> {
  if (prefersReducedMotion() || duration <= 0) {
    scrollEl.scrollTop = top;
    return Promise.resolve();
  }
  const start = scrollEl.scrollTop;
  const delta = top - start;
  if (Math.abs(delta) < 1) {
    scrollEl.scrollTop = top;
    return Promise.resolve();
  }
  return new Promise((resolve) => {
    const t0 = performance.now();
    const step = (now: number) => {
      const t = Math.min(1, (now - t0) / duration);
      const ease = 1 - Math.pow(1 - t, 3);
      scrollEl.scrollTop = start + delta * ease;
      if (t < 1) requestAnimationFrame(step);
      else resolve();
    };
    requestAnimationFrame(step);
  });
}

export async function scrollSectionIntoView(scrollEl: HTMLElement, targetEl: HTMLElement): Promise<void> {
  const top = scrollTopToCenterElement(scrollEl, targetEl);
  await animateScrollTop(scrollEl, top);
}
