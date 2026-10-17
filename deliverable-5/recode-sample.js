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
 *       If --out is the same file as --in, the old sheet is kept as <in>.bak first.
 *       It writes nothing if the merged sheet would not keep the same rows and pass-1 codes.
 * Both stop with an error on an unclosed quote, a row with more cells than the header,
 *       or a segment_id used on more than one row (split rows need their own id, e.g. S05b).
 * The seed and sample size are printed: write them in the diary and in Appendix D.
 */
const fs = require('fs');
const path = require('path');

// RFC 4180: a quote opens a quoted field only as the first character of a field.
// A stray quote inside a plain field is kept as text.
function parse(text) {
  text = text.replace(/^﻿/, '');
  const rows = [];
  let row = [], cell = '', q = false, start = true, line = 1, rowLine = 1, openLine = 0;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (q) {
      if (c === '"') { if (text[i + 1] === '"') { cell += '"'; i++; } else q = false; }
      else { if (c === '\n') line++; cell += c; }
    } else if (c === '"' && start) { q = true; start = false; openLine = line; }
    else if (c === ',') { row.push(cell); cell = ''; start = true; }
    else if (c === '\n' || c === '\r') {
      if (c === '\r' && text[i + 1] === '\n') i++;
      row.push(cell); cell = ''; rows.push({ r: row, line: rowLine }); row = []; start = true; line++; rowLine = line;
    } else { cell += c; start = false; }
  }
  if (q) throw new Error(`CSV error: a quoted field opened on line ${openLine} is never closed. Fix the quote and run again.`);
  if (cell !== '' || row.length) { row.push(cell); rows.push({ r: row, line: rowLine }); }
  const clean = rows.filter(({ r }) => !(r.length === 1 && r[0].trim() === '') && !(r[0] || '').trim().startsWith('#'));
  if (!clean.length) throw new Error('CSV error: the file has no header row.');
  const head = clean[0].r.map(h => h.trim());
  clean.slice(1).forEach(({ r, line: ln }) => {
    if (r.length > head.length) throw new Error(`CSV error: line ${ln} has ${r.length} cells but the header has ${head.length}. Quote any cell that holds a comma.`);
  });
  return { head, rows: clean.slice(1).map(({ r }) => Object.fromEntries(head.map((h, i) => [h, (r[i] || '').trim()]))) };
}
function esc(v) { v = String(v == null ? '' : v); return /[",\n\r]/.test(v) ? '"' + v.replace(/"/g, '""') + '"' : v; }
function serialise(head, rows) {
  return head.join(',') + '\n' + rows.map(r => head.map(h => esc(r[h])).join(',')).join('\n') + (rows.length ? '\n' : '');
}
function write(file, head, rows) { fs.writeFileSync(file, serialise(head, rows)); }
function mulberry32(a) {
  return function () {
    a |= 0; a = (a + 0x6D2B79F5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
function opts(argv) { const o = {}; for (let i = 1; i < argv.length; i++) if (argv[i].startsWith('--')) o[argv[i].slice(2)] = argv[++i]; o._ = argv[0]; return o; }

// Both commands key rows by segment_id, so every id must be unique.
function checkIds(rows, file) {
  const seen = new Set(), dup = new Set();
  rows.forEach(r => { if (seen.has(r.segment_id)) dup.add(r.segment_id); seen.add(r.segment_id); });
  if (dup.size) throw new Error(`ID error: segment_id used on more than one row in ${file}: ${[...dup].join(', ')}. Give each split row its own id (for example S05b) and run again.`);
}

function draw(rows, seed, share) {
  const pool = rows.filter(r => r.pass1_code && !/^P\d+$/i.test(r.participant));
  const k = Math.ceil(pool.length * share);
  const rnd = mulberry32(seed), idx = pool.map((_, i) => i);
  for (let i = idx.length - 1; i > 0; i--) { const j = Math.floor(rnd() * (i + 1)); [idx[i], idx[j]] = [idx[j], idx[i]]; }
  const chosen = idx.slice(0, k).sort((a, b) => a - b).map(i => pool[i]);
  return { pool: pool.length, chosen };
}

// Copies pass-2 codes into the main sheet and returns the new text.
// Throws if the text would not read back with the same rows and pass-1 codes.
function merge(main, blind) {
  const m = {}; blind.rows.forEach(r => { if (r.pass2_code) m[r.segment_id] = r.pass2_code; });
  const before = main.rows.map(r => r.pass1_code);
  let n = 0;
  main.rows.forEach(r => { if (m[r.segment_id]) { r.pass2_code = m[r.segment_id]; n++; } });
  const text = serialise(main.head, main.rows);
  const back = parse(text).rows;
  if (back.length !== before.length || back.some((r, i) => r.pass1_code !== before[i])) {
    throw new Error('Merge stopped: the merged sheet would not keep the same rows and pass-1 codes. Nothing was written.');
  }
  return { text, n };
}

if (require.main === module) {
  try {
    const o = opts(process.argv.slice(2));
    if (o._ === 'draw' && o.in && o.out) {
      const seed = parseInt(o.seed || '2026', 10), share = parseFloat(o.share || '0.25');
      const { rows } = parse(fs.readFileSync(o.in, 'utf8'));
      checkIds(rows, o.in);
      const { pool, chosen } = draw(rows, seed, share);
      const outHead = ['segment_id', 'participant', 'timestamp', 'report_condition', 'quote_note', 'pass2_code'];
      write(o.out, outHead, chosen.map(r => ({ ...r, pass2_code: '' })));
      console.log(`Pass-1 coded segments (pilot excluded): ${pool}. Drew ${chosen.length} (share ${share}, seed ${seed}) -> ${o.out}`);
      console.log('Wait at least a week after pass 1, then code the file without opening the main sheet.');
    } else if (o._ === 'merge' && o.in && o.blind && o.out) {
      const main = parse(fs.readFileSync(o.in, 'utf8')), blind = parse(fs.readFileSync(o.blind, 'utf8'));
      checkIds(main.rows, o.in); checkIds(blind.rows, o.blind);
      const { text, n } = merge(main, blind);
      if (path.resolve(o.out) === path.resolve(o.in)) {
        fs.copyFileSync(o.in, o.in + '.bak');
        console.log(`Kept the old sheet as ${o.in}.bak.`);
      }
      fs.writeFileSync(o.out, text);
      console.log(`Merged ${n} pass-2 codes into ${o.out}. Pass-1 codes were not touched.`);
    } else {
      console.log('Usage: see the comment at the top of this file.');
      process.exit(1);
    }
  } catch (e) {
    console.error(e.message);
    process.exit(1);
  }
}
module.exports = { draw, merge, parse, serialise, mulberry32, checkIds };
