# Architecture

## Product

Personal offline reader for [The Sequences](https://www.readthesequences.com/). Single user only (owner); not designed for other people.

- PWA on iPhone; normal website on laptop.
- Entire corpus available offline after initial load (target cache budget ~100MB acceptable).
- Progress syncs across devices (last-write-wins).
- Single-route SPA at `/`: reader and table of contents are two panels on one page; horizontal slide between them (swipe left/right or bottom nav icons). TOC is tiled: intro essay and bibliography/glossary are direct links; only books open oval “pebble” detail tiles beside the TOC. Solo TOC is full-height without vignette; with two or more pebbles, tiles are shorter and radially masked. Desktop: up to three detail pebbles (four tiles total); opening a fourth is blocked until one closes; the pebble group stays horizontally centered. Hidden scrollbars; fade/slide-in for new tiles. Mobile stacks pebbles vertically (one detail at a time).
- Opens last-read essay at saved scroll position (local-first; first visit starts at corpus order).
- Startup splash: fullscreen ink-in-water canvas animation (~2.6s, no text); plays on first visit and hard refresh only (`localStorage` + `navigation.type === 'reload'`).
- UX details (theme, animations, typography) otherwise decided during build.

## Content

- Scrape readthesequences.com **once**; site is not expected to update.
- Store essays as static assets in-repo (Markdown or HTML) produced by the scraper.
- Preserve original essay URLs as metadata.
- TOC structure (books → chapters → essays) matches the source site.
- Scraper downloads each essay from PmWiki `?action=markdown` and writes the response **verbatim** (no scrape-time transform).
- readthesequences.com is a PmWiki site. Its markdown export encodes footnotes as reference links (`#footnoteN`, `#citationN`, `↩`) that can be out of document order and occasionally pair the wrong block text with a number; verified on live export (e.g. *Biases: An Introduction*, footnote 14). The reader normalizes footnotes for display (anchors, numeric sort, collapsible section, in-panel scroll) but cannot fix missing or mismatched pairings already present in the export. PmWiki site-nav footers (Top/Book/Sequence/prev-next links) are stripped at display time.

## Progress model

Tracked at all three levels simultaneously:

- Per essay
- Per chapter
- Per book

Also per essay: **resume position** (scroll / reading position inside the essay).

Read/completion state (`readEssayIds`) lives in D1 only; the client keeps an in-memory cache loaded on startup via `GET /api/progress`. Bibliography and glossary are reference-only: listed at end of TOC in a distinct color, excluded from essay/word totals and completion. TOC header: primary title “The Sequences”, secondary “Table of Contents”; stats line shows essays read, percent of countable total, and words read out of corpus word count (countable essays only; per-essay counts from cleaned markdown bodies at app load). Read essay links and fully completed book titles on the TOC are tinted light green.

D1 (`sequences-reader-progress`) holds a single progress row (`id = 1`) including scroll/resume fields and highlights. `GET/PUT /api/progress` on the Pages worker. Client loads D1 into memory on init (UI mounts only after first sync); edits update memory and debounce to D1 (~500ms). PUT always re-fetches and merges with D1 first so scroll-only writes cannot clobber `readEssayIds`. **Merge rules:** `readEssayIds` and highlights union both sides; scroll/resume fields last-write-wins on `scrollUpdatedAt`. Server PUT also merges before save. Without a D1 binding (plain `vite dev`), progress stays empty in memory until a remote is reachable. Highlights: yellow text ranges per essay (`essayId`, character offsets in rendered prose, `text`, `color: yellow`); selecting text shows a Highlight action (not automatic); no highlights list UI yet. PmWiki site-nav footers are stripped at display time; the lone next-essay readthesequences.com link at the bottom is removed without dropping footnotes.

## Stack

| Layer | Choice |
|--------|--------|
| Host | Cloudflare Pages |
| Database | Cloudflare D1 (progress only; not essay text) |
| App | SvelteKit + `@sveltejs/adapter-cloudflare` |
| Offline | Service worker / Vite PWA — cache full prerendered corpus |
| Scraper | One-off Python script in repo; not part of runtime app |
| Tests | Vitest (unit); Playwright sparingly when flows stabilize |

No multi-user auth. No separate API service. Progress writes use minimal SvelteKit server routes on the same Pages deployment so the browser can reach D1 (single implicit user; no login).

## Build order

1. Scraper → normalized content + TOC manifest
2. Minimal reader (TOC page + essay view + next/prev)
3. Progress (local first, then D1 sync)
4. PWA offline + progress UI polish (bars, completion animations)

## Repository layout

- `docs/` — architecture, deploy, todo
- `scraper/` — one-time fetch + parse (`scraper/scrape.py` → `content/`)
- `content/` — `manifest.json` + `essays/*.md` (generated; committed)
- `app/` — SvelteKit reader (Cloudflare Pages adapter)
