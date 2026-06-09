import { describe, expect, it } from 'vitest';
import {
  MAX_DETAIL_TILES_DESKTOP,
  canOpenSection,
  isAtSectionLimit,
  tileCount,
  toggleOpenSection,
} from './tocTiles';

const book = (n: string) => `book:${n}` as const;

describe('toggleOpenSection', () => {
  it('opens a section on desktop', () => {
    expect(toggleOpenSection([], book('a'), false)).toEqual([book('a')]);
  });

  it('closes an open section when toggled again', () => {
    expect(toggleOpenSection([book('a')], book('a'), false)).toEqual([]);
  });

  it('keeps only one detail tile on mobile', () => {
    expect(toggleOpenSection([book('a')], book('b'), true)).toEqual([book('b')]);
  });

  it('blocks a fourth desktop section until one is closed', () => {
    const open = [book('a'), book('b'), book('c')] as const;
    expect(toggleOpenSection([...open], book('d'), false)).toEqual([...open]);
    expect(canOpenSection([...open], book('d'), false)).toBe(false);
    expect(isAtSectionLimit([...open], false)).toBe(true);
  });

  it('allows a new section after closing one at the cap', () => {
    const open = [book('a'), book('b'), book('c')] as const;
    const afterClose = toggleOpenSection([...open], book('b'), false);
    expect(toggleOpenSection(afterClose, book('d'), false)).toEqual([book('a'), book('c'), book('d')]);
  });

  it('reports tile count including toc', () => {
    expect(tileCount([book('a')])).toBe(2);
    expect(MAX_DETAIL_TILES_DESKTOP).toBe(3);
  });
});
