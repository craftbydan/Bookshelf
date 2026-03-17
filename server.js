const express  = require('express');
const fs        = require('fs');
const path      = require('path');
const { execSync } = require('child_process');

const app       = express();
const PORT      = 3001;
const DIR       = __dirname;
const BOOKS_PATH = path.join(DIR, 'books.json');
const REPO_URL  = 'https://github.com/craftbydan/Bookshelf.git';

app.use(express.json({ limit: '2mb' }));
app.use(express.static(DIR));

/* ── Root ───────────────────────────────────────────────── */
app.get('/', (_req, res) => res.sendFile(path.join(DIR, 'index.html')));

/* ── Admin page ─────────────────────────────────────────── */
app.get('/admin', (_req, res) => res.sendFile(path.join(DIR, 'admin.html')));

/* ── GET /api/books ─────────────────────────────────────── */
app.get('/api/books', (_req, res) => {
  try {
    res.json(JSON.parse(fs.readFileSync(BOOKS_PATH, 'utf8')));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ── POST /api/books — save books.json ───────────────────── */
app.post('/api/books', (req, res) => {
  try {
    const books = req.body;
    if (!Array.isArray(books)) return res.status(400).json({ error: 'Expected an array' });
    fs.writeFileSync(BOOKS_PATH, JSON.stringify(books, null, 2));
    res.json({ ok: true, count: books.length });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ── POST /api/push — commit + push to GitHub ────────────── */
app.post('/api/push', (_req, res) => {
  try {
    const run = (cmd) => execSync(cmd, { cwd: DIR, encoding: 'utf8' }).trim();

    // Init repo if needed
    if (!fs.existsSync(path.join(DIR, '.git'))) {
      run('git init');
      run('git branch -M main');
    }

    // Ensure remote points to the right place
    try {
      run('git remote get-url origin');
    } catch {
      run(`git remote add origin ${REPO_URL}`);
    }

    run('git add -A');

    // Commit (no-op if nothing changed)
    try {
      run('git commit -m "Update library"');
    } catch (e) {
      if (!e.message.includes('nothing to commit')) throw e;
      return res.json({ ok: true, message: 'Nothing new to push.' });
    }

    run('git push -u origin main');
    res.json({ ok: true, message: 'Pushed to GitHub successfully.' });
  } catch (err) {
    res.status(500).json({ error: err.stderr || err.message });
  }
});

app.listen(PORT, () => {
  console.log(`\n  ┌─────────────────────────────────────────┐`);
  console.log(`  │  Bookshelf server                        │`);
  console.log(`  │                                           │`);
  console.log(`  │  Site   →  http://localhost:${PORT}         │`);
  console.log(`  │  Admin  →  http://localhost:${PORT}/admin   │`);
  console.log(`  └─────────────────────────────────────────┘\n`);
});
