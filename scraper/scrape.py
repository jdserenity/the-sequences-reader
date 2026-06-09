#!/usr/bin/env python3
"""One-time scraper for readthesequences.com → content/"""
from __future__ import annotations
import argparse
from pathlib import Path
from rts.scrape import scrape_corpus

def main():
  p = argparse.ArgumentParser(description='Scrape The Sequences into content/')
  p.add_argument('-o', '--output', type=Path, default=Path(__file__).resolve().parent.parent / 'content')
  p.add_argument('--delay', type=float, default=1.0, help='Seconds between essay requests')
  args = p.parse_args()
  manifest = scrape_corpus(args.output, delay_s=args.delay)
  print(f"Wrote {len(manifest['essays'])} essays to {args.output.resolve()}")

if __name__ == '__main__':
  main()
