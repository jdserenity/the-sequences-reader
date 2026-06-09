export function scrollOffsetForTarget(scrollEl: HTMLElement, target: Element, offset = 12): number {
  return Math.max(0, scrollEl.scrollTop + target.getBoundingClientRect().top - scrollEl.getBoundingClientRect().top - offset);
}

function prefersReducedMotion(): boolean {
  return typeof matchMedia !== 'undefined' && matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/** Manual scroll animation — reliable inside overflow panels where scrollTo(smooth) often fails. */
export function animateScrollTo(scrollEl: HTMLElement, to: number, duration = 480): void {
  const from = scrollEl.scrollTop;
  const delta = to - from;
  if (Math.abs(delta) < 1) return;
  if (prefersReducedMotion()) { scrollEl.scrollTop = to; return; }
  const t0 = performance.now();
  const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
  const tick = (now: number) => {
    const p = Math.min(1, (now - t0) / duration);
    scrollEl.scrollTop = from + delta * ease(p);
    if (p < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}

/** Wait until target position stops shifting (e.g. after <details> opens). */
export function scrollWhenStable(scrollEl: HTMLElement, target: Element, offset = 12, maxFrames = 20): void {
  let lastTop = NaN;
  let stable = 0;
  let frames = 0;
  const step = () => {
    const top = target.getBoundingClientRect().top;
    if (!Number.isNaN(lastTop) && Math.abs(top - lastTop) < 0.5) stable++;
    else stable = 0;
    lastTop = top;
    frames++;
    if (stable >= 3 || frames >= maxFrames) animateScrollTo(scrollEl, scrollOffsetForTarget(scrollEl, target, offset));
    else requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}
