#!/usr/bin/env node
/** One-shot: PUT seed-through-doublethink.json to /api/progress */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const base = process.argv[2] ?? 'https://the-sequences-reader.pages.dev';
const file = path.join(__dirname, 'seed-through-doublethink.json');
const payload = JSON.parse(fs.readFileSync(file, 'utf8'));
payload.updatedAt = Date.now();

const res = await fetch(`${base.replace(/\/$/, '')}/api/progress`, {
  method: 'PUT',
  headers: { 'content-type': 'application/json' },
  body: JSON.stringify(payload),
});
const body = await res.text();
if (!res.ok) {
  console.error(`PUT failed (${res.status}):`, body.slice(0, 200));
  if (res.status === 404) {
    console.error('\n/api/progress is missing on that host — deploy the API routes first, or seed D1 directly: npm run seed:d1');
  }
  process.exit(1);
}
const saved = JSON.parse(body);
console.log(`OK — ${saved.readEssayIds.length} essays read, last: ${saved.lastEssayId}`);
