from __future__ import annotations
import time
from datetime import datetime, timezone
from pathlib import Path
import httpx
from rts.manifest import build_manifest, write_manifest
from rts.toc import parse_contents_html
from rts.urls import BASE, absolute, markdown_url

CONTENTS_PATH = '/Contents'
DEFAULT_DELAY_S = 1.0

def fetch_text(client: httpx.Client, url: str) -> str:
  r = client.get(url, follow_redirects=True, timeout=60.0)
  r.raise_for_status()
  return r.text

def scrape_corpus(out_dir: Path, *, delay_s: float = DEFAULT_DELAY_S) -> dict:
  out_dir = out_dir.resolve()
  essays_dir = out_dir / 'essays'
  essays_dir.mkdir(parents=True, exist_ok=True)
  scraped_at = datetime.now(timezone.utc).isoformat()
  with httpx.Client(headers={'User-Agent': 'sequences-reader-scraper/1.0 (personal offline reader)'}) as client:
    toc_html = fetch_text(client, absolute(CONTENTS_PATH))
    toc = parse_contents_html(toc_html)
    manifest = build_manifest(toc, scraped_at=scraped_at)
    preface_body = fetch_text(client, markdown_url('/'))
    (out_dir / 'essays' / 'preface.md').write_text(preface_body, encoding='utf-8')
    manifest['standalone'].insert(0, {'id': 'preface', 'title': 'Preface', 'slug': 'Preface', 'path': f'{BASE}/'})
    for entry in manifest['essays']: entry['order'] += 1
    manifest['essays'].insert(0, {
      'id': 'preface', 'title': 'Preface', 'slug': 'Preface',
      'source_url': f'{BASE}/', 'content_path': 'essays/preface.md', 'order': 0,
    })
    for entry in manifest['essays']:
      slug = entry['slug']
      md_url = markdown_url(f'/{slug}')
      entry['source_url'] = absolute(f'/{slug}')
      body = fetch_text(client, md_url)
      out_path = out_dir / entry['content_path']
      out_path.parent.mkdir(parents=True, exist_ok=True)
      out_path.write_text(body, encoding='utf-8')
      time.sleep(delay_s)
    write_manifest(out_dir / 'manifest.json', manifest)
  return manifest
