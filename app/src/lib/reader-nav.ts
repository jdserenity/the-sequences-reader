import { getEssay, getNeighbors } from '$lib/corpus';
import { animateScrollTo, scrollOffsetForTarget, scrollWhenStable } from '$lib/scroll-anim';
import type { EssayEntry } from '$lib/types';

export type EssayReaderMeta = {
  title: string;
  bookTitle?: string;
  sourceUrl: string;
  prevId?: string;
  prevTitle?: string;
  nextId?: string;
  nextTitle?: string;
};

export function getEssayReaderMeta(essayId: string): EssayReaderMeta | undefined {
  const essay = getEssay(essayId);
  if (!essay) return undefined;
  const { prev, next } = getNeighbors(essayId);
  return essayReaderMetaFromEntry(essay, prev, next);
}

export function essayReaderMetaFromEntry(essay: EssayEntry, prev?: EssayEntry, next?: EssayEntry): EssayReaderMeta {
  return {
    title: essay.title, bookTitle: essay.book_title, sourceUrl: essay.source_url,
    prevId: prev?.id, prevTitle: prev?.title, nextId: next?.id, nextTitle: next?.title,
  };
}

export function isFootnoteHash(hash: string): boolean {
  return /^#(?:footnote|citation)\d+$/.test(hash);
}

export function openFootnotesSection(scrollEl: HTMLElement | undefined): void {
  scrollEl?.querySelector<HTMLDetailsElement>('.footnotes-collapse')?.setAttribute('open', '');
}

export function smoothScrollToElement(scrollEl: HTMLElement, target: Element, offset = 12): void {
  animateScrollTo(scrollEl, scrollOffsetForTarget(scrollEl, target, offset));
}

export function scrollToHashInPanel(scrollEl: HTMLElement | undefined, hash: string): void {
  if (!scrollEl || !hash.startsWith('#')) return;
  const target = scrollEl.querySelector(hash);
  if (!target) return;
  const details = scrollEl.querySelector<HTMLDetailsElement>('.footnotes-collapse');
  if (isFootnoteHash(hash) && details && !details.open) {
    details.setAttribute('open', '');
    scrollWhenStable(scrollEl, target);
    return;
  }
  smoothScrollToElement(scrollEl, target);
}
