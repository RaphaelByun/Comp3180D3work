#!/usr/bin/env node
'use strict';
/*
 * ChangeLens evaluation analysis (COMP3180 A3, Deliverable 6).
 * Plain Node.js, no dependencies.
 *
 * Usage:
 *   node analyse.js                       (runs on the FAKE sample-*.csv files beside this script)
 *   node analyse.js --scores item-scores.csv --needs need-classifications.csv \
 *                   --key marking-key.csv --codes think-aloud-codes.csv [--scores2 second-scorer-scores.csv]
 *                   [--out results.md]
 *
 * Any input may be left out; that section is skipped. Input formats are in README.md
 * (header-only templates are in ../analysis/templates/).
 *
 * Scoring follows deliverable-3/answer-key-and-scoring.md: items 1-5 score 0, 1 or 2 (a full mark is 2,
 * each report is out of 10); item 6 is coded Pass / Hedged / Over-claim and is never numeric.
 * Optional columns: item-scores `specific` (specificity tick on items 4-5), need-classifications
 * `records` (the T / R / U sources the reader circled). Both are reported as counts only.
 *
 * What it reports (small n: raw counts first, whole-number percentages only, no p-values):
 *   1. Item scores: per-condition and per-week item means with raw counts (items 1-5 scored 0-2,
 *      item 6 is the unanswerable item and is reported as category counts per version).
 *   2. Paired treatment-minus-baseline difference per participant over the five scored items (out of 10).
 *   3. Per-week baseline scores (week difficulty is the rival explanation).
 *   4. Ten-need sheet: percentage agreement and Cohen's kappa for each reader against the key,
 *      plus which needs readers disagreed with the key on.
 *   5. Think-aloud coding: percentage agreement and kappa between coding pass 1 and pass 2.
 *   6. Second scorer (optional --scores2, item-scores layout): items in agreement out of items scored,
 *      items 1-5 and item 6 apart, and the items where the two scorers differ.
 *
 * Data checks: sections 1-3 use complete readers only (both conditions, items 1-5 each scored once
 * with 0, 1 or 2). Any other reader is named with the reason and left out of every table. Fewer than
 * five complete readers prints the A2 fallback notice. Pilot codes (P followed by digits, e.g. P0) and
 * rows with pilot = yes are dropped from every section. Think-aloud segments are keyed by
 * participant + segment_id. Every pass 1, pass 2 and final code is checked against the codebook (21 Ko et al.
 * types plus none, other, unclear); any other code is named and its pass 1 / pass 2 pair is left out of agreement.
 * Design checks: every row of one reader gives one role, every row of one report gives one week and one order, and a reader's two reports
 * differ in both week and order; a reader failing this is left out and named. Weeks are read in upper
 * case and roles in lower case; weeks other than W1/W2 and roles other than producer/proxy are warned about.
 * Order is read as 1 or 2 (01, 1st, first; 02, 2nd, second); any other order is warned about and the reader left out.
 * Participant codes are normalised before grouping (r3, R3 -> R03; p00 -> P0) and any changed code is warned about.
 * A row with a blank participant (in any file that has the column) is named and left out: it may be pilot data.
 * Ten-need sheet: duplicate (reader, need) rows and classes other than D, P or N are named and left out.
 * need_id is the key N-number (n1, N1 and n01 read as N01); a bare number maps through the key's optional
 * `row` column. A reader with any need_id not in the key is named and left out of every need table.
 * CSV: RFC 4180 quoting (a quote opens a quoted field only at the start of a field); an unclosed quote
 * and a row with more filled cells than the header are warned about.
 */

const fs = require('fs');
const path = require('path');

// ---------- CSV ----------
// RFC 4180: a quote opens a quoted field only as the first character of a field. A quote anywhere
// else is kept as a literal character (hand-typed notes often hold one). A line whose first non-blank
// character is # is a comment and is skipped whole, quotes included. The returned array carries a
// `warnings` list: the file ending inside a quoted field, and data rows with more filled cells than the header.
function parseCSV(text) {
  text = text.replace(/^﻿/, '');
  const rows = [], lines = [];
  let row = [], cell = '', inQ = false, fieldStart = true, line = 1, rowLine = 1, openLine = 0;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (!inQ && fieldStart && row.length === 0) {
      // start of a line: skip a # comment line whole
      let j = i;
      while (text[j] === ' ' || text[j] === '\t') j++;
      if (text[j] === '#') {
        while (j < text.length && text[j] !== '\n' && text[j] !== '\r') j++;
        if (text[j] === '\r' && text[j + 1] === '\n') j++;
        i = j; line++; rowLine = line;
        continue;
      }
    }
    if (inQ) {
      if (c === '"') {
        if (text[i + 1] === '"') { cell += '"'; i++; } else inQ = false;
      } else {
        if (c === '\n' || (c === '\r' && text[i + 1] !== '\n')) line++;
        cell += c;
      }
    } else if (c === '"' && fieldStart) { inQ = true; fieldStart = false; openLine = line; }
    else if (c === ',') { row.push(cell); cell = ''; fieldStart = true; }
    else if (c === '\n' || c === '\r') {
      if (c === '\r' && text[i + 1] === '\n') i++;
      row.push(cell); cell = '';
      rows.push(row); lines.push(rowLine); row = [];
      fieldStart = true; line++; rowLine = line;
    } else { cell += c; fieldStart = false; }
  }
  const warnings = [];
  if (inQ) warnings.push(`WARNING: the file ends inside a quoted field opened on line ${openLine}. A quote was not closed; everything after it was read as one cell. Fix the quote on that line.`);
  if (cell !== '' || row.length) { row.push(cell); rows.push(row); lines.push(rowLine); }
  // drop rows where every cell is blank (Excel writes ",,,,,," lines after an edit)
  const keep = rows.map((r, i) => i).filter(i => rows[i].some(c => c.trim() !== ''));
  const out = [];
  out.warnings = warnings;
  if (!keep.length) return out;
  const head = rows[keep[0]].map(h => h.trim().toLowerCase());
  for (const i of keep.slice(1)) {
    const r = rows[i];
    if (r.slice(head.length).some(c => c.trim() !== '')) {
      warnings.push(`WARNING: line ${lines[i]} has ${r.length} cells but the header has ${head.length}; the extra cells are ignored. An unquoted comma in a note does this: put the note in double quotes.`);
    }
    const o = {};
    head.forEach((h, k) => { o[h] = (r[k] === undefined ? '' : r[k]).trim(); });
    out.push(o);
  }
  return out;
}
const csvWarnings = rows => (rows && rows.warnings) || [];
// A blank participant cell (code typed only on a block's first row) could hide pilot rows, so those
// rows are left out until filled in. A file with no participant column at all is still read.
const isBlankP = r => !isPilot(r) && r.participant !== undefined && r.participant === '';
// Participant codes are typed by hand: case, spaces and zero-padding are normalised before grouping, so one
// mistyped row does not split a reader in two. R plus digits reads as R and two digits (r3, R3, r03 -> R03);
// P plus digits reads as P and the number (p00, P00 -> P0), as in the tracker codes. Anything else is kept
// trimmed and upper case. A blank code stays blank.
function normParticipant(s) {
  const t = (s || '').trim().toUpperCase();
  let m = /^R\s*0*(\d+)$/.exec(t);
  if (m) return 'R' + m[1].padStart(2, '0');
  m = /^P\s*0*(\d+)$/.exec(t);
  if (m) return 'P' + m[1];
  return t;
}
// Returns copies of the rows with participant normalised (the CSV warnings list kept), and a warning
// naming each typed code that differs from its normalised form. Rows with no participant column are left as they are.
function normParticipants(rowsIn) {
  const changed = {};
  const rows = rowsIn.map(r => {
    if (r.participant === undefined) return r;
    const p = normParticipant(r.participant);
    if (p !== r.participant) { const k = `"${r.participant}" read as ${p}`; changed[k] = (changed[k] || 0) + 1; }
    return Object.assign({}, r, { participant: p });
  });
  rows.warnings = csvWarnings(rowsIn);
  const keys = Object.keys(changed).sort();
  const warning = keys.length
    ? `WARNING: participant code typed differently from the tracker form, read as normalised: ${keys.map(k => `${k} (${changed[k]} row${changed[k] === 1 ? '' : 's'})`).join('; ')}. Check the sheet and fix the code.`
    : null;
  return { rows, warning };
}
const BLANK_P_NOTE = 'Fill participant on every row: a blank row under a pilot row may be pilot data.';

