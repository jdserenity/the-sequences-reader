#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const jsonPath = path.join(__dirname, 'seed-through-doublethink.json');
const sqlPath = path.join(__dirname, 'seed-through-doublethink.sql');
const payload = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
payload.updatedAt = Date.now();
const scroll = JSON.stringify(payload.scrollByEssay).replace(/'/g, "''");
const reads = JSON.stringify(payload.readEssayIds).replace(/'/g, "''");
const sql = `INSERT INTO progress (id, last_essay_id, scroll_by_essay, read_essay_ids, updated_at)
VALUES (1, '${payload.lastEssayId}', '${scroll}', '${reads}', ${payload.updatedAt})
ON CONFLICT(id) DO UPDATE SET
  last_essay_id = excluded.last_essay_id,
  scroll_by_essay = excluded.scroll_by_essay,
  read_essay_ids = excluded.read_essay_ids,
  updated_at = excluded.updated_at;
`;
fs.writeFileSync(sqlPath, sql);
console.log(`wrote ${sqlPath} (${payload.readEssayIds.length} essays)`);
