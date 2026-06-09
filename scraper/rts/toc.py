from __future__ import annotations
from bs4 import BeautifulSoup, Tag
from rts.slug import path_to_id, path_to_slug
from rts.urls import is_book_slug, is_sequence_slug

def _link_item(a: Tag) -> dict:
  href = a.get('href', '')
  slug = path_to_slug(href)
  return {'id': path_to_id(href), 'title': a.get_text(strip=True), 'slug': slug, 'path': href}

def _parse_essay_list(ol: Tag) -> list[dict]:
  out: list[dict] = []
  for li in ol.find_all('li', recursive=False):
    a = li.find('a', recursive=False)
    if a: out.append(_link_item(a))
  return out

def _parse_sequence_list(ol: Tag) -> list[dict]:
  sequences: list[dict] = []
  for li in ol.find_all('li', recursive=False):
    a = li.find('a', recursive=False)
    if not a: continue
    seq = _link_item(a)
    nested = li.find('ol', recursive=False)
    seq['essays'] = _parse_essay_list(nested) if nested else []
    sequences.append(seq)
  return sequences

def _parse_book_list(root: Tag) -> tuple[list[dict], list[dict]]:
  standalone: list[dict] = []
  books: list[dict] = []
  for li in root.find_all('li', recursive=False):
    a = li.find('a', recursive=False)
    if not a: continue
    slug = path_to_slug(a.get('href', ''))
    if is_book_slug(slug):
      book = _link_item(a)
      seq_ol = li.find('ol', recursive=False)
      book['sequences'] = _parse_sequence_list(seq_ol) if seq_ol else []
      books.append(book)
    elif not is_sequence_slug(slug):
      standalone.append(_link_item(a))
  return standalone, books

def parse_contents_html(html: str) -> dict:
  soup = BeautifulSoup(html, 'lxml')
  root = soup.select_one('#wikitext') or soup
  ul = root.find('ul')
  if not ul: return {'standalone': [], 'books': []}
  standalone, books = _parse_book_list(ul)
  return {'standalone': standalone, 'books': books}

def iter_essays(toc: dict):
  for item in toc.get('standalone', []):
    yield {'essay': item, 'book': None, 'sequence': None}
  for book in toc.get('books', []):
    for seq in book.get('sequences', []):
      for essay in seq.get('essays', []):
        yield {'essay': essay, 'book': book, 'sequence': seq}