function readCSV(file) {
  return parseCSV(fs.readFileSync(file, 'utf8'));
}

// ---------- statistics ----------
function agreement(a, b) {
  if (a.length !== b.length) throw new Error('agreement: length mismatch');
  let agree = 0;
  for (let i = 0; i < a.length; i++) if (a[i] === b[i]) agree++;
  return { agree, n: a.length };
}

// Cohen's kappa for two raters over nominal labels. NaN when chance agreement is 1
// (one rater, or both raters, used a single label throughout) or there are no items.
function cohenKappa(a, b) {
  if (a.length !== b.length) throw new Error('cohenKappa: length mismatch');
  const n = a.length;
  if (n === 0) return { kappa: NaN, po: NaN, pe: NaN, n };
  const labels = Array.from(new Set(a.concat(b)));
  let po = 0;
  for (let i = 0; i < n; i++) if (a[i] === b[i]) po++;
  po /= n;
  let pe = 0;
  for (const l of labels) {
    const pa = a.filter(x => x === l).length / n;
    const pb = b.filter(x => x === l).length / n;
    pe += pa * pb;
  }
  const kappa = Math.abs(1 - pe) < 1e-12 ? NaN : (po - pe) / (1 - pe);
  return { kappa, po, pe, n };
}

function mean(xs) { return xs.length ? xs.reduce((s, x) => s + x, 0) / xs.length : NaN; }
function median(xs) {
  if (!xs.length) return NaN;
  const s = xs.slice().sort((p, q) => p - q), m = Math.floor(s.length / 2);
  return s.length % 2 ? s[m] : (s[m - 1] + s[m]) / 2;
}

// ---------- formatting ----------
const f2 = x => (Number.isNaN(x) ? 'n/a' : x.toFixed(2));
const pct = (k, n) => (n ? `${k}/${n} (${Math.round((100 * k) / n)}%)` : '0/0');
const kfmt = k => (Number.isNaN(k) ? 'undefined (no variation in labels)' : k.toFixed(2));
function table(head, rows) {
  const all = [head].concat(rows).map(r => r.map(String));
  const w = head.map((_, i) => Math.max(...all.map(r => (r[i] || '').length)));
  const line = r => '| ' + r.map((c, i) => (c || '').padEnd(w[i])).join(' | ') + ' |';
  return [line(all[0]), '| ' + w.map(x => '-'.repeat(x)).join(' | ') + ' |']
    .concat(all.slice(1).map(line)).join('\n');
}

// ---------- 1-3. item scores ----------
const FLOOR = 5; // five readers in total (deliverable-3/README.md decision 5, 14 Oct 2026); the pilot never counts
function isPilot(r) {
  return /^(y|yes|true|1)$/i.test(r.pilot || '') || /^P\d+$/i.test(r.participant || '');
}
function normCond(c) {
  // Version A = baseline (no names), Version B = treatment (names), as in study/*/report-A-baseline.md.
  c = (c || '').toLowerCase();
  if (c === 'a' || c.startsWith('base')) return 'baseline';
  if (c === 'b' || c.startsWith('treat')) return 'treatment';
  return c;
}
// Item 6 is coded, not scored (deliverable-3/answer-key-and-scoring.md): Pass / Hedged / Over-claim.
const CODES6 = ['Pass', 'Hedged', 'Over-claim'];
function normCode6(s) {
  const t = (s || '').toLowerCase().replace(/[\s_]+/g, '-');
  if (t === 'pass') return 'Pass';
  if (t === 'hedged') return 'Hedged';
  if (t === 'over-claim' || t === 'overclaim') return 'Over-claim';
  return null;
}
const isTick = s => /^(y|yes|true|1|s|x)$/i.test((s || '').trim());
const SCORED = ['1', '2', '3', '4', '5'];
const CONDS = ['baseline', 'treatment'];
const validScore = s => s === 0 || s === 1 || s === 2;
// Reading order is typed by hand: 1, 01, 1st and first read as '1'; 2, 02, 2nd and second as '2'.
// Anything else is kept as typed, warned about, and the reader is left out.
function normOrder(s) {
  const t = (s || '').trim().toLowerCase();
  if (/^0*1$|^1st$|^first$/.test(t)) return '1';
  if (/^0*2$|^2nd$|^second$/.test(t)) return '2';
  return (s || '').trim();
}
const validOrder = o => o === '1' || o === '2';

