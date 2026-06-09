# The Sequences Reader

Personal offline PWA to read [The Sequences](https://www.readthesequences.com/) with book/chapter/essay progress and cross-device sync.

- **Docs:** [Architecture](docs/ARCHITECTURE.md) · [Deploy](docs/DEPLOY.md) · [TODO](docs/TODO.md)
- **Agent rules:** [AGENTS.md](AGENTS.md)

## Local dev

```bash
cd app && npm install && npm run dev   # default http://localhost:4321 (see terminal if taken)
```

Scraper (already run once; re-run only if needed):

```bash
cd scraper && python3 -m venv .venv && .venv/bin/pip install -r requirements.txt
.venv/bin/python scrape.py -o ../content
```

Tests: `cd app && npm test` · `cd scraper && .venv/bin/pytest`
