# Deploy

Cloudflare Pages + D1 for progress sync. Essay content is static in the repo build.

## One-time setup

```bash
cd app
npm install
npx wrangler d1 create sequences-reader-progress   # skip if already created
```

Copy the `database_id` from the command output into `app/wrangler.toml` (`[[d1_databases]]` → `database_id`). Current production DB: `daaac45f-3986-42e0-8c90-e428d9f2442d`.

Apply schema to the remote database:

```bash
npm run d1:migrate:remote
```

## Pages project

1. Connect the GitHub repo to Cloudflare Pages.
2. Build command: `cd app && npm install && npm run build`
3. Build output directory: `app/.svelte-kit/cloudflare`
4. Bind D1: Pages project → Settings → Functions → D1 bindings → variable name **`DB`**, database **`sequences-reader-progress`**.

`wrangler.toml` in `app/` is also used when deploying with `wrangler pages deploy`.

**If `PUT /api/progress` returns 404:** the live deployment does not include `app/src/routes/api/progress` yet — commit and push the sync code, or run `npm run build && npx wrangler pages deploy .svelte-kit/cloudflare --project-name=the-sequences-reader` from `app/`.

**If it returns 503:** the worker is up but the D1 binding `DB` is missing in Pages settings.

## Local dev with D1

Plain `npm run dev` serves the UI but `/api/progress` returns 503 (no D1). For sync locally:

```bash
cd app
npm run build
npx wrangler pages dev .svelte-kit/cloudflare
npx wrangler d1 migrations apply sequences-reader-progress --local
```

## Verify sync

1. Mark an essay read on device A; wait ~1s for debounced PUT.
2. Open device B; TOC should show the same read state after load.
3. `cd app && npx wrangler d1 execute sequences-reader-progress --remote --command "SELECT updated_at, last_essay_id FROM progress WHERE id = 1"`

## Seed owner read-through (Doublethink)

Prefer API after deploy:

```bash
cd app && npm run seed:push
```

If `/api/progress` is not live yet, write D1 directly:

```bash
cd app && npm run seed:d1
```
