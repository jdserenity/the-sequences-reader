import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { app, showToc, tocUi, trackOffset } from './app.svelte';

describe('app', () => {
  beforeEach(() => {
    app.panel = 'read';
    app.essayId = 'essay-1';
    tocUi.collapseRequest = 0;
  });

  afterEach(() => {
    tocUi.collapseRequest = 0;
  });

  it('offsets track horizontally per panel', () => {
    expect(trackOffset('read')).toBe('0%');
    expect(trackOffset('toc')).toBe('-50%');
  });

  it('requests toc tile collapse when toc nav clicked while on toc', () => {
    app.panel = 'toc';
    showToc();
    expect(tocUi.collapseRequest).toBe(1);
    expect(app.panel).toBe('toc');
  });

  it('switches to toc from read panel', () => {
    showToc();
    expect(app.panel).toBe('toc');
    expect(tocUi.collapseRequest).toBe(0);
  });
});
