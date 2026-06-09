from __future__ import annotations
import json
from pathlib import Path
from rts.toc import iter_essays

def build_manifest(toc: dict, *, scraped_at: str) -> dict:
  essays: list[dict] = []
  order = 0
  for row in iter_essays(toc):
    e = row['essay']
    entry = {
      'id': e['id'],
      'title': e['title'],
      'slug': e['slug'],
      'source_url': None,  # filled by scrape
      'content_path': f"essays/{e['id']}.md",
      'order': order,
    }
    if row['book']:
      entry['book_id'] = row['book']['id']
      entry['book_title'] = row['book']['title']
    if row['sequence']:
      entry['sequence_id'] = row['sequence']['id']
      entry['sequence_title'] = row['sequence']['title']
    essays.append(entry)
    order += 1
  return {
    'version': 1,
    'scraped_at': scraped_at,
    'source': 'https://www.readthesequences.com',
    'standalone': toc.get('standalone', []),
    'books': toc.get('books', []),
    'essays': essays,
  }

def write_manifest(path: Path, manifest: dict) -> None:
  path.parent.mkdir(parents=True, exist_ok=True)
  path.write_text(json.dumps(manifest, indent=2, ensure_ascii=False) + '\n', encoding='utf-8')
