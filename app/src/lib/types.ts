export type TocItem = { id: string; title: string; slug: string; path: string };

export type EssayRef = TocItem;

export type Sequence = TocItem & { essays: EssayRef[] };

export type Book = TocItem & { sequences: Sequence[] };

export type EssayEntry = {
  id: string;
  title: string;
  slug: string;
  source_url: string;
  content_path: string;
  order: number;
  book_id?: string;
  book_title?: string;
  sequence_id?: string;
  sequence_title?: string;
};

export type Manifest = {
  version: number;
  scraped_at: string;
  source: string;
  standalone: TocItem[];
  books: Book[];
  essays: EssayEntry[];
};