// Sorts readers into complete (both conditions, items 1-5 each scored once with 0, 1 or 2) and
// excluded (with the reason). Every table and statistic uses complete readers only, so baseline
// and treatment always cover the same people and every total is out of 10.
function prepareScores(rowsTyped) {
  const np = normParticipants(rowsTyped), rowsAll = np.rows;
  const pilotRows = rowsAll.filter(isPilot);
  const blankP = rowsAll.filter(isBlankP);
  const rows = rowsAll.filter(r => !isPilot(r) && !isBlankP(r)).map(r => {
    // item is 1-6 (01 reads as 1); anything else (Q1, 7, blank) is kept as typed and warned about below
    const itemRaw = (r.item || '').trim();
    const item = /^0*[1-6]$/.test(itemRaw) ? String(parseInt(itemRaw, 10)) : itemRaw;
    const raw = (r.score || '').trim();
    return {
      participant: r.participant, role: (r.role || '').toLowerCase(), cond: normCond(r.condition),
      week: (r.week || '').toUpperCase(), order: normOrder(r.order), item,
      // items 1-5: number 0, 1 or 2. item 6: a category word, never a number.
      score: item === '6' ? null : (raw === '' ? NaN : Number(raw)),
      code6: item === '6' ? normCode6(r.score) : null,
      specific: (r.specific || '').trim(),
    };
  });
  const warnings = csvWarnings(rowsAll).slice();
  if (np.warning) warnings.push(np.warning);
  if (blankP.length) {
    warnings.push(`WARNING: ${blankP.length} row(s) with a blank participant, left out until filled in: ` +
      blankP.map(r => `${normCond(r.condition) || '(blank condition)'} item ${(r.item || '').trim() || '(blank)'}`).join('; ') + '. ' + BLANK_P_NOTE);
  }
  const bad = rows.filter(r => SCORED.includes(r.item) && !validScore(r.score));
  if (bad.length) {
    warnings.push(`WARNING: ${bad.length} row(s) for items 1-5 with a score that is not 0, 1 or 2: ` +
      bad.map(r => `${r.participant} ${r.cond} item ${r.item} ("${Number.isNaN(r.score) ? '' : r.score}")`).join('; ') + '.');
  }
  const badItem = rows.filter(r => !/^[1-6]$/.test(r.item));
  if (badItem.length) {
    warnings.push(`WARNING: ${badItem.length} row(s) with an item that is not 1 to 6: ` +
      badItem.map(r => `${r.participant} ${r.cond} item "${r.item}"`).join('; ') + '. Fix the item column.');
  }
  const bad6 = rows.filter(r => r.item === '6' && !r.code6);
  if (bad6.length) {
    warnings.push(`WARNING: ${bad6.length} row(s) for item 6 not coded Pass, Hedged or Over-claim: ` +
      bad6.map(r => `${r.participant} ${r.cond}`).join('; ') + '.');
  }
  // duplicate (participant, condition, item) rows
  const seen = {};
  for (const r of rows) { const k = `${r.participant}|${r.cond}|${r.item}`; seen[k] = (seen[k] || 0) + 1; }
  const dups = Object.keys(seen).filter(k => seen[k] > 1);
  if (dups.length) {
    warnings.push('WARNING: duplicate rows (same reader, condition and item): ' +
      dups.map(k => { const [p, c, it] = k.split('|'); return `${p} ${c} item ${it} (${seen[k]} rows)`; }).join('; ') + '.');
  }

  // weeks and roles are typed by hand: case is normalised above, anything else is named here
  const weekSet = Array.from(new Set(rows.map(r => r.week))).sort();
  if (rows.length && weekSet.join(',') !== 'W1,W2') {
    warnings.push(`WARNING: weeks found are ${weekSet.map(w => w || '(blank)').join(', ')}; expected exactly W1 and W2. Fix the week column.`);
  }
  const badRoles = Array.from(new Set(rows.filter(r => r.role !== 'producer' && r.role !== 'proxy').map(r => r.role || '(blank)'))).sort();
  if (badRoles.length) warnings.push(`WARNING: role not producer or proxy: ${badRoles.join(', ')}. Fix the role column.`);
  const badOrd = Array.from(new Set(rows.filter(r => !validOrder(r.order)).map(r => `${r.participant} "${r.order}"`))).sort();
  if (badOrd.length) warnings.push(`WARNING: order not 1 or 2 (1st, first and 01 are read as 1): ${badOrd.join(', ')}. Those readers are left out. Fix the order column.`);

  const people = Array.from(new Set(rows.map(r => r.participant))).sort();
  const complete = [], excluded = [];
  const tot = {}; // tot[p][cond] = {sum, week, order, role}, complete readers only
  for (const p of people) {
    const reasons = [];
    const mine = rows.filter(r => r.participant === p);
    const per = {};
    for (const c of CONDS) {
      const cr = mine.filter(r => r.cond === c);
      if (!cr.length) { reasons.push(`no ${c} rows`); continue; }
      const missing = [], badIt = [], dupIt = [];
      for (const it of SCORED) {
        const ir = cr.filter(r => r.item === it);
        if (!ir.length) missing.push(it);
        else if (ir.length > 1) dupIt.push(it);
        else if (!validScore(ir[0].score)) badIt.push(it);
      }
      if (missing.length) reasons.push(`${c} item ${missing.join(', ')} missing`);
      if (dupIt.length) reasons.push(`${c} item ${dupIt.join(', ')} duplicated`);
      if (badIt.length) reasons.push(`${c} item ${badIt.join(', ')} score not 0, 1 or 2`);
      const oddIt = cr.filter(r => !/^[1-6]$/.test(r.item)).map(r => `"${r.item}"`);
      if (oddIt.length) reasons.push(`${c} item ${oddIt.join(', ')} not 1 to 6`);
      // every row of one report must give the same week and the same order
      const wks = Array.from(new Set(cr.map(r => r.week))), ords = Array.from(new Set(cr.map(r => r.order)));
      if (wks.length > 1) reasons.push(`${c} rows give more than one week (${wks.join(', ')})`);
      if (ords.length > 1) reasons.push(`${c} rows give more than one order (${ords.join(', ')})`);
      const badO = ords.filter(o => !validOrder(o));
      if (badO.length) reasons.push(`${c} order not 1 or 2 (${badO.map(o => `"${o}"`).join(', ')})`);
      const sr = cr.filter(r => SCORED.includes(r.item) && validScore(r.score));
      per[c] = { sum: sr.reduce((s, r) => s + r.score, 0), week: cr[0].week, order: cr[0].order, role: cr[0].role };
    }
    // counterbalanced design: the two reports are different weeks and were read in different orders
    if (per.baseline && per.treatment) {
      if (per.baseline.week === per.treatment.week) reasons.push(`baseline and treatment both ${per.baseline.week || '(blank week)'}`);
      if (per.baseline.order === per.treatment.order && validOrder(per.baseline.order)) reasons.push(`baseline and treatment both order ${per.baseline.order || '(blank)'}, likely an order error`);
    }
    // one reader has one role: rows that disagree would put the reader in the wrong group of the role split
    const roles = Array.from(new Set(mine.map(r => r.role || '(blank)'))).sort();
    if (roles.length > 1) reasons.push(`rows give more than one role (${roles.join(', ')})`);
    const other = mine.filter(r => !CONDS.includes(r.cond));
    if (other.length) reasons.push(`condition not baseline/treatment or A/B (${Array.from(new Set(other.map(r => r.cond || '(blank)'))).join(', ')})`);
    if (reasons.length) excluded.push({ p, reasons });
    else { complete.push(p); tot[p] = per; }
  }
  const inc = new Set(complete);
  return { rowsAll, pilotRows, blankRows: blankP, rows, used: rows.filter(r => inc.has(r.participant)), warnings, people, complete, excluded, tot };
}

function floorNotice(n) {
  return n < FLOOR
    ? `**Below the five-reader floor (${n} complete reader${n === 1 ? '' : 's'}): A2 fallback. Report this arm as descriptive only and the think-alouds first.**`
    : null;
}

