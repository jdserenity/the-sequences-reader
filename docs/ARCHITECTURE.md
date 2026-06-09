# Architecture

## Product

Personal offline reader for [The Sequences](https://www.readthesequences.com/). Single user only (owner); not designed for other people.

- PWA on iPhone; normal website on laptop.
- Entire corpus available offline after initial load (target cache budget ~100MB acceptable).
- Progress syncs across devices (last-write-wins).
- Single-route SPA at `/`: reader and table of contents are two panels on one page; horizontal slide between them (swipe left/right or bottom nav icons). TOC structure mirrors readthesequences.com.
- Opens last-read essay at saved scroll position (local-first; first visit starts at corpus order).
- UX details (theme, animations, typography) decided during build.

## Content

- Scrape readthesequences.com **once**; site is not expected to update.
- Store essays as static assets in-repo (Markdown or HTML) produced by the scraper.
- Preserve original essay URLs as metadata.
- TOC structure (books → chapters → essays) matches the source site.

## Progress model

Tracked at all three levels simultaneously:

- Per essay
- Per chapter
- Per book

Also per essay: **resume position** (scroll / reading position inside the essay).

Conflict resolution: **last-write-wins** when syncing across devices.

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
