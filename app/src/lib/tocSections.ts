import { corpus } from './corpus';
import type { Book } from './types';

export type TocSectionKey = `book:${string}`;

export type TocBookSection = {
  key: TocSectionKey;
  title: string;
};

export function bookSectionKey(bookId: string): TocSectionKey { return `book:${bookId}`; }

export function parseSectionKey(key: TocSectionKey): { bookId: string } {
  if (!key.startsWith('book:')) throw new Error(`invalid toc section key: ${key}`);
  return { bookId: key.slice(5) };
}

export function buildTocBookSections(): TocBookSection[] {
  return corpus.books.map((book) => ({ key: bookSectionKey(book.id), title: book.title }));
}

export const tocBookSections = buildTocBookSections();

export function getBookForSection(key: TocSectionKey): Book | undefined {
  const { bookId } = parseSectionKey(key);
  return corpus.books.find((b) => b.id === bookId);
}
