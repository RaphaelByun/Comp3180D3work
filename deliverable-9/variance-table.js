#!/usr/bin/env node
'use strict';
/*
 * Builds the hour-variance table (Markdown) from the Deliverable 8 hours log.
 *   node deliverable-9/variance-table.js [path/to/hours-log.csv]
 * Default path: deliverable-8/hours-log.csv (relative to the repo root, resolved from this file).
 * Reads planned hours (A2) and the actual hours you entered. It does not write the "why": that is yours.
 * Rows whose actuals are still blank are shown as "not logged yet".
 * A row is flagged "explain" when the actual differs from plan by 2 hours or more, or by 25% or more.
 * Rows whose A2 method changed are marked with a dagger and listed under the table.
 * Those notes are facts only, never reasons: the "why" is still yours.
 * Rows 3, 5 and 6 only point to the report's Evaluation Method; they say nothing else about the method.
 */
const fs = require('fs');
const path = require('path');

// A2-plan method changes, keyed by deliverable number. Facts and sources only; never a "why".
const PLAN_CHANGES = {
  1: 'Method changed on 14 Oct 2026: the two planned interviews were replaced by six coded published producer sources, and the heuristic pass of the four tools was run by AI (Claude Code) as a single evaluator (commits e078ebd and 92ff8b4).',
  3: 'See Evaluation Method.',
  5: 'A2 planned 18 h: nine 45-minute sessions incl. pilot (7 h), recruiting and briefing 4 h, coding 7 h. See Evaluation Method.',
  6: 'See Evaluation Method.',
};

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

function build(text) {
  const round1 = x => Math.round(x * 10) / 10;
  const lines = text.replace(/^﻿/, '').split(/\r?\n/).filter(l => l.trim() && !l.startsWith('#'));
  const head = parseLine(lines[0]).map(h => h.toLowerCase());
  const rows = lines.slice(1).map(l => { const c = parseLine(l); const o = {}; head.forEach((h, i) => { o[h] = c[i] === undefined ? '' : c[i]; }); return o; });
  const num = s => (s === '' || s === undefined || Number.isNaN(Number(s)) ? null : Number(s));
  const out = [];
  out.push('| # | Deliverable | Planned (A2) | In-prac planned | Actual | In-prac actual | Variance (actual minus planned) | Why (write this yourself) |');
  out.push('|---|---|---:|---:|---:|---:|---:|---|');
  let tp = 0, ta = 0, tpp = 0, tpa = 0, allLogged = true;
  const changed = [];
  for (const r of rows) {
    const p = num(r.a2_hours), a = num(r.actual_hours), pp = num(r.a2_in_prac), pa = num(r.actual_in_prac);
    if (r.deliverable === 'total') continue;
    tp += p || 0; tpp += pp || 0;
    let v = 'not logged yet', flag = '';
    if (a !== null) {
      ta += a; tpa += pa || 0;
      const d = a - p;
      v = (d > 0 ? '+' : '') + d.toFixed(1).replace(/\.0$/, '');
      if (Math.abs(d) >= 2 || (p > 0 && Math.abs(d) / p >= 0.25)) flag = ' (explain)';
    } else allLogged = false;
    const note = PLAN_CHANGES[r.deliverable];
    if (note) changed.push(`- D${r.deliverable} (${r.name}): ${note}`);
    out.push(`| ${r.deliverable} | ${r.name}${note ? ' †' : ''} | ${p} | ${pp} | ${a === null ? '' : a} | ${pa === null ? '' : pa} | ${v}${flag} | ${r.variance_why || ''} |`);
  }
  tp = round1(tp); tpp = round1(tpp); ta = round1(ta); tpa = round1(tpa);
  const d = round1(ta - tp);
  const bold = x => (x === '' ? '' : `**${x}**`);
  out.push(`| | **Total** | ${bold(tp)} | ${bold(tpp)} | ${bold(allLogged ? ta : '')} | ${bold(allLogged ? tpa : '')} | ${bold(allLogged ? (d > 0 ? '+' : '') + d : 'incomplete')} | |`);
  if (changed.length) {
    out.push('', '† A2-plan method changed. Facts only; any "why" is yours to write:', ...changed);
  }
  return out.join('\n') + '\n';
}

module.exports = { build, PLAN_CHANGES };
if (require.main === module) {
  const file = process.argv[2] || path.join(__dirname, '..', 'deliverable-8', 'hours-log.csv');
  process.stdout.write(build(fs.readFileSync(file, 'utf8')));
}
