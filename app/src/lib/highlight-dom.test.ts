// @vitest-environment happy-dom
import { describe, expect, it } from 'vitest';
import { applyHighlightMarks, getRangeFromSelection, getOffsetInRoot, getSelectionAnchor } from './highlight-dom';

describe('highlight-dom', () => {
  it('maps selection to text offsets', () => {
    const root = document.createElement('article');
    root.innerHTML = '<p>Hello world</p>';
    const text = root.querySelector('p')!.firstChild!;
    const range = document.createRange();
    range.setStart(text, 0);
    range.setEnd(text, 5);
    const sel = window.getSelection()!;
    sel.removeAllRanges();
    sel.addRange(range);
    expect(getRangeFromSelection(root)).toEqual({ start: 0, end: 5, text: 'Hello' });
    sel.removeAllRanges();
  });

  it('wraps a text range in mark elements', () => {
    const root = document.createElement('article');
    root.innerHTML = '<p>Hello world</p>';
    applyHighlightMarks(root, [{ id: 'h1', start: 6, end: 11 }]);
    expect(root.querySelector('mark.highlight')?.textContent).toBe('world');
    expect(root.querySelector('mark.highlight')?.dataset.highlightId).toBe('h1');
  });

  it('computes offsets for nested text nodes', () => {
    const root = document.createElement('article');
    root.innerHTML = '<p>ab<strong>cd</strong>ef</p>';
    const strongText = root.querySelector('strong')!.firstChild!;
    expect(getOffsetInRoot(root, strongText, 1)).toBe(3);
  });

  it('applies a saved range after prose html is reset', () => {
    const root = document.createElement('article');
    root.innerHTML = '<p>Hello world</p><p>Second paragraph</p>';
    const range = document.createRange();
    const text = root.querySelector('p')!.firstChild!;
    range.setStart(text, 0);
    range.setEnd(text, 5);
    const sel = window.getSelection()!;
    sel.removeAllRanges();
    sel.addRange(range);
    const saved = getRangeFromSelection(root);
    expect(saved).toEqual({ start: 0, end: 5, text: 'Hello' });
    root.innerHTML = '<p>Hello world</p><p>Second paragraph</p>';
    applyHighlightMarks(root, [{ id: 'h1', start: saved!.start, end: saved!.end }]);
    expect(root.querySelector('mark.highlight')?.textContent).toBe('Hello');
    sel.removeAllRanges();
  });

  it('returns anchor position for a non-collapsed selection', () => {
    const root = document.createElement('article');
    root.innerHTML = '<p>Hello world</p>';
    const text = root.querySelector('p')!.firstChild!;
    const range = document.createRange();
    range.setStart(text, 0);
    range.setEnd(text, 5);
    range.getBoundingClientRect = () => ({ top: 10, left: 20, width: 40, height: 16, right: 60, bottom: 26, x: 20, y: 10, toJSON: () => ({}) });
    const sel = window.getSelection()!;
    sel.removeAllRanges();
    sel.addRange(range);
    expect(getSelectionAnchor(root)).toEqual({ top: 10, left: 40 });
    sel.removeAllRanges();
  });
});