function analyseScores(rowsAll) {
  const S = prepareScores(rowsAll);
  const out = [];
  const notice = floorNotice(S.complete.length);
  if (notice) out.push(notice + '\n');
  out.push(`Rows read: ${S.rowsAll.length}; pilot rows excluded: ${S.pilotRows.length}; ` +
    (S.blankRows.length ? `blank participant rows left out: ${S.blankRows.length}; ` : '') + `analysed: ${S.rows.length}.`);
  out.push(`Complete readers (both reports, items 1-5 each scored once): ${S.complete.length}${S.complete.length ? ' (' + S.complete.join(', ') + ')' : ''}. Every table below uses these readers only.`);
  S.warnings.forEach(w => out.push(w));
  if (S.excluded.length) {
    out.push(`WARNING: ${S.excluded.length} reader(s) left out of every table and statistic: ` +
      S.excluded.map(x => `${x.p || '(blank code)'} (${x.reasons.join('; ')})`).join('; ') + '. Report them and the reason in Method.');
  }

  const rows = S.used, tot = S.tot, people = S.complete;
  if (people.length) out.push('Readers per sequence (week and order of the treatment report): ' + sequenceCounts(S).map(x => `${x.week} order ${x.order}: ${x.n}`).join('; ') + '. Uneven or empty cells weaken the counterbalance.');
  const weeks = Array.from(new Set(rows.map(r => r.week))).sort();
  const sel = f => rows.filter(f);

  function cellStats(list) {
    // list: score rows for one scored item -> n (valid rows only), full marks (2), mean score 0-2
    const v = list.filter(r => validScore(r.score));
    return { n: v.length, full: v.filter(r => r.score === 2).length, mean: mean(v.map(r => r.score)) };
  }

  // 1a. per condition, per item (items 1-5)
  out.push('\n### Item scores by condition (full-mark count / readers, mean score 0-2)\n');
  const t1 = [];
  for (const it of SCORED) {
    const row = [it];
    for (const c of CONDS) {
      const s = cellStats(sel(r => r.cond === c && r.item === it));
      row.push(`${s.full}/${s.n}`, f2(s.mean));
    }
    t1.push(row);
  }
  out.push(table(['Item', 'Baseline full', 'Baseline mean', 'Treatment full', 'Treatment mean'], t1));

  // 1b. per week x condition x item
  out.push('\n### Item scores by week and condition (full-mark count / readers)\n');
  const t2 = [];
  for (const it of SCORED) {
    const row = [it];
    for (const w of weeks) for (const c of CONDS) {
      const s = cellStats(sel(r => r.week === w && r.cond === c && r.item === it));
      row.push(`${s.full}/${s.n}`);
    }
    t2.push(row);
  }
  const head2 = ['Item'];
  for (const w of weeks) for (const c of CONDS) head2.push(`${w} ${c}`);
  out.push(table(head2, t2));

  // 1c. item 6: category counts per version, never a number
  out.push('\n### Item 6 (unanswerable): category counts per version\n');
  const t6 = item6Counts(S).map(x => [x.code].concat(x.cells.map(c => `${c.k}/${c.n}`)));
  out.push(table(['Code', 'Baseline', 'Treatment'], t6));
  out.push('\nItem 6 is answerable only by saying the report does not tell you. Over-claim is the count that matters; Hedged is shown beside it, not merged. It is not part of the /10 total.');

  // 1d. optional specificity tick (items 4 and 5): descriptive only
  const specRows = rows.filter(r => (r.item === '4' || r.item === '5') && r.specific !== '');
  if (specRows.length) {
    out.push('\n### Specificity tick on items 4 and 5 (answer used a name only Version B shows; descriptive, not scored)\n');
    const ts = ['4', '5'].map(it => [it].concat(CONDS.map(c => {
      const all = specRows.filter(r => r.cond === c && r.item === it);
      return `${all.filter(r => isTick(r.specific)).length}/${all.length}`;
    })));
    out.push(table(['Item', 'Baseline ticked', 'Treatment ticked'], ts));
  }

  // 2. paired differences
  out.push('\n### Paired difference per reader (treatment minus baseline, summed over items 1-5; each report is out of 10, so the difference runs from -10 to +10)\n');
  const diffs = pairedDiffs(S), t3 = [];
  for (const x of diffs) {
    const b = tot[x.p].baseline, t = tot[x.p].treatment;
    t3.push([x.p, x.role || '', `${b.week} (order ${b.order})`, f2(b.sum), `${t.week} (order ${t.order})`, f2(t.sum), (x.d > 0 ? '+' : '') + f2(x.d)]);
  }
  out.push(table(['Reader', 'Role', 'Baseline week', 'Baseline /10', 'Treatment week', 'Treatment /10', 'Difference'], t3));
  const ds = diffs.map(x => x.d);
  if (ds.length) {
    const up = ds.filter(x => x > 0).length, dn = ds.filter(x => x < 0).length, z = ds.length - up - dn;
    out.push(`\nReaders: ${ds.length}. Higher with names: ${up}. Same: ${z}. Lower with names: ${dn}.`);
    out.push(`Mean difference ${f2(mean(ds))} points out of 10 (median ${f2(median(ds))}, range ${f2(Math.min(...ds))} to ${f2(Math.max(...ds))}; possible range -10 to +10).`);
    // Week balance: if more readers had their treatment report in one week, week difficulty leaks into
    // the plain mean. The mean per treatment week, averaged, weights both weeks equally.
    const wb = weekBalanced(S);
    if (wb.otherWeeks.length) {
      out.push(`Week-balanced difference: not computed: weeks are not W1/W2 (${wb.otherWeeks.map(w => w || '(blank)').join(', ')}). Fix the week column.`);
    } else if (wb.balanced === null) {
      out.push('Week-balanced difference: not computed, because every treatment report was in one week. The names effect and the week cannot be told apart.');
    } else {
      out.push('By week of the treatment report: ' + wb.groups.map(g => `${g.week} n=${g.n}, mean ${f2(g.mean)}`).join('; ') +
        `. Week-balanced difference (the average of the two): ${f2(wb.balanced)} points out of 10.` +
        (wb.groups[0].n !== wb.groups[1].n ? ' The two groups differ in size, so the plain mean above is unbalanced: it leans toward the bigger group\'s week. Report the week-balanced figure beside it.' : ''));
    }
    const roles = Array.from(new Set(diffs.map(x => x.role))).sort();
    if (roles.length > 1) {
      const byRole = roles.map(r => ({ r, x: diffs.filter(d => d.role === r).map(d => d.d) }));
      if (byRole.some(g => g.x.length < 2)) {
        out.push('By role: not split. ' + byRole.map(g => `${g.r || '(none)'} n=${g.x.length}`).join('; ') + '. A role with one reader gives one person\'s score, not a group mean.');
      } else {
        out.push('By role: ' + byRole.map(g => `${g.r || '(none)'} n=${g.x.length}, mean ${f2(mean(g.x))}`).join('; ') + '. Proxies stand in for producers, so their difference is an upper bound.');
      }
    }
    out.push('With this few readers the figures show direction and where it fails, not significance.');
  }

  // 3. per-week baseline
  out.push('\n### Per-week baseline scores (rival explanation: some weeks are harder)\n');
  const t4 = [];
  for (const w of weeks) {
    for (const c of CONDS) {
      const sums = people.filter(p => tot[p][c].week === w).map(p => tot[p][c].sum);
      t4.push([w, c, String(sums.length), sums.length ? f2(mean(sums)) : 'n/a', sums.join(', ')]);
    }
  }
  out.push(table(['Week', 'Condition', 'Readers', 'Mean /10', 'Individual totals'], t4));
  const bw = weeks.map(w => people.filter(p => tot[p].baseline.week === w).map(p => tot[p].baseline.sum));
  if (bw.length === 2 && bw[0].length && bw[1].length) {
    out.push(`\nBaseline mean gap between weeks: ${f2(Math.abs(mean(bw[0]) - mean(bw[1])))} points out of 10. Compare this with the treatment effect before crediting the names.`);
  }

  // order check, within each condition: pooling the conditions mixes the order effect with the
  // condition imbalance whenever the sequences are uneven (five readers on S1, S2, S3, S4, S2).
  if (people.length) {
    out.push('\nMean total /10 by reading order within each condition (first report vs second): ' +
      orderByCondition(S).map(x => `${x.cond}: ` + x.orders.map(o => `order ${o.order} ${o.n ? f2(o.mean) : 'n/a'} (n=${o.n})`).join(', ')).join('; ') +
      '. Compare order 1 with order 2 inside one condition only.');
  }
  return out.join('\n');
}

