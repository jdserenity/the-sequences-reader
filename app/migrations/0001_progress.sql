CREATE TABLE IF NOT EXISTS progress (
  id INTEGER PRIMARY KEY CHECK (id = 1),
  last_essay_id TEXT NOT NULL,
  scroll_by_essay TEXT NOT NULL,
  read_essay_ids TEXT NOT NULL,
  updated_at INTEGER NOT NULL
);
