#!/usr/bin/env node
'use strict';
/*
 * Builds the hour-variance table (Markdown) from the Deliverable 8 hours log.
 *   node deliverable-9/variance-table.js [path/to/hours-log.csv]
 * Default path: deliverable-8/hours-log.csv (relative to the repo root, resolved from this file).
 * Reads planned hours (A2) and the actual hours you entered. It does not write the "why": that is yours.
 * Rows whose actuals are still blank are shown as "not logged yet".
 * A row is flagged "explain" when the actual differs from plan by 2 hours or more, or by 25% or more.
 * Rows whose A2 method changed are marked with a dagger and listed under the table with the source to draw on.
 * Those notes are sources, not reasons: the "why" is still yours.
 */
const fs = require('fs');
const path = require('path');

// A2-plan method changes, keyed by deliverable number. Facts and sources only; never a "why".
const PLAN_CHANGES = {
  3: 'No pilot and no sessions to run the instruments in: the 17 Oct 2026 decision, no study with other people (deliverable-5/self-evaluation-plan.md §1, D3 changes in §11).',
  5: 'Sessions replaced by a solo evaluation, SE1 to SE4 (17 Oct 2026 decision). A2 planned 18 h (7 sessions, 4 recruiting, 7 coding); the solo plan budgets about 6.5 h (self-evaluation-plan.md §4 and §10). Report the difference as a change of method, not as time saved.',
  6: 'The analysis tables are built from the solo CSVs (SE1 to SE4) instead of the reader-study data (self-evaluation-plan.md §6, D6 changes in §12).',
};
// Raphael's stated reasons, his words, 17 Oct 2026 (self-evaluation-plan.md §1). A source to draw on, not text to paste.
const DECISION_SOURCE = 'Your reasons on 17 Oct 2026 (self-evaluation-plan.md §1): no live testing wanted, no time to arrange people, and testing it yourself is "the best way for me to explain it myself to others if they are using it, and I am able to learn it as well."';

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
  const d = ta - tp;
  const bold = x => (x === '' ? '' : `**${x}**`);
  out.push(`| | **Total** | ${bold(tp)} | ${bold(tpp)} | ${bold(allLogged ? ta : '')} | ${bold(allLogged ? tpa : '')} | ${bold(allLogged ? (d > 0 ? '+' : '') + d : 'incomplete')} | |`);
  if (changed.length) {
    out.push('', '† A2-plan method changed. Sources to draw on for the "why" (write it yourself):', ...changed, `- ${DECISION_SOURCE}`);
  }
  return out.join('\n') + '\n';
}

module.exports = { build, PLAN_CHANGES };
if (require.main === module) {
  const file = process.argv[2] || path.join(__dirname, '..', 'deliverable-8', 'hours-log.csv');
  process.stdout.write(build(fs.readFileSync(file, 'utf8')));
}
