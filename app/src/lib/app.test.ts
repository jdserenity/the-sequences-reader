import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { app, showRead, showToc, trackOffset } from './app.svelte';

describe('app', () => {
  beforeEach(() => {
    app.panel = 'read';
    app.essayId = 'essay-1';
  });

  it('offsets track horizontally per panel', () => {
    expect(trackOffset('read')).toBe('0%');
    expect(trackOffset('toc')).toBe('-50%');
  });

  it('switches panel and essay', () => {
    showToc();
    expect(app.panel).toBe('toc');
    showRead('essay-9');
    expect(app.panel).toBe('read');
    expect(app.essayId).toBe('essay-9');
  });
});