// Mean total per reading order inside each condition, complete readers only.
function orderByCondition(S) {
  return CONDS.map(c => ({
    cond: c,
    orders: ['1', '2'].map(o => {
      const xs = S.complete.filter(p => S.tot[p][c].order === o).map(p => S.tot[p][c].sum);
      return { order: o, n: xs.length, mean: mean(xs) };
    }),
  }));
}

// Mean paired difference per week of the treatment report, and their average (null when a week is empty).
function weekBalanced(S) {
  const diffs = pairedDiffs(S);
  const groups = ['W1', 'W2'].map(w => {
    const xs = diffs.filter(d => S.tot[d.p].treatment.week === w).map(d => d.d);
    return { week: w, n: xs.length, mean: mean(xs) };
  });
  // weeks typed as anything but W1/W2 ('Week 1') fall in neither group; say so rather than "one week"
  const otherWeeks = Array.from(new Set(diffs.map(d => S.tot[d.p].treatment.week).filter(w => w !== 'W1' && w !== 'W2'))).sort();
  return { groups, otherWeeks, balanced: !otherWeeks.length && groups.every(g => g.n) ? (groups[0].mean + groups[1].mean) / 2 : null };
}

// Treatment-minus-baseline difference for each complete reader (used by the report and by figures.js).
function pairedDiffs(S) {
  return S.complete.map(p => {
    const b = S.tot[p].baseline, t = S.tot[p].treatment;
    return { p, d: t.sum - b.sum, role: b.role || t.role };
  });
}

// Complete readers per sequence cell, keyed by the treatment report's week and order. The four
// design cells (W1/W2 x order 1/2) are always listed, empty ones as 0.
function sequenceCounts(S) {
  const cnt = {};
  for (const w of ['W1', 'W2']) for (const o of ['1', '2']) cnt[`${w}|${o}`] = 0;
  for (const p of S.complete) { const t = S.tot[p].treatment; const k = `${t.week}|${t.order}`; cnt[k] = (cnt[k] || 0) + 1; }
  return Object.keys(cnt).sort().map(k => { const [week, order] = k.split('|'); return { week, order, n: cnt[k] }; });
}

// Full-mark counts per item and condition over complete readers (Table 2 in figures.js).
// With byWeek, each condition is split by the week of that report (W1 and W2 cells).
function fullMarkCounts(S, byWeek) {
  const weeks = byWeek ? Array.from(new Set(S.used.map(r => r.week))).sort() : [null];
  return SCORED.map(it => ({
    item: it,
    cells: [].concat(...weeks.map(w => CONDS.map(c => {
      const v = S.used.filter(r => r.cond === c && r.item === it && validScore(r.score) && (w === null || r.week === w));
      return { cond: c, week: w, full: v.filter(r => r.score === 2).length, n: v.length };
    }))),
  }));
}

// Item 6 code counts per condition over complete readers: { code, cells: [{cond, k, n}] }.
function item6Counts(S) {
  return CODES6.map(code => ({
    code,
    cells: CONDS.map(c => {
      const all = S.used.filter(r => r.cond === c && r.item === '6');
      return { cond: c, k: all.filter(r => r.code6 === code).length, n: all.length };
    }),
  }));
}

// ---------- 1e. second-scorer check ----------
// deliverable-3/answer-key-and-scoring.md: after sessions a second scorer re-scores at least two readers'
// sheets (both reports); agreement is items in agreement out of items scored. scores2 uses the
// item-scores layout and holds only the re-scored readers. Each (reader, condition, item) in scores2 is
// matched to the first scorer's row. Items 1-5 compare the 0/1/2 score; item 6 compares the code.
function secondScorer(rows1All, rows2All) {
  const S1 = prepareScores(rows1All), S2 = prepareScores(rows2All);
  const warnings = csvWarnings(rows2All).map(w => 'Second-scorer file: ' + w);
  const key = r => `${r.participant}|${r.cond}|${r.item}`;
  const group = rows => { const g = {}; rows.forEach(r => { (g[key(r)] = g[key(r)] || []).push(r); }); return g; };
  const g1 = group(S1.rows), g2 = group(S2.rows);
  const pairs = [], dup = [], noMatch = [], invalid = [];
  for (const k of Object.keys(g2).sort()) {
    const a = g1[k] || [], b = g2[k];
    if (a.length > 1 || b.length > 1) { dup.push(k); continue; }
    if (!a.length) { noMatch.push(k); continue; }
    const x = a[0], y = b[0];
    if (x.item === '6') {
      if (!x.code6 || !y.code6) { invalid.push(k); continue; }
      pairs.push({ p: x.participant, cond: x.cond, item: '6', s1: x.code6, s2: y.code6 });
    } else if (SCORED.includes(x.item)) {
      if (!validScore(x.score) || !validScore(y.score)) { invalid.push(k); continue; }
      pairs.push({ p: x.participant, cond: x.cond, item: x.item, s1: String(x.score), s2: String(y.score) });
    }
  }
  const fmt = k => { const [p, c, it] = k.split('|'); return `${p} ${c} item ${it}`; };
  if (dup.length) warnings.push(`WARNING: duplicate rows in either file, left out: ${dup.map(fmt).join('; ')}.`);
  if (noMatch.length) warnings.push(`WARNING: second-scorer rows with no first-scorer row, left out: ${noMatch.map(fmt).join('; ')}.`);
  if (invalid.length) warnings.push(`WARNING: rows with a score not 0, 1 or 2 (items 1-5) or a code not Pass, Hedged or Over-claim (item 6) in either file, left out: ${invalid.map(fmt).join('; ')}.`);
  const readers = Array.from(new Set(pairs.map(x => x.p))).sort();
  const oneReport = readers.filter(p => CONDS.some(c => !pairs.some(x => x.p === p && x.cond === c)));
  if (oneReport.length) warnings.push(`WARNING: re-scored on one report only: ${oneReport.join(', ')}. D3 asks for both reports.`);
  if (readers.length < 2) warnings.push(`WARNING: ${readers.length} reader(s) re-scored; D3 asks for at least two.`);
  const s15 = pairs.filter(x => x.item !== '6'), s6 = pairs.filter(x => x.item === '6');
  return {
    readers, warnings, pairs,
    items15: { agree: s15.filter(x => x.s1 === x.s2).length, n: s15.length },
    item6: { agree: s6.filter(x => x.s1 === x.s2).length, n: s6.length },
    differ: pairs.filter(x => x.s1 !== x.s2),
  };
}

function analyseSecondScorer(rows1All, rows2All) {
  const R = secondScorer(rows1All, rows2All);
  const out = [];
  out.push(`Readers re-scored by the second scorer: ${R.readers.length}${R.readers.length ? ' (' + R.readers.join(', ') + ')' : ''}. Pilot excluded.`);
  R.warnings.forEach(w => out.push(w));
  out.push(`Items 1-5 in agreement: ${R.items15.agree}/${R.items15.n}. Item 6 codes in agreement: ${R.item6.agree}/${R.item6.n}.`);
  out.push('\n### Items where the scorers differ (settle each with a written rule in the answer key)\n');
  out.push(R.differ.length ? table(['Reader', 'Condition', 'Item', 'Scorer 1', 'Scorer 2'], R.differ.map(x => [x.p, x.cond, x.item, x.s1, x.s2])) : 'None.');
  return out.join('\n');
}

