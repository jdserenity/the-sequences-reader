import { afterEach, describe, expect, it, vi } from 'vitest';
import {
  delay,
  TOC_DETAIL_ENTER_SLOW_MS,
  TOC_DETAIL_EXIT_MS,
  TOC_DETAIL_EXIT_MULTI_MS,
  TOC_FIRST_SPLIT_MS,
} from './tocAnim';

describe('tocAnim', () => {
  afterEach(() => { vi.useRealTimers(); });

  it('waits the requested duration', async () => {
    vi.useFakeTimers();
    const p = delay(100);
    vi.advanceTimersByTime(100);
    await p;
    expect(true).toBe(true);
  });

  it('uses slower enter when multiple sections are open', () => {
    expect(TOC_DETAIL_ENTER_SLOW_MS).toBeGreaterThan(TOC_DETAIL_EXIT_MS);
    expect(TOC_FIRST_SPLIT_MS).toBeGreaterThanOrEqual(1000);
    expect(TOC_DETAIL_EXIT_MULTI_MS).toBe(TOC_DETAIL_EXIT_MS);
  });
});
