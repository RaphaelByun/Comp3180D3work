#!/usr/bin/env node
'use strict';
/*
 * Totals hours-entries.csv by deliverable.
 *   node deliverable-8/sum-hours.js [entries.csv] [--write [hours-log.csv]]
 * Default entries path: deliverable-8/hours-entries.csv (resolved from this file).
 * Without --write it prints the totals and changes nothing.
 * With --write it fills actual_hours, actual_in_prac and variance_hours in hours-log.csv
 * (default deliverable-8/hours-log.csv). variance_hours = actual_hours - a2_hours, where
 * a2_hours is read from the A2 column already in hours-log.csv. It never touches the A2
 * columns, the "why" column or the total row.
 * Deliverables with no entries have all three cells blanked (never 0), so a stale value
 * left from an earlier run cannot survive and the row still shows as "not logged yet".
 * in_prac is the hours of that entry spent in prac. "yes"/"y" means all of them; blank or "no" means none.
 */
const fs = require('fs');
const path = require('path');

function parseLine(line) {
  const out = []; let cell = '', q = false;
  for (let i = 0; i < line.length; i++) {
    const c = line[i];
    if (q) { if (c === '"') { if (line[i + 1] === '"') { cell += '"'; i++; } else q = false; } else cell += c; }
    else if (c === '"') q = true;
    else if (c === ',') { out.push(cell); cell = ''; }
    else cell += c;
  }
  out.push(cell);
  return out.map(x => x.trim());
}

const round = n => Math.round(n * 100) / 100;

function sum(text) {
  const lines = text.replace(/^﻿/, '').split(/\r?\n/).filter(l => l.trim() && !l.startsWith('#'));
  const head = parseLine(lines[0] || '').map(h => h.toLowerCase());
  const totals = {};
  lines.slice(1).forEach((l, i) => {
    const c = parseLine(l); const r = {}; head.forEach((h, j) => { r[h] = c[j] === undefined ? '' : c[j]; });
    const d = r.deliverable;
    const h = Number(r.hours);
    if (!d || r.hours === '' || Number.isNaN(h)) throw new Error(`Entry ${i + 1}: needs a deliverable and a number of hours: ${l}`);
    const p = r.in_prac.toLowerCase();
    let ip;
    if (p === '' || p === 'no' || p === 'n') ip = 0;
    else if (p === 'yes' || p === 'y') ip = h;
    else { ip = Number(p); if (Number.isNaN(ip)) throw new Error(`Entry ${i + 1}: in_prac must be hours, yes or no: ${l}`); }
    if (ip > h) throw new Error(`Entry ${i + 1}: in_prac is more than hours: ${l}`);
    const t = totals[d] || (totals[d] = { hours: 0, in_prac: 0 });
    t.hours = round(t.hours + h); t.in_prac = round(t.in_prac + ip);
  });
  return totals;
}

function format(totals) {
  const keys = Object.keys(totals).sort((a, b) => Number(a) - Number(b) || a.localeCompare(b));
  const out = ['deliverable,actual_hours,actual_in_prac'];
  for (const k of keys) out.push(`${k},${totals[k].hours},${totals[k].in_prac}`);
  return out.join('\n') + '\n';
}

function fill(logText, totals) {
  const eol = logText.includes('\r\n') ? '\r\n' : '\n';
  const lines = logText.split(/\r?\n/);
  let head = null;
  const seen = new Set();
  const out = lines.map(l => {
    if (!l.trim() || l.startsWith('#')) return l;
    const c = parseLine(l);
    if (!head) { head = c.map(h => h.toLowerCase()); return l; }
    const ih = head.indexOf('actual_hours'), ip = head.indexOf('actual_in_prac'), id = head.indexOf('deliverable');
    const ia = head.indexOf('a2_hours'), iv = head.indexOf('variance_hours');
    const d = c[id];
    if (d === 'total') return l;
    // Rewrite only the actual and variance cells; keep every other cell exactly as written.
    const raw = splitRaw(l);
    if (!totals[d]) {
      // No entries for this deliverable: blank the cells rather than keep a stale value.
      raw[ih] = ''; raw[ip] = ''; if (iv !== -1) raw[iv] = '';
      return raw.join(',');
    }
    seen.add(d);
    raw[ih] = String(totals[d].hours); raw[ip] = String(totals[d].in_prac);
    if (iv !== -1) {
      const a2 = ia === -1 || c[ia] === '' ? NaN : Number(c[ia]);
      raw[iv] = Number.isNaN(a2) ? '' : String(round(totals[d].hours - a2));
    }
    return raw.join(',');
  });
  const unknown = Object.keys(totals).filter(d => !seen.has(d));
  if (unknown.length) throw new Error(`No row in hours-log.csv for deliverable(s): ${unknown.join(', ')}`);
  return out.join(eol);
}

// Splits on commas outside quotes, keeping each cell's original text (quotes included).
function splitRaw(line) {
  const out = []; let cell = '', q = false;
  for (const c of line) {
    if (c === '"') q = !q;
    if (c === ',' && !q) { out.push(cell); cell = ''; } else cell += c;
  }
  out.push(cell);
  return out;
}

module.exports = { sum, format, fill };
if (require.main === module) {
  const args = process.argv.slice(2);
  const w = args.indexOf('--write');
  const entries = (w === 0 ? null : args[0]) || path.join(__dirname, 'hours-entries.csv');
  const totals = sum(fs.readFileSync(entries, 'utf8'));
  process.stdout.write(format(totals));
  if (w !== -1) {
    const log = args[w + 1] || path.join(__dirname, 'hours-log.csv');
    fs.writeFileSync(log, fill(fs.readFileSync(log, 'utf8'), totals));
    process.stdout.write(`Wrote actual_hours, actual_in_prac and variance_hours into ${log}\n`);
  }
}