// ---------- 4. ten-need sheet ----------
// Per reader: the needs they classified. Per need: how many readers classified it and how many matched the key.
// A class is D, P or N. Blank means not classified. Anything else (e.g. "D/P" for two circles, a word)
// is named in a warning and left out, as is every row of a duplicated (reader, need) pair.
const NEED_CLASSES = ['D', 'P', 'N'];
// need_id is the key's N-number (deliverable-3/ten-need-sheet.md section B: N01, N03, N07 ...), not the
// row number printed on the participant sheet (1 to 10). Case, spaces and zero-padding are normalised
// (n1, N1, n01 -> N01). A bare number is a printed row number: it is mapped through the key's optional
// `row` column when the key has one, and is otherwise left unmatched.
function normNeedId(s) {
  const t = (s || '').trim().toUpperCase();
  const m = /^N\s*0*(\d+)$/.exec(t);
  return m ? 'N' + m[1].padStart(2, '0') : t;
}
function prepareNeeds(needTyped, keyRows) {
  const np = normParticipants(needTyped), needRows = np.rows;
  const warnings = csvWarnings(keyRows).concat(csvWarnings(needRows));
  if (np.warning) warnings.push(np.warning);
  const key = {}, keyCount = {}, badKey = [], rowMap = {};
  keyRows.forEach(r => { const id = normNeedId(r.need_id); keyCount[id] = (keyCount[id] || 0) + 1; });
  keyRows.forEach(r => {
    const id = normNeedId(r.need_id);
    const row = (r.row || '').trim();
    if (/^\d+$/.test(row)) rowMap[String(parseInt(row, 10))] = id;
    const c = (r.class || '').trim().toUpperCase();
    if (keyCount[id] > 1) return;
    if (!NEED_CLASSES.includes(c)) { badKey.push(`${id} ("${r.class || ''}")`); return; }
    key[id] = c;
  });
  const keyDups = Object.keys(keyCount).filter(id => keyCount[id] > 1);
  if (keyDups.length) warnings.push(`WARNING: need listed more than once in the key, left out: ${keyDups.join(', ')}.`);
  if (badKey.length) warnings.push(`WARNING: key class not D, P or N, need left out: ${badKey.join(', ')}.`);
  const needIds = Object.keys(key);
  const nid = s => {
    const t = (s || '').trim();
    return /^\d+$/.test(t) && rowMap[String(parseInt(t, 10))] ? rowMap[String(parseInt(t, 10))] : normNeedId(t);
  };
  const blankP = needRows.filter(isBlankP);
  if (blankP.length) {
    warnings.push(`WARNING: ${blankP.length} row(s) with a blank participant, left out until filled in: need ${blankP.map(r => r.need_id || '(blank)').join(', ')}. ` + BLANK_P_NOTE);
  }
  const rowsIn = needRows.filter(r => !isPilot(r) && !isBlankP(r)).map(r => Object.assign({}, r, { need_id: nid(r.need_id) }));
  // A reader row whose need_id is not in the key means the sheet was typed with other ids (often the
  // printed row numbers). Matching the rest would compare answers against the wrong needs, so the
  // reader is named and left out of every need table until the sheet is fixed.
  const unmatched = {};
  rowsIn.forEach(r => { if (!keyCount[r.need_id]) (unmatched[r.participant] = unmatched[r.participant] || []).push(r.need_id || '(blank)'); });
  const excluded = Object.keys(unmatched).sort().map(p => ({ p, ids: unmatched[p] }));
  if (excluded.length) {
    warnings.push('WARNING: need_id not in the key, reader left out of the agreement table until fixed: ' +
      excluded.map(x => `${x.p || '(blank code)'} rows ${x.ids.join(', ')} not in the key`).join('; ') + '. ' +
      'need_id must be the key\'s N-number from deliverable-3/ten-need-sheet.md section B, not the printed row number (or give the key a `row` column).');
  }
  const rows = rowsIn.filter(r => !unmatched[r.participant]);
  const seen = {};
  rows.forEach(r => { const k = `${r.participant}|${r.need_id}`; seen[k] = (seen[k] || 0) + 1; });
  const dups = Object.keys(seen).filter(k => seen[k] > 1);
  if (dups.length) {
    warnings.push('WARNING: duplicate rows (same reader and need), left out until fixed: ' +
      dups.map(k => { const [p, id] = k.split('|'); return `${p} ${id} (${seen[k]} rows)`; }).join('; ') + '.');
  }
  const badCls = [];
  const people = Array.from(new Set(rows.map(r => r.participant))).sort();
  const sheets = {};
  for (const p of people) {
    const mine = {};
    rows.filter(r => r.participant === p).forEach(r => {
      if (seen[`${p}|${r.need_id}`] > 1) return;
      const c = (r.class || '').trim().toUpperCase();
      if (c === '') return;
      if (!NEED_CLASSES.includes(c)) { badCls.push(`${p} ${r.need_id} ("${r.class}")`); return; }
      mine[r.need_id] = c;
    });
    sheets[p] = mine;
  }
  if (badCls.length) warnings.push(`WARNING: class not D, P or N, left out: ${badCls.join('; ')}.`);
  const perNeed = needIds.map(id => {
    const by = people.filter(p => sheets[p][id]);
    return { id, key: key[id], classified: by.length, matching: by.filter(p => sheets[p][id] === key[id]).length };
  });
  return { key, needIds, rows, people, sheets, perNeed, warnings, excluded };
}

