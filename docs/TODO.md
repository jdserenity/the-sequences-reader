# TODO

## Open

- [ ] Footnote fidelity: if reading shows widespread mismatches, spike re-scraping **rendered HTML** (not `?action=markdown`) on one essay and compare; only re-run full corpus if clearly better
- [ ] UX polish during build: theme (light/dark/system), completion animations, typography, iOS install hints — owner decides while implementing
- [ ] PWA: service worker caches **entire** prerendered corpus for offline read on iPhone
- [ ] Progress UI: per-book, per-chapter, per-essay bars; completion feedback on essay/chapter finish
- [ ] Progress (local first): mark/read state at essay, chapter, and book levels; resume position inside each essay

## Done

- [x] D1 sync: resume position + completion flags; **last-write-wins** across laptop and phone; `GET/PUT /api/progress` — Composer, 2026-06-14
- [x] Document deploy steps in `docs/DEPLOY.md` when first Pages + D1 binding exists — Composer, 2026-06-14

- [x] Reader: essay view with next/prev; **TOC as separate page**; navigation matches source site order — Composer, 2026-05-30
- [x] Scrape readthesequences.com **once** → static content + TOC manifest; keep `source_url` per essay — Composer, 2026-05-30 (336 essays)
- [x] Scaffold SvelteKit app on Cloudflare Pages adapter; Vitest wired — Composer, 2026-05-30

