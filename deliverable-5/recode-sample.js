#!/usr/bin/env node
'use strict';
/*
 * Blind re-code helper for the think-aloud coding sheet (A2: "a quarter is re-coded after a week").
 *
 *   Draw a sample:  node recode-sample.js draw  --in think-aloud-coding-sheet.csv --out recode-blind.csv [--seed 2026] [--share 0.25]
 *   Merge it back:  node recode-sample.js merge --in think-aloud-coding-sheet.csv --blind recode-blind.csv --out think-aloud-coding-sheet.csv
 *
 * draw  picks a seeded random quarter (rounded up) of the pass-1 coded segments, pilot excluded,
 *       and writes them WITHOUT the pass-1 codes, so pass 2 is blind to pass 1.
 * merge copies the pass-2 codes you filled in back into the main sheet (column pass2_code).
 * The seed and sample size are printed: write them in the diary and in Appendix D.
 */
const fs = require('fs');

function parse(text) {
  text = text.replace(/^﻿/, '');
  const rows = []; let row = [], cell = '', q = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (q) { if (c === '"') { if (text[i + 1] === '"') { cell += '"'; i++; } else q = false; } else cell += c; }
    else if (c === '"') q = true;
    else if (c === ',') { row.push(cell); cell = ''; }
    else if (c === '\n' || c === '\r') { if (c === '\r' && text[i + 1] === '\n') i++; row.push(cell); cell = ''; rows.push(row); row = []; }
    else cell += c;
  }
  if (cell !== '' || row.length) { row.push(cell); rows.push(row); }
  const clean = rows.filter(r => !(r.length === 1 && r[0].trim() === '') && !(r[0] || '').trim().startsWith('#'));
  const head = clean[0].map(h => h.trim());
  return { head, rows: clean.slice(1).map(r => Object.fromEntries(head.map((h, i) => [h, (r[i] || '').trim()]))) };
}
function esc(v) { v = String(v == null ? '' : v); return /[",\n\r]/.test(v) ? '"' + v.replace(/"/g, '""') + '"' : v; }
function write(file, head, rows) {
  fs.writeFileSync(file, head.join(',') + '\n' + rows.map(r => head.map(h => esc(r[h])).join(',')).join('\n') + (rows.length ? '\n' : ''));
}
function mulberry32(a) {
  return function () {
    a |= 0; a = (a + 0x6D2B79F5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
function opts(argv) { const o = {}; for (let i = 1; i < argv.length; i++) if (argv[i].startsWith('--')) o[argv[i].slice(2)] = argv[++i]; o._ = argv[0]; return o; }

function draw(rows, seed, share) {
  const pool = rows.filter(r => r.pass1_code && !/^P\d+$/i.test(r.participant));
  const k = Math.ceil(pool.length * share);
  const rnd = mulberry32(seed), idx = pool.map((_, i) => i);
  for (let i = idx.length - 1; i > 0; i--) { const j = Math.floor(rnd() * (i + 1)); [idx[i], idx[j]] = [idx[j], idx[i]]; }
  const chosen = idx.slice(0, k).sort((a, b) => a - b).map(i => pool[i]);
  return { pool: pool.length, chosen };
}

if (require.main === module) {
  const o = opts(process.argv.slice(2));
  if (o._ === 'draw' && o.in && o.out) {
    const seed = parseInt(o.seed || '2026', 10), share = parseFloat(o.share || '0.25');
    const { head, rows } = parse(fs.readFileSync(o.in, 'utf8'));
    const { pool, chosen } = draw(rows, seed, share);
    const outHead = ['segment_id', 'participant', 'timestamp', 'report_condition', 'quote_note', 'pass2_code'];
    write(o.out, outHead, chosen.map(r => ({ ...r, pass2_code: '' })));
    console.log(`Pass-1 coded segments (pilot excluded): ${pool}. Drew ${chosen.length} (share ${share}, seed ${seed}) -> ${o.out}`);
    console.log('Wait at least a week after pass 1, then code the file without opening the main sheet.');
  } else if (o._ === 'merge' && o.in && o.blind && o.out) {
    const main = parse(fs.readFileSync(o.in, 'utf8')), blind = parse(fs.readFileSync(o.blind, 'utf8'));
    const m = {}; blind.rows.forEach(r => { if (r.pass2_code) m[r.segment_id] = r.pass2_code; });
    let n = 0;
    main.rows.forEach(r => { if (m[r.segment_id]) { r.pass2_code = m[r.segment_id]; n++; } });
    write(o.out, main.head, main.rows);
    console.log(`Merged ${n} pass-2 codes into ${o.out}. Pass-1 codes were not touched.`);
  } else {
    console.log('Usage: see the comment at the top of this file.');
    process.exit(1);
  }
}
module.exports = { draw, parse, mulberry32 };
