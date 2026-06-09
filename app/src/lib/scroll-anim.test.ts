import { describe, expect, it, vi } from 'vitest';
import { animateScrollTo, scrollOffsetForTarget, scrollWhenStable } from './scroll-anim';

describe('scrollOffsetForTarget', () => {
  it('computes scroll position relative to scroll container', () => {
    const scrollEl = { scrollTop: 100, getBoundingClientRect: () => ({ top: 50 }) } as unknown as HTMLElement;
    const target = { getBoundingClientRect: () => ({ top: 200 }) };
    expect(scrollOffsetForTarget(scrollEl, target as unknown as Element)).toBe(238);
  });
});

describe('animateScrollTo', () => {
  it('jumps instantly when reduced motion is preferred', () => {
    vi.stubGlobal('matchMedia', () => ({ matches: true }));
    const scrollEl = { scrollTop: 0 } as HTMLElement;
    animateScrollTo(scrollEl, 120);
    expect(scrollEl.scrollTop).toBe(120);
  });

  it('animates scrollTop over frames', () => {
    vi.stubGlobal('matchMedia', () => ({ matches: false }));
    let now = 0;
    vi.stubGlobal('performance', { now: () => now });
    const frames: FrameRequestCallback[] = [];
    vi.stubGlobal('requestAnimationFrame', (cb: FrameRequestCallback) => { frames.push(cb); return frames.length; });
    const scrollEl = { scrollTop: 0 } as HTMLElement;
    animateScrollTo(scrollEl, 100, 100);
    expect(frames.length).toBe(1);
    now = 50;
    frames[0](now);
    expect(scrollEl.scrollTop).toBeGreaterThan(0);
    expect(scrollEl.scrollTop).toBeLessThan(100);
    now = 100;
    frames[0](now);
    expect(scrollEl.scrollTop).toBe(100);
  });
});

describe('scrollWhenStable', () => {
  it('scrolls after target position stabilizes', () => {
    vi.stubGlobal('matchMedia', () => ({ matches: true }));
    let top = 500;
    const target = { getBoundingClientRect: () => ({ top }) };
    const scrollEl = { scrollTop: 0, getBoundingClientRect: () => ({ top: 0 }) } as unknown as HTMLElement;
    const frames: FrameRequestCallback[] = [];
    vi.stubGlobal('requestAnimationFrame', (cb: FrameRequestCallback) => { frames.push(cb); return frames.length; });
    scrollWhenStable(scrollEl, target as unknown as Element);
    top = 200;
    frames[0](0); frames[1](0); frames[2](0); frames[3](0);
    expect(scrollEl.scrollTop).toBe(188);
  });
});
