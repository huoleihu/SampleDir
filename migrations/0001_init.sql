-- SampleDir 官网留言板 · D1 表结构
-- 执行：npx wrangler d1 execute sampledir_messages --remote --file=migrations/0001_init.sql

CREATE TABLE IF NOT EXISTS messages (
  id         INTEGER PRIMARY KEY AUTOINCREMENT,
  name       TEXT    NOT NULL DEFAULT '',
  email      TEXT    NOT NULL DEFAULT '',
  content    TEXT    NOT NULL,
  lang       TEXT    NOT NULL DEFAULT 'zh',
  status     TEXT    NOT NULL DEFAULT 'pending',  -- pending / approved
  ip_hash    TEXT    NOT NULL DEFAULT '',          -- SHA-256(ip)，用于频率限制，不存明文 IP
  created_at INTEGER NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_messages_status_created
  ON messages(status, created_at DESC);