function analyseNeeds(needRows, keyRows) {
  const N = prepareNeeds(needRows, keyRows);
  const { key, needIds, rows, people, sheets } = N;
  const out = [];
  out.push(`Key has ${needIds.length} needs; readers analysed: ${people.length} (pilot excluded` +
    (N.excluded.length ? `; ${N.excluded.length} left out for need_ids not in the key` : '') + ').');
  N.warnings.forEach(w => out.push(w));
  const t = [], miss = {};
  const per = [];
  for (const p of people) {
    const mine = sheets[p];
    const ids = needIds.filter(id => mine[id]);
    if (ids.length !== needIds.length) out.push(`WARNING: ${p} classified ${ids.length} of ${needIds.length} needs; analysed on those only.`);
    const a = ids.map(id => key[id]), b = ids.map(id => mine[id]);
    const ag = agreement(a, b), k = cohenKappa(a, b);
    per.push({ p, ag, k });
    t.push([p, pct(ag.agree, ag.n), kfmt(k.kappa)]);
    ids.forEach(id => { if (mine[id] !== key[id]) (miss[id] = miss[id] || []).push(`${p}:${mine[id]}`); });
  }
  out.push('\n### Each reader against the marking key\n');
  out.push(table(['Reader', 'Agreement with key', "Cohen's kappa"], t));
  if (per.length) {
    const ks = per.map(x => x.k.kappa).filter(x => !Number.isNaN(x));
    // lowest and highest by proportion, each as the reader's own raw count
    const sorted = per.filter(x => x.ag.n).slice().sort((x, y) => x.ag.agree / x.ag.n - y.ag.agree / y.ag.n);
    const lo = sorted[0], hi = sorted[sorted.length - 1];
    const range = sorted.length ? `${lo.ag.agree}/${lo.ag.n} to ${hi.ag.agree}/${hi.ag.n}` : 'n/a';
    const short = per.filter(x => x.ag.n !== needIds.length);
    out.push(`\nAgreement ranged ${range} across ${per.length} readers; kappa ${ks.length ? f2(Math.min(...ks)) + ' to ' + f2(Math.max(...ks)) : 'n/a'}.` +
      (short.length ? ` ${short.length} reader(s) classified fewer than ${needIds.length} needs: ${short.map(x => `${x.p} (${x.ag.n})`).join(', ')}.` : ''));
    out.push('Over ten items these are indicative, not inferential.');
  }
  const recRows = rows.filter(r => (r.records || '').trim() !== '');
  if (recRows.length) {
    out.push('\n### Sources readers circled (T tracker, R repository, U Unity files; counts only, no key)\n');
    const t5 = [];
    for (const id of Array.from(new Set(recRows.map(r => r.need_id))).sort()) {
      const mine = recRows.filter(r => r.need_id === id);
      const cnt = { T: 0, R: 0, U: 0 };
      mine.forEach(r => new Set((r.records.toUpperCase().match(/[TRU]/g) || [])).forEach(l => cnt[l]++));
      t5.push([id, String(cnt.T), String(cnt.R), String(cnt.U), `${mine.length}/${people.length}`]);
    }
    out.push(table(['Need', 'T', 'R', 'U', 'Readers recording'], t5));
  }
  out.push('\n### Needs where readers departed from the key (each is a finding about what the artefacts cannot say; denominator = readers who classified that need)\n');
  const classifiedBy = {};
  N.perNeed.forEach(x => { classifiedBy[x.id] = x.classified; });
  const dis = needIds.filter(id => miss[id]).map(id => [id, key[id], `${miss[id].length}/${classifiedBy[id]}`, miss[id].join(', ')]);
  out.push(dis.length ? table(['Need', 'Key', 'Readers differing', 'Reader:their label'], dis) : 'None: every reader matched the key on every need.');
  return out.join('\n');
}

// ---------- 5. think-aloud coding ----------
// The 21 types, from deliverable-5/think-aloud-coding-sheet.md (checked against Ko et al., 2007,
// Section 5 and Figure 3, on 13 Oct 2026). The last three codes are Raphael's own, not Ko et al.'s.
const KO_TYPES = {
  c1: ['Writing Code', 'What data structures or functions can be used to implement this behavior?'],
  c2: ['Writing Code', 'How do I use this data structure or function?'],
  c3: ['Writing Code', 'How can I coordinate this code with this other data structure or function?'],
  s1: ['Submitting a Change', 'Did I make any mistakes in my new code?'],
  s2: ['Submitting a Change', "Did I follow my team's conventions?"],
  s3: ['Submitting a Change', 'Which changes are part of this submission?'],
  b1: ['Triaging Bugs', 'Is this a legitimate problem?'],
  b2: ['Triaging Bugs', 'How difficult will this problem be to fix?'],
  b3: ['Triaging Bugs', 'Is the problem worth fixing?'],
  r1: ['Reproducing a Failure', 'What does the failure look like?'],
  r2: ['Reproducing a Failure', 'In what situations does this failure occur?'],
  u1: ['Understanding Execution Behavior', 'What code could have caused this behavior?'],
  u2: ['Understanding Execution Behavior', "What's statically related to this code?"],
  u3: ['Understanding Execution Behavior', 'What code caused this program state?'],
  d1: ['Reasoning about Design', 'What is the purpose of this code?'],
  d2: ['Reasoning about Design', 'What is the program supposed to do?'],
  d3: ['Reasoning about Design', 'Why was this code implemented this way?'],
  d4: ['Reasoning about Design', 'What are the implications of this change?'],
  a1: ['Maintaining Awareness', 'How have resources I depend on changed?'],
  a2: ['Maintaining Awareness', 'What have my coworkers been doing?'],
  a3: ['Maintaining Awareness', 'What information was relevant to my task?'],
};
const EXTRA_CODES = {
  none: ['Not an information need (extra code, not Ko et al.)', ''],
  other: ['Need outside the 21 types (extra code, not Ko et al.)', ''],
  unclear: ['Cannot tell from the note (extra code, not Ko et al.)', ''],
};
const inCodebook = c => Object.prototype.hasOwnProperty.call(KO_TYPES, c) || Object.prototype.hasOwnProperty.call(EXTRA_CODES, c);
// Two accepted layouts: long (segment_id, participant, pass, code) or wide (segment_id, participant,
// pass1_code, pass2_code, as in deliverable-5/think-aloud-coding-sheet.csv). Segments are keyed by
// participant + segment_id, so ids that restart for each reader do not merge. Pilot rows are dropped.
function prepareCodes(codeTyped) {
  const np = normParticipants(codeTyped), codeRows = np.rows;
  const warnings = csvWarnings(codeRows).slice();
  if (np.warning) warnings.push(np.warning);
  const pilot = codeRows.filter(isPilot);
  const blankP = codeRows.filter(isBlankP);
  if (blankP.length) {
    warnings.push(`WARNING: ${blankP.length} row(s) with a blank participant, left out until filled in: segment ${blankP.map(r => r.segment_id || '(blank)').join(', ')}. ` + BLANK_P_NOTE);
  }
  const rows = codeRows.filter(r => !isPilot(r) && !blankP.includes(r));
  const by = {}, label = {}, count = {};
  const owners = {}, badPass = [];
  rows.forEach(r => {
    const p = r.participant || '';
    const k = `${p}|${r.segment_id}`;
    label[k] = { seg: r.segment_id, p };
    (owners[r.segment_id] = owners[r.segment_id] || new Set()).add(p);
    const seg = (by[k] = by[k] || {});
    if (r.pass !== undefined && r.code !== undefined) {
      // pass is 1, 2 or final; 'pass 2', 'p2' and 'Pass2' read by their last number, 'f' and 'final' as final
      const pt = (r.pass || '').trim().toLowerCase(), num = /(\d+)\s*$/.exec(pt);
      const pass = /^f/.test(pt) ? 'f' : (num ? String(parseInt(num[1], 10)) : '');
      if (pass !== '1' && pass !== '2' && pass !== 'f') { badPass.push(`${fmtSeg(label[k])} ("${r.pass}")`); return; }
      const ck = `${k}|${pass}`; count[ck] = (count[ck] || 0) + 1;
      if (r.code) seg[pass] = r.code.toLowerCase();
    } else {
      count[k] = (count[k] || 0) + 1;
      if (r.pass1_code) seg['1'] = r.pass1_code.toLowerCase();
      if (r.pass2_code) seg['2'] = r.pass2_code.toLowerCase();
      if (r.final_code) seg.f = r.final_code.toLowerCase();
    }
  });
  if (badPass.length) warnings.push(`WARNING: pass not 1, 2 or final, row left out until fixed: ${badPass.join('; ')}.`);
  // a segment listed twice (twice in one pass for the long layout) cannot be trusted: leave it out
  const dupKeys = new Set(Object.keys(count).filter(c => count[c] > 1).map(c => c.split('|').slice(0, 2).join('|')));
  if (dupKeys.size) {
    warnings.push('WARNING: segment listed more than once for the same reader' + (rows.some(r => r.pass !== undefined) ? ' and pass' : '') +
      ', left out until fixed: ' + Array.from(dupKeys).sort().map(k => fmtSeg(label[k])).join(', ') + '.');
    dupKeys.forEach(k => delete by[k]);
  }
  // every code must be in the codebook; a typo ('a 2', 'dl') or two codes in one cell ('a2/d3') is named here
  // and the segment's pass 1 / pass 2 pair is left out of agreement (analyseCodes) until it is fixed
  const badCode = [];
  Object.keys(by).sort().forEach(k => {
    for (const [ps, name] of [['1', 'pass 1'], ['2', 'pass 2'], ['f', 'final']]) {
      const c = by[k][ps];
      if (c && !inCodebook(c)) badCode.push(`${fmtSeg(label[k])} ${name} "${c}"`);
    }
  });
  if (badCode.length) {
    warnings.push(`WARNING: code not in the codebook (the 21 Ko et al. types, none, other, unclear): ${badCode.join('; ')}. ` +
      'Pass 1 / pass 2 pairs with such a code are left out of agreement until fixed.');
  }
  const shared = Object.keys(owners).filter(s => owners[s].size > 1).sort();
  if (shared.length) {
    warnings.push(`WARNING: segment_id used for more than one reader: ${shared.map(s => `${s} (${Array.from(owners[s]).sort().join(', ')})`).join('; ')}. ` +
      'Analysed per reader here, but deliverable-5/recode-sample.js merge keys by segment_id alone. Make every segment_id unique across the sheet before the draw.');
  }
  return { by, label, pilotRows: pilot.length, warnings };
}
const fmtSeg = l => (l.p ? `${l.p} ${l.seg}` : l.seg);

function analyseCodes(codeRows) {
  const out = [];
  const C = prepareCodes(codeRows);
  const by = C.by;
  if (C.pilotRows) out.push(`Pilot rows excluded: ${C.pilotRows}.`);
  C.warnings.forEach(w => out.push(w));
  const ids = Object.keys(by).sort();
  const first = ids.filter(id => by[id]['1']);
  const recoded = ids.filter(id => by[id]['1'] && by[id]['2']);
  const both = recoded.filter(id => inCodebook(by[id]['1']) && inCodebook(by[id]['2']));
  out.push(`Segments with pass 1: ${first.length}. Re-coded in pass 2: ${recoded.length} (${first.length ? Math.round(100 * recoded.length / first.length) : 0}% of pass 1; A2 plans about a quarter).`);
  if (recoded.length > both.length) out.push(`Re-coded pairs left out of agreement for a code not in the codebook: ${recoded.length - both.length}. Fix them and run again.`);
  if (!both.length) return out.join('\n');
  const a = both.map(id => by[id]['1']), b = both.map(id => by[id]['2']);
  const ag = agreement(a, b), k = cohenKappa(a, b);
  out.push(`Agreement: ${pct(ag.agree, ag.n)}. Cohen's kappa: ${kfmt(k.kappa)}.`);
  const d = both.filter(id => by[id]['1'] !== by[id]['2']).map(id => [C.label[id].seg, C.label[id].p, by[id]['1'], by[id]['2']]);
  out.push('\n### Segments where the passes differ (settle by reading the quote, then record the rule you applied)\n');
  out.push(d.length ? table(['Segment', 'Reader', 'Pass 1', 'Pass 2'], d) : 'None.');
  const cnt = {};
  first.forEach(id => { const c = by[id]['1']; cnt[c] = (cnt[c] || 0) + 1; });
  out.push('\n### Pass 1 code counts (all coded segments)\n');
  out.push(table(['Code', 'Segments'], Object.keys(cnt).sort().map(c => [c, String(cnt[c])])));
  out.push('\nA quarter-sample of a few dozen segments gives a rough check on coding, not a precise reliability figure.');
  return out.join('\n');
}

// ---------- main ----------
function args(argv) {
  const o = {};
  for (let i = 0; i < argv.length; i++) if (argv[i].startsWith('--')) o[argv[i].slice(2)] = argv[++i];
  return o;
}

// Closing line of the output, with the real number of complete readers (pilot excluded).
function footer(n) {
  if (n === null || n === undefined) return 'Report raw counts and limits.';
  return `Report raw counts and limits. ${n} complete reader${n === 1 ? '' : 's'} (pilot excluded) show direction and failure points, not significance.` +
    (n < FLOOR ? ' Below the five-reader floor: A2 fallback applies.' : '');
}

function main() {
  const a = args(process.argv.slice(2));
  const dir = __dirname;
  const useSample = !a.scores && !a.needs && !a.key && !a.codes && !a.scores2;
  const f = {
    scores: a.scores || (useSample ? path.join(dir, 'sample-item-scores.csv') : null),
    needs: a.needs || (useSample ? path.join(dir, 'sample-need-classifications.csv') : null),
    key: a.key || (useSample ? path.join(dir, 'sample-marking-key.csv') : null),
    codes: a.codes || (useSample ? path.join(dir, 'sample-think-aloud-codes.csv') : null),
  };
  if (a.scores2) f.scores2 = a.scores2;
  const out = [];
  const fake = Object.values(f).some(x => x && path.basename(x).startsWith('sample-'));
  out.push('# ChangeLens evaluation analysis');
  if (fake) out.push('\n**FAKE DATA: one or more inputs are sample-*.csv files. Nothing below is a result.**');
  out.push('\nInputs: ' + Object.entries(f).filter(([, v]) => v).map(([k, v]) => `${k}=${path.basename(v)}`).join(', '));
  let nReaders = null;
  if (f.scores) {
    const sRows = readCSV(f.scores);
    nReaders = prepareScores(sRows).complete.length;
    out.push('\n## 1. Item scores'); out.push(analyseScores(sRows));
    if (a.scores2) { out.push('\n## 1b. Second-scorer agreement'); out.push(analyseSecondScorer(sRows, readCSV(a.scores2))); }
  } else if (a.scores2) out.push('\n## 1b. Second-scorer agreement\nNeeds both --scores and --scores2; skipped.');
  if (f.needs && f.key) { out.push('\n## 2. Ten-need sheet'); out.push(analyseNeeds(readCSV(f.needs), readCSV(f.key))); }
  else if (f.needs || f.key) out.push('\n## 2. Ten-need sheet\nNeeds both --needs and --key; skipped.');
  if (f.codes) { out.push('\n## 3. Think-aloud coding agreement'); out.push(analyseCodes(readCSV(f.codes))); }
  out.push('\n---\n' + footer(nReaders));
  const text = out.join('\n') + '\n';
  if (a.out) fs.writeFileSync(a.out, text);
  process.stdout.write(text);
}

module.exports = {
  parseCSV, readCSV, agreement, cohenKappa, analyseScores, analyseNeeds, analyseCodes, mean, median,
  prepareScores, prepareNeeds, prepareCodes, pairedDiffs, fullMarkCounts, item6Counts, sequenceCounts,
  secondScorer, analyseSecondScorer, footer, isPilot, FLOOR, normNeedId, orderByCondition, weekBalanced,
  KO_TYPES, EXTRA_CODES, inCodebook, normParticipant,
};
if (require.main === module) main();
