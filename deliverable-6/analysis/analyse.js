#!/usr/bin/env node
'use strict';
/*
 * ChangeLens solo evaluation analysis (COMP3180 A3, Deliverable 6).
 * Plain Node.js, no dependencies.
 *
 * The evaluation is a solo one (Raphael's decision, 17 Oct 2026): one reader, the developer.
 * The plan is deliverable-5/self-evaluation-plan.md on deliverable-5-sessions (SE1 to SE4, sections 3 and 6).
 * This tool replaces the reader-study analysis (paired differences across readers, reader floor,
 * counterbalanced sequences, per-reader kappa). That version is in the git history before 17 Oct 2026.
 *
 * Usage:
 *   node analyse.js                      (runs on the FAKE sample-*.csv files beside this script)
 *   node analyse.js --se1 se1-fidelity-handcheck.csv --reads se2-reads.csv --needs se2-need-answers.csv
 *                   --items se2-item-scores.csv --log se2-needs-log.csv --scorer2 se2-second-scorer.csv
 *                   --walk se3-walkthrough.csv --heur se4-heuristic-problems.csv --tasks se4-task-outcomes.csv
 *                   [--d1 d1-problems.csv] [--d1tasks d1-task-outcomes.csv] [--out analysis-output.md]
 *
 * Any input may be left out; its table is skipped. Columns are in the plan, section 3, and in the
 * header-only templates in templates/.
 *
 * What it prints (raw counts first, no percentage without its count, no p-values):
 *   Table A. Fidelity hand-check (SE1): per week and version, S / C / U by hand, the A2 pass rule,
 *            and agreement with each AI scorer as x of n.
 *   Table B. Ten needs by read (SE2): the 10 x 4 grid of C / PC / W / NA beside key_ru_class and
 *            record_could_answer; per read: correct x of n, answers that needed Version B, wrong answers by cause.
 *   Table C. Key against observed (SQ1, first reads): observed class per need, then agreement x of n for
 *            key against observed, key against record, record against observed. Kappa only as indicative.
 *   Table D. Items (SQ2), if items exist: item scores per read, item 6 code, specificity ticks.
 *   Figure data. Minutes per read and confidence against git-log result (figures.js draws it).
 *   Table E. Cognitive walkthrough (SE3): steps per task, N answers per question, failure stories by severity.
 *   Table F. Heuristic problems (SE4): ChangeLens by severity and heuristic, beside the D1 tools if given;
 *            T1 to T7 outcomes.
 *   Table G. Needs log (SE2): entries by Ko et al. (2007) type; pass 1 against pass 2 as x of n only.
 *   Table H. Ratings and stand-up per read (SE2).
 *   Scoring check. AI second scorer against Raphael's scores, x of n.
 *
 * Read order is fixed by the plan: RX-A1 (14 Dec 2020, A first), RX-B2, RY-B1 (27 Sep 2021, B first), RY-A2.
 * First reads are compared only with each other; first and second reads are never added together.
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
    const o = { _line: lines[i] };
    head.forEach((h, k) => { o[h] = (r[k] === undefined ? '' : r[k]).trim(); });
    out.push(o);
  }
  return out;
}
const csvWarnings = rows => (rows && rows.warnings) || [];
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

// Cohen's kappa for two sets of nominal labels. NaN when chance agreement is 1
// (one side, or both, used a single label throughout) or there are no items.
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

// ---------- formatting ----------
const f2 = x => (Number.isNaN(x) ? 'n/a' : x.toFixed(2));
const xofn = (k, n) => `${k} of ${n}`;
const kfmt = k => (Number.isNaN(k) ? 'undefined (no variation in labels)' : k.toFixed(2));
function table(head, rows) {
  const all = [head].concat(rows).map(r => r.map(String));
  const w = head.map((_, i) => Math.max(...all.map(r => (r[i] || '').length)));
  const line = r => '| ' + r.map((c, i) => (c || '').padEnd(w[i])).join(' | ') + ' |';
  return [line(all[0]), '| ' + w.map(x => '-'.repeat(x)).join(' | ') + ' |']
    .concat(all.slice(1).map(line)).join('\n');
}
const lineOf = r => (r && r._line ? `line ${r._line}` : 'a row');

// ---------- shared values (plan section 3) ----------
const READS = {
  'RX-A1': { week: 'RX', version: 'A', order: '1', label: '14 Dec 2020, Version A, first read' },
  'RX-B2': { week: 'RX', version: 'B', order: '2', label: '14 Dec 2020, Version B, second read' },
  'RY-B1': { week: 'RY', version: 'B', order: '1', label: '27 Sep 2021, Version B, first read' },
  'RY-A2': { week: 'RY', version: 'A', order: '2', label: '27 Sep 2021, Version A, second read' },
};
const READ_IDS = Object.keys(READS);
const FIRST_READS = ['RX-A1', 'RY-B1'];
const WEEK_FIRST = { RX: 'RX-A1', RY: 'RY-B1' };
// The ten needs in deliverable-3/ten-need-sheet.md section B order.
const NEED_IDS = ['N01', 'N03', 'N07', 'N08', 'N09', 'N12', 'N17', 'N19', 'N25', 'N26'];
const SE1_WEEKS = ['W1-2021-02-08', 'W2-2021-07-19', 'RX-2020-12-14', 'RY-2021-09-27'];
const CLASSES = ['D', 'P', 'N'];
const RESULTS = ['C', 'PC', 'W', 'NA'];
const CAUSES = ['misread', 'overclaim', 'page-wrong'];
const CODES6 = ['Pass', 'Hedged', 'Over-claim'];

// read_id typed by hand: rx-a1, RXA1 and RX A1 read as RX-A1. Anything else is kept upper case.
function normReadId(s) {
  const t = (s || '').trim().toUpperCase();
  const m = /^(R[XY])[\s_-]*([AB])[\s_-]*([12])$/.exec(t);
  return m ? `${m[1]}-${m[2]}${m[3]}` : t;
}
// need_id: n1, N1 and n01 read as N01.
function normNeedId(s) {
  const t = (s || '').trim().toUpperCase();
  const m = /^N\s*0*(\d+)$/.exec(t);
  return m ? 'N' + m[1].padStart(2, '0') : t;
}
function normVersion(s) {
  const t = (s || '').trim().toLowerCase();
  if (t === 'a' || t.startsWith('base')) return 'A';
  if (t === 'b' || t.startsWith('treat')) return 'B';
  return (s || '').trim();
}
function normCode6(s) {
  const t = (s || '').toLowerCase().replace(/[\s_]+/g, '-');
  if (t === 'pass') return 'Pass';
  if (t === 'hedged') return 'Hedged';
  if (t === 'over-claim' || t === 'overclaim') return 'Over-claim';
  return null;
}
const isYes = s => /^(y|yes|true|1|x)$/i.test((s || '').trim());
const isNo = s => /^(n|no|false|0)$/i.test((s || '').trim());
const intIn = (s, lo, hi) => { const t = (s || '').trim(); if (!/^\d+$/.test(t)) return null; const v = Number(t); return v >= lo && v <= hi ? v : null; };
const num = s => { const t = (s || '').trim(); return t === '' || Number.isNaN(Number(t)) ? null : Number(t); };

// Checks a row's read_id and, when the row also gives them, its week, version and read order.
// Returns the normalised read_id, or null (with a warning) if it is not one of the four reads.
function checkRead(r, warnings, what) {
  const id = normReadId(r.read_id);
  if (!READS[id]) {
    warnings.push(`WARNING: ${what} ${lineOf(r)}: read_id "${r.read_id || ''}" is not RX-A1, RX-B2, RY-B1 or RY-A2. Row left out.`);
    return null;
  }
  const want = READS[id], bad = [];
  if (r.week !== undefined && r.week !== '' && !r.week.toUpperCase().startsWith(want.week)) bad.push(`week "${r.week}"`);
  if (r.version !== undefined && r.version !== '' && normVersion(r.version) !== want.version) bad.push(`version "${r.version}"`);
  if (r.read_order !== undefined && r.read_order !== '' && r.read_order.replace(/^0+/, '') !== want.order) bad.push(`read_order "${r.read_order}"`);
  if (bad.length) warnings.push(`WARNING: ${what} ${lineOf(r)}: ${bad.join(', ')} does not match read_id ${id}. The read_id is used; fix the row.`);
  return id;
}

// ---------- Table A. Fidelity hand-check (SE1) ----------
function normVerdict(s) { const t = (s || '').trim().toUpperCase(); return t === '' ? '' : (['S', 'C', 'U'].includes(t) ? t : null); }

function prepareSE1(rowsIn) {
  const warnings = csvWarnings(rowsIn).slice();
  const seen = {}, rows = [];
  for (const r of rowsIn) {
    const week = (r.week || '').trim().toUpperCase();
    const version = normVersion(r.version);
    const row = intIn(r.row, 1, 9999);
    if (!SE1_WEEKS.includes(week)) { warnings.push(`WARNING: SE1 ${lineOf(r)}: week "${r.week}" is not ${SE1_WEEKS.join(', ')}. Row left out.`); continue; }
    if (version !== 'A' && version !== 'B') { warnings.push(`WARNING: SE1 ${lineOf(r)}: version "${r.version}" is not A or B. Row left out.`); continue; }
    if (row === null) { warnings.push(`WARNING: SE1 ${lineOf(r)}: row "${r.row}" is not a checklist row number. Row left out.`); continue; }
    const v = { week, version, row, line: r._line, minutes: num(r.minutes) };
    for (const [k, col] of [['me', 'raphael_verdict'], ['s1', 'ai_scorer1_verdict'], ['s2', 'ai_scorer2_verdict'], ['re', 'ai_rescore_verdict']]) {
      const x = normVerdict(r[col]);
      if (x === null) { warnings.push(`WARNING: SE1 ${lineOf(r)}: ${col} "${r[col]}" is not S, C or U. Read as blank.`); v[k] = ''; } else v[k] = x;
    }
    v.agreeTyped = (r.agree_with_ai || '').trim().toLowerCase();
    const k = `${week}|${version}|${row}`;
    (seen[k] = seen[k] || []).push(v);
    rows.push(v);
  }
  const dups = Object.keys(seen).filter(k => seen[k].length > 1);
  if (dups.length) warnings.push(`WARNING: SE1 row listed more than once, left out until fixed: ${dups.map(k => k.split('|').join(' ')).join('; ')}.`);
  const used = rows.filter(v => seen[`${v.week}|${v.version}|${v.row}`].length === 1);
  // agree_with_ai is typed by hand; check it against the verdicts
  const mism = [];
  for (const v of used) {
    if (!v.me) continue;
    const ai = [v.s1, v.s2, v.re].filter(Boolean);
    if (!ai.length) continue;
    const want = ai.every(x => x === v.me) ? 'y' : 'n';
    if (v.agreeTyped && v.agreeTyped !== want) mism.push(`${v.week} ${v.version} row ${v.row} (typed ${v.agreeTyped}, verdicts give ${want})`);
  }
  if (mism.length) warnings.push(`WARNING: SE1 agree_with_ai does not match the verdicts: ${mism.join('; ')}. The table uses the verdicts.`);
  return { rows: used, warnings };
}

function tableA(rowsIn) {
  const P = prepareSE1(rowsIn);
  const groups = [];
  for (const w of SE1_WEEKS) for (const ver of ['A', 'B']) {
    const g = P.rows.filter(v => v.week === w && v.version === ver);
    if (!g.length) continue;
    const mine = g.filter(v => v.me);
    const S = mine.filter(v => v.me === 'S').length, C = mine.filter(v => v.me === 'C').length, U = mine.filter(v => v.me === 'U').length;
    const ag = col => { const b = mine.filter(v => v[col]); return { agree: b.filter(v => v[col] === v.me).length, n: b.length }; };
    const mins = g.map(v => v.minutes).filter(x => x !== null);
    groups.push({
      week: w, version: ver, listed: g.length, checked: mine.length, S, C, U,
      // A2: "passes when none is contradicted and 90% are supported" (by Raphael's hand verdicts)
      rule: !mine.length ? 'n/a' : (C === 0 && S * 10 >= 9 * mine.length ? 'met' : 'not met'),
      s1: ag('s1'), s2: ag('s2'), re: ag('re'),
      minutes: mins.length ? mins.reduce((a, b) => a + b, 0) : null,
    });
  }
  const cell = a => (a.n ? xofn(a.agree, a.n) : '–');
  return {
    id: 'A', title: 'Table A. Fidelity check by hand (SE1): Raphael\'s verdicts, and rows where he agrees with each AI scorer (x of n rows both scored)',
    head: ['Week', 'Version', 'Rows listed', 'Hand-checked', 'S', 'C', 'U', 'A2 rule (no C, 90% S)', 'Agree scorer 1', 'Agree scorer 2', 'Agree re-score', 'Minutes'],
    rows: groups.map(g => [g.week, g.version, String(g.listed), String(g.checked), String(g.S), String(g.C), String(g.U), g.rule, cell(g.s1), cell(g.s2), cell(g.re), g.minutes === null ? '' : String(g.minutes)]),
    notes: ['A row with a blank raphael_verdict is listed but not hand-checked. Say in the report which rows were done (D4 minimum: every Version B row and every row an AI scorer marked C).'],
    warnings: P.warnings, groups,
  };
}

// ---------- SE2 need answers (Tables B and C) ----------
function prepareNeeds(rowsIn) {
  const warnings = csvWarnings(rowsIn).slice();
  const rows = [], seen = {};
  for (const r of rowsIn) {
    const read = checkRead(r, warnings, 'need answer');
    if (!read) continue;
    const need = normNeedId(r.need_id);
    if (!NEED_IDS.includes(need)) { warnings.push(`WARNING: need answer ${lineOf(r)}: need_id "${r.need_id}" is not one of the ten (${NEED_IDS.join(', ')}). Row left out.`); continue; }
    const fpn = (r.page_gave_fpn || '').trim().toUpperCase();
    const res = (r.gitlog_result || '').trim().toUpperCase();
    const cause = (r.error_cause || '').trim().toLowerCase();
    const key = (r.key_ru_class || '').trim().toUpperCase();
    const rec = (r.record_could_answer || '').trim().toUpperCase();
    const chg = (r.changed_on_second_read || '').trim().toLowerCase();
    const v = { read, need, line: r._line, fpn, res, cause, key, rec, chg, onlyB: (r.only_in_b || '').trim().toLowerCase(),
      conf: intIn(r.confidence_1to5, 1, 5), seconds: num(r.seconds) };
    const where = `${read} ${need}`;
    if (fpn && !['F', 'P', 'N'].includes(fpn)) { warnings.push(`WARNING: ${where}: page_gave_fpn "${r.page_gave_fpn}" is not F, P or N. Read as blank.`); v.fpn = ''; }
    if (res && !RESULTS.includes(res)) { warnings.push(`WARNING: ${where}: gitlog_result "${r.gitlog_result}" is not C, PC, W or NA. Read as not scored.`); v.res = ''; }
    if (cause && !CAUSES.includes(cause)) { warnings.push(`WARNING: ${where}: error_cause "${r.error_cause}" is not misread, overclaim or page-wrong. Read as blank.`); v.cause = ''; }
    if (v.res === 'W' && !v.cause) warnings.push(`WARNING: ${where}: scored W with no error_cause. Name the cause (misread, overclaim or page-wrong).`);
    if (v.cause && v.res !== 'W') warnings.push(`WARNING: ${where}: error_cause "${v.cause}" on an answer not scored W.`);
    if (key && !CLASSES.includes(key)) { warnings.push(`WARNING: ${where}: key_ru_class "${r.key_ru_class}" is not D, P or N. Read as blank.`); v.key = ''; }
    if (rec && !CLASSES.includes(rec)) { warnings.push(`WARNING: ${where}: record_could_answer "${r.record_could_answer}" is not D, P or N. Read as blank.`); v.rec = ''; }
    if (v.onlyB && !isYes(v.onlyB) && !isNo(v.onlyB)) warnings.push(`WARNING: ${where}: only_in_b "${r.only_in_b}" is not y or n.`);
    if (r.confidence_1to5 && v.conf === null) warnings.push(`WARNING: ${where}: confidence_1to5 "${r.confidence_1to5}" is not 1 to 5. Read as blank.`);
    if (chg && !['new', 'changed', 'lost', 'same'].includes(chg)) warnings.push(`WARNING: ${where}: changed_on_second_read "${r.changed_on_second_read}" is not new, changed, lost or same.`);
    if (chg && FIRST_READS.includes(read)) warnings.push(`WARNING: ${where}: changed_on_second_read is filled on a first read. It belongs on second reads only.`);
    const k = `${read}|${need}`;
    (seen[k] = seen[k] || []).push(v);
    rows.push(v);
  }
  const dups = Object.keys(seen).filter(k => seen[k].length > 1);
  if (dups.length) warnings.push(`WARNING: need answer listed more than once for one read, left out until fixed: ${dups.map(k => k.replace('|', ' ')).join('; ')}.`);
  const used = rows.filter(v => seen[`${v.read}|${v.need}`].length === 1);
  // key_ru_class is fixed before SE2 (plan section 5): one value per need across every read
  const key = {}, rec = {};
  for (const n of NEED_IDS) {
    const ks = Array.from(new Set(used.filter(v => v.need === n && v.key).map(v => v.key)));
    if (ks.length > 1) warnings.push(`WARNING: ${n}: key_ru_class differs between rows (${ks.join(', ')}). The key is fixed before SE2; fix the rows. Shown as "?".`);
    key[n] = ks.length === 1 ? ks[0] : (ks.length ? '?' : '');
    // record_could_answer is per week: one value across both reads of a week
    for (const w of ['RX', 'RY']) {
      const rs = Array.from(new Set(used.filter(v => v.need === n && READS[v.read].week === w && v.rec).map(v => v.rec)));
      if (rs.length > 1) warnings.push(`WARNING: ${n} week ${w}: record_could_answer differs between the two reads (${rs.join(', ')}). It describes the git log of the week; fix the rows. Shown as "?".`);
      rec[`${w}|${n}`] = rs.length === 1 ? rs[0] : (rs.length ? '?' : '');
    }
  }
  return { rows: used, warnings, key, rec };
}

function tableB(rowsIn) {
  const P = prepareNeeds(rowsIn);
  const get = (read, n) => P.rows.find(v => v.read === read && v.need === n);
  const cell = (read, n) => { const v = get(read, n); return !v ? '–' : (v.res || '?'); };
  const grid = NEED_IDS.map(n => [n, P.key[n] || '', cell('RX-A1', n), cell('RX-B2', n), P.rec[`RX|${n}`] || '', cell('RY-B1', n), cell('RY-A2', n), P.rec[`RY|${n}`] || '']);
  const per = READ_IDS.map(read => {
    const mine = P.rows.filter(v => v.read === read);
    const c = x => mine.filter(v => v.res === x).length;
    const w = mine.filter(v => v.res === 'W');
    return {
      read, n: mine.length, C: c('C'), PC: c('PC'), W: c('W'), NA: c('NA'), unscored: mine.filter(v => !v.res).length,
      onlyB: mine.filter(v => isYes(v.onlyB)).length,
      misread: w.filter(v => v.cause === 'misread').length, overclaim: w.filter(v => v.cause === 'overclaim').length,
      pageWrong: w.filter(v => v.cause === 'page-wrong').length, noCause: w.filter(v => !v.cause).length,
    };
  });
  return {
    id: 'B', title: 'Table B. Ten needs by read (SE2): git-log result per need (C correct, PC partly correct, W wrong, NA left blank; ? not scored yet; – no row)',
    head: ['Need', 'Key (R/U)', 'RX-A1', 'RX-B2', 'RX log could answer', 'RY-B1', 'RY-A2', 'RY log could answer'],
    rows: grid,
    summary: {
      title: 'Table B (continued). Per read: correct answers out of the needs answered, answers that needed Version B, wrong answers by cause',
      head: ['Read', 'Correct (C)', 'PC', 'W', 'NA', 'Not scored', 'Needed B (only_in_b)', 'W: misread', 'W: overclaim', 'W: page-wrong', 'W: no cause'],
      rows: per.map(p => [p.read, xofn(p.C, p.n), String(p.PC), String(p.W), String(p.NA), String(p.unscored), String(p.onlyB), String(p.misread), String(p.overclaim), String(p.pageWrong), String(p.noCause)]),
    },
    notes: ['Second reads (RX-B2, RY-A2) record change only and are never clean. Compare RX-A1 with RY-B1 only, and say that this mixes version with week. Never add first and second reads together.',
      'A page-wrong cause goes to the SE1 hand-check.'],
    warnings: P.warnings, per, prepared: P,
  };
}

// Observed class for one need on a first read (plan section 6, Table C), fixed before any data:
//   N = the page gave N, or the answer is W or NA.
//   D = the page gave F and the answer is C.
//   P = the page gave F or P and the answer is C or PC (any other mix of these).
// Returns '' when the answer is not scored or page_gave_fpn is blank.
function observedClass(fpn, res) {
  if (!fpn || !res) return '';
  if (fpn === 'N' || res === 'W' || res === 'NA') return 'N';
  if (fpn === 'F' && res === 'C') return 'D';
  return 'P';
}

function tableC(rowsIn) {
  const P = prepareNeeds(rowsIn);
  const obs = {};
  const overclaims = [];
  for (const w of ['RX', 'RY']) for (const n of NEED_IDS) {
    const v = P.rows.find(x => x.read === WEEK_FIRST[w] && x.need === n);
    obs[`${w}|${n}`] = v ? observedClass(v.fpn, v.res) : '';
    if (v && v.fpn === 'F' && v.res === 'W') overclaims.push(`${WEEK_FIRST[w]} ${n}`);
  }
  const rows = NEED_IDS.map(n => {
    const show = w => { const v = P.rows.find(x => x.read === WEEK_FIRST[w] && x.need === n); return v ? `${obs[`${w}|${n}`] || '?'} (${v.fpn || '-'}/${v.res || '-'})` : '–'; };
    return [n, P.key[n] || '', P.rec[`RX|${n}`] || '', show('RX'), P.rec[`RY|${n}`] || '', show('RY')];
  });
  const pairs = {};
  const compare = (w, fa, fb) => {
    const a = [], b = [];
    for (const n of NEED_IDS) {
      const x = fa(w, n), y = fb(w, n);
      if (CLASSES.includes(x) && CLASSES.includes(y)) { a.push(x); b.push(y); }
    }
    return { ag: agreement(a, b), k: cohenKappa(a, b) };
  };
  const K = (w, n) => P.key[n], R = (w, n) => P.rec[`${w}|${n}`], O = (w, n) => obs[`${w}|${n}`];
  const agreeRows = [];
  for (const w of ['RX', 'RY']) {
    pairs[w] = { keyObs: compare(w, K, O), keyRec: compare(w, K, R), recObs: compare(w, R, O) };
    const c = x => `${xofn(x.ag.agree, x.ag.n)} (kappa ${kfmt(x.k.kappa)})`;
    agreeRows.push([`${w} (${WEEK_FIRST[w]})`, c(pairs[w].keyObs), c(pairs[w].keyRec), c(pairs[w].recObs)]);
  }
  return {
    id: 'C', title: 'Table C. Key against observed (SQ1, first reads only): the key\'s R/U class, what the git log could answer, and the observed class (page gave / git-log result)',
    head: ['Need', 'Key (R/U)', 'RX log', 'RX observed', 'RY log', 'RY observed'],
    rows,
    summary: {
      title: 'Table C (continued). Agreement per week, needs in agreement out of needs with both labels. Kappa (Cohen, 1960) is indicative only: with ten needs it is unstable',
      head: ['Week', 'Key against observed', 'Key against log', 'Log against observed (what the page lost from the records)'],
      rows: agreeRows,
    },
    notes: ['Observed class, fixed before SE2: N = page gave N, or the answer is W or NA; D = page gave F and the answer is C; P = any other mix of F or P with C or PC.',
      `Over-claims (page gave F, answer W): ${overclaims.length ? overclaims.join(', ') : 'none'}.`],
    warnings: P.warnings, obs, pairs, overclaims,
  };
}

// ---------- Table D. Items (SE2, only if the reserve items exist) ----------
function prepareItems(rowsIn) {
  const warnings = csvWarnings(rowsIn).slice();
  const rows = [], seen = {};
  for (const r of rowsIn) {
    const read = checkRead(r, warnings, 'item');
    if (!read) continue;
    const it = (r.item || '').trim();
    if (!/^0*[1-6]$/.test(it)) { warnings.push(`WARNING: item ${lineOf(r)}: item "${r.item}" is not 1 to 6. Row left out.`); continue; }
    const item = String(parseInt(it, 10));
    const raw = (r.score || '').trim();
    const v = { read, item, level: (r.level || '').trim().toUpperCase(), conf: intIn(r.confidence_1to5, 1, 5), seconds: num(r.seconds),
      specific: (r.specific || '').trim(), chg: (r.changed_on_second_read || '').trim().toLowerCase(), raw };
    if (item === '6') {
      v.code6 = raw === '' ? '' : normCode6(raw);
      if (v.code6 === null) { warnings.push(`WARNING: ${read} item 6: "${raw}" is not Pass, Hedged or Over-claim. Read as not scored.`); v.code6 = ''; }
    } else {
      v.score = raw === '' ? null : (/^[012]$/.test(raw) ? Number(raw) : NaN);
      if (Number.isNaN(v.score)) { warnings.push(`WARNING: ${read} item ${item}: score "${raw}" is not 0, 1 or 2. Read as not scored.`); v.score = null; }
    }
    if (v.level && !['L1', 'L2', 'L3', 'U'].includes(v.level)) warnings.push(`WARNING: ${read} item ${item}: level "${r.level}" is not L1, L2, L3 or U.`);
    const k = `${read}|${item}`;
    (seen[k] = seen[k] || []).push(v);
    rows.push(v);
  }
  const dups = Object.keys(seen).filter(k => seen[k].length > 1);
  if (dups.length) warnings.push(`WARNING: item listed more than once for one read, left out until fixed: ${dups.map(k => k.replace('|', ' item ')).join('; ')}.`);
  return { rows: rows.filter(v => seen[`${v.read}|${v.item}`].length === 1), warnings };
}

function tableD(rowsIn) {
  const P = prepareItems(rowsIn);
  const get = (read, it) => P.rows.find(v => v.read === read && v.item === it);
  const rows = ['1', '2', '3', '4', '5', '6'].map(it => {
    const lv = Array.from(new Set(P.rows.filter(v => v.item === it && v.level).map(v => v.level)));
    return [it, lv.join('/')].concat(READ_IDS.map(read => {
      const v = get(read, it);
      if (!v) return '–';
      return it === '6' ? (v.code6 || '?') : (v.score === null ? '?' : String(v.score));
    }));
  });
  const tot = READ_IDS.map(read => {
    const s = ['1', '2', '3', '4', '5'].map(it => get(read, it)).filter(v => v && v.score !== null);
    return s.length === 5 ? `${s.reduce((a, v) => a + v.score, 0)} of 10` : `${s.length} of 5 scored`;
  });
  rows.push(['1-5', 'total'].concat(tot));
  const spec = READ_IDS.map(read => {
    const s = ['4', '5'].map(it => get(read, it)).filter(v => v && v.specific);
    return s.length ? xofn(s.filter(v => isYes(v.specific)).length, s.length) : '–';
  });
  rows.push(['4-5', 'specific (y)'].concat(spec));
  return {
    id: 'D', title: 'Table D. Items per read (SE2, SQ2): items 1-5 scored 0, 1 or 2; item 6 coded Pass, Hedged or Over-claim',
    head: ['Item', 'Level', 'RX-A1', 'RX-B2', 'RY-B1', 'RY-A2'], rows,
    notes: ['Second reads record change only. Never add first and second reads together.'],
    warnings: P.warnings,
  };
}

// ---------- Table H and the figure: reads ----------
function hhmm(s) { const m = /^(\d{1,2}):(\d{2})$/.exec((s || '').trim()); return m ? Number(m[1]) * 60 + Number(m[2]) : null; }

function prepareReads(rowsIn) {
  const warnings = csvWarnings(rowsIn).slice();
  const rows = [], seen = {};
  for (const r of rowsIn) {
    const read = checkRead(r, warnings, 'read');
    if (!read) continue;
    const v = { read, line: r._line, date: (r.date || '').trim(), seen: (r.seen_before || '').trim().toLowerCase(), why: (r.rating_why || '').trim(),
      interruptions: (r.interruptions || '').trim(), note: (r.note || '').trim() };
    for (const k of ['ease_1to5', 'useful_1to5', 'would_send_1to5']) {
      v[k] = intIn(r[k], 1, 5);
      if (r[k] && v[k] === null) warnings.push(`WARNING: ${read}: ${k} "${r[k]}" is not 1 to 5. Read as blank.`);
    }
    if (v.seen && !['y', 'n', 'unsure'].includes(v.seen)) warnings.push(`WARNING: ${read}: seen_before "${r.seen_before}" is not y, n or unsure.`);
    const parts = ['minutes_items', 'minutes_needs', 'minutes_standup'].map(k => num(r[k]));
    const st = hhmm(r.start_time), en = hhmm(r.end_time);
    v.parts = parts;
    if (parts.some(x => x !== null)) v.minutes = parts.reduce((a, x) => a + (x || 0), 0);
    else if (st !== null && en !== null) v.minutes = en >= st ? en - st : en + 1440 - st;
    else v.minutes = null;
    v.standup = ['standup_s', 'standup_c', 'standup_u'].map(k => num(r[k]));
    const first = FIRST_READS.includes(read);
    if (!first && (v.standup.some(x => x !== null) || num(r.minutes_standup) !== null)) warnings.push(`WARNING: ${read}: stand-up columns are filled on a second read. The stand-up draft is written on first reads only.`);
    (seen[read] = seen[read] || []).push(v);
    rows.push(v);
  }
  const dups = Object.keys(seen).filter(k => seen[k].length > 1);
  if (dups.length) warnings.push(`WARNING: read listed more than once, left out until fixed: ${dups.join(', ')}.`);
  return { rows: rows.filter(v => seen[v.read].length === 1), warnings };
}

function tableH(rowsIn) {
  const P = prepareReads(rowsIn);
  const s = x => (x === null || x === undefined ? '' : String(x));
  return {
    id: 'H', title: 'Table H. Ratings and stand-up per read (SE2): ratings 1 (low) to 5 (high), written before scoring; one reader\'s opinion',
    head: ['Read', 'Date', 'Seen before', 'Minutes', 'Ease', 'Useful', 'Would send', 'Why', 'Stand-up S', 'Stand-up C', 'Stand-up U'],
    rows: READ_IDS.map(read => {
      const v = P.rows.find(x => x.read === read);
      if (!v) return [read, '–', '', '', '', '', '', '', '', '', ''];
      return [read, v.date, v.seen, s(v.minutes), s(v.ease_1to5), s(v.useful_1to5), s(v.would_send_1to5), v.why.replace(/\|/g, '/')].concat(v.standup.map(s));
    }),
    notes: ['Stand-up claims are checked against the git log on first reads only (S supported, C contradicted, U unclear).'],
    warnings: P.warnings,
  };
}

// Data for the time-and-confidence figure: minutes per read, and need answers counted by confidence (1-5)
// and git-log result. High-confidence wrong answers are confidence 4 or 5 scored W.
function timeConfidence(readRows, needRows) {
  const R = readRows ? prepareReads(readRows) : { rows: [], warnings: [] };
  const N = needRows ? prepareNeeds(needRows) : { rows: [], warnings: [] };
  const reads = READ_IDS.map(read => { const v = R.rows.find(x => x.read === read); return { read, first: FIRST_READS.includes(read), minutes: v ? v.minutes : null }; });
  const grid = {};
  RESULTS.forEach(res => { grid[res] = [0, 0, 0, 0, 0]; });
  let n = 0;
  N.rows.forEach(v => { if (v.conf !== null && RESULTS.includes(v.res)) { grid[v.res][v.conf - 1]++; n++; } });
  const highWrong = grid.W[3] + grid.W[4];
  return { reads, grid, n, highWrong, warnings: R.warnings.concat(N.warnings) };
}

function tableTime(readRows, needRows) {
  const T = timeConfidence(readRows, needRows);
  return {
    id: 'T', title: 'Figure data. Minutes per read, and need answers by confidence (1 a guess to 5 certain) and git-log result',
    head: ['Result', 'Conf 1', 'Conf 2', 'Conf 3', 'Conf 4', 'Conf 5'],
    rows: RESULTS.map(res => [res].concat(T.grid[res].map(String))),
    notes: ['Minutes per read: ' + T.reads.map(r => `${r.read} ${r.minutes === null ? 'n/a' : r.minutes}`).join('; ') + '.',
      `Answers with a confidence and a result: ${T.n}. Wrong at confidence 4 or 5: ${T.highWrong}.`],
    warnings: T.warnings, data: T,
  };
}

// ---------- Table E. Cognitive walkthrough (SE3) ----------
function tableE(rowsIn) {
  const warnings = csvWarnings(rowsIn).slice();
  const rows = [];
  const seen = {};
  for (const r of rowsIn) {
    const task = (r.task_id || '').trim().toUpperCase();
    if (!/^CW[1-5]$/.test(task)) { warnings.push(`WARNING: SE3 ${lineOf(r)}: task_id "${r.task_id}" is not CW1 to CW5. Row left out.`); continue; }
    const k = `${task}|${(r.step_no || '').trim()}`;
    if (seen[k]) { warnings.push(`WARNING: SE3 ${task} step ${r.step_no}: listed more than once. Second row left out.`); continue; }
    seen[k] = true;
    const q = ['q1_right_effect', 'q2_notice_action', 'q3_associate_action', 'q4_see_progress'].map(c => {
      const t = (r[c] || '').trim().toUpperCase();
      if (t !== 'Y' && t !== 'N') { if (t || r.correct_action) warnings.push(`WARNING: SE3 ${task} step ${r.step_no}: ${c} "${r[c]}" is not Y or N.`); return ''; }
      return t;
    });
    const sev = intIn(r.severity_0to4, 0, 4);
    const fail = q.includes('N');
    if (fail && !(r.failure_story || '').trim()) warnings.push(`WARNING: SE3 ${task} step ${r.step_no}: an N answer with no failure story.`);
    if (fail && sev === null) warnings.push(`WARNING: SE3 ${task} step ${r.step_no}: an N answer with no severity 0 to 4.`);
    rows.push({ task, q, sev, fail });
  }
  const tasks = ['CW1', 'CW2', 'CW3', 'CW4', 'CW5'];
  const out = tasks.map(t => {
    const s = rows.filter(v => v.task === t);
    const sevs = [0, 1, 2, 3, 4].map(x => s.filter(v => v.fail && v.sev === x).length);
    return [t, String(s.length)].concat([0, 1, 2, 3].map(i => String(s.filter(v => v.q[i] === 'N').length)), [String(s.filter(v => v.fail).length)], sevs.map(String));
  });
  const all = rows;
  out.push(['All', String(all.length)].concat([0, 1, 2, 3].map(i => String(all.filter(v => v.q[i] === 'N').length)), [String(all.filter(v => v.fail).length)],
    [0, 1, 2, 3, 4].map(x => String(all.filter(v => v.fail && v.sev === x).length))));
  return {
    id: 'E', title: 'Table E. Cognitive walkthrough of the Producer Page window (SE3; Wharton et al., 1994): N answers per question and failure stories by severity',
    head: ['Task', 'Steps', 'Q1 N', 'Q2 N', 'Q3 N', 'Q4 N', 'Steps failing', 'Sev 0', 'Sev 1', 'Sev 2', 'Sev 3', 'Sev 4'],
    rows: out,
    notes: ['One evaluator, who built the tool. The walkthrough is usually a group method.'],
    warnings,
  };
}

// ---------- Table F. Heuristic problems (SE4), beside D1 ----------
const HEURISTICS = ['H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'H7', 'H8', 'H9', 'H10'];
function prepareProblems(rowsIn, who) {
  const warnings = csvWarnings(rowsIn).slice();
  const rows = [], seen = {};
  for (const r of rowsIn) {
    const tool = who || (r.tool || '').trim();
    const id = (r.id || '').trim().toUpperCase();
    const h = (r.heuristic || '').trim().toUpperCase();
    const sev = intIn(r.severity_0to4, 0, 4);
    const where = `${who ? 'SE4' : 'D1'} ${tool ? tool + ' ' : ''}${id || lineOf(r)}`;
    if (!who && !tool) { warnings.push(`WARNING: D1 ${lineOf(r)}: blank tool. Row left out.`); continue; }
    if (!HEURISTICS.includes(h)) warnings.push(`WARNING: ${where}: heuristic "${r.heuristic}" is not H1 to H10.`);
    if (sev === null) { warnings.push(`WARNING: ${where}: severity "${r.severity_0to4}" is not 0 to 4. Row left out of the severity counts.`); }
    const k = `${tool}|${id}`;
    if (id && seen[k]) { warnings.push(`WARNING: ${where}: id listed more than once. Second row left out.`); continue; }
    seen[k] = true;
    rows.push({ tool, id, h, sev, checked: isYes(r.raphael_checked_yn) });
  }
  return { rows, warnings };
}

function tableF(heurRows, taskRows, d1Rows, d1TaskRows) {
  const warnings = [];
  const CL = heurRows ? prepareProblems(heurRows, 'ChangeLens') : { rows: [], warnings: [] };
  const D1 = d1Rows ? prepareProblems(d1Rows, null) : { rows: [], warnings: [] };
  warnings.push(...CL.warnings, ...D1.warnings);
  const tools = ['ChangeLens'].concat(Array.from(new Set(D1.rows.map(v => v.tool))));
  const all = CL.rows.concat(D1.rows);
  const cell = (tool, f) => {
    const s = all.filter(v => v.tool === tool && f(v));
    if (tool === 'ChangeLens') return String(s.length);
    return `${s.length} (${s.filter(v => v.checked).length} checked)`;
  };
  const sevRows = [0, 1, 2, 3, 4].map(x => [`Severity ${x}`].concat(tools.map(t => cell(t, v => v.sev === x))));
  sevRows.push(['Total'].concat(tools.map(t => cell(t, () => true))));
  const hRows = HEURISTICS.map(h => [h].concat(tools.map(t => cell(t, v => v.h === h))));
  // task outcomes T1 to T7
  const tOut = {};
  const tWarn = [];
  const addTasks = (rowsIn, who) => {
    tWarn.push(...csvWarnings(rowsIn));
    for (const r of rowsIn) {
      const tool = who || (r.tool || '').trim();
      const task = (r.task || '').trim().toUpperCase();
      if (!/^T[1-7]$/.test(task)) { tWarn.push(`WARNING: task outcome ${lineOf(r)}: task "${r.task}" is not T1 to T7. Row left out.`); continue; }
      const c = (r.completed || '').trim();
      const cv = /^y(es)?$/i.test(c) ? 'Y' : /^n(o)?$/i.test(c) ? 'N' : /^partly$/i.test(c) ? 'partly' : c;
      if (!['Y', 'N', 'partly'].includes(cv)) tWarn.push(`WARNING: task outcome ${tool} ${task}: completed "${c}" is not Y, partly or N (D1's values). Kept as typed.`);
      const sec = num(r.seconds);
      tOut[`${tool}|${task}`] = cv + (who && sec !== null ? ` (${sec} s)` : '');
    }
  };
  if (taskRows) addTasks(taskRows, 'ChangeLens');
  if (d1TaskRows) addTasks(d1TaskRows, null);
  warnings.push(...tWarn);
  const tTools = ['ChangeLens'].concat(Array.from(new Set(Object.keys(tOut).map(k => k.split('|')[0]).filter(t => t !== 'ChangeLens'))));
  const taskTable = ['T1', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'].map(t => [t].concat(tTools.map(tool => tOut[`${tool}|${t}`] || '–')));
  return {
    id: 'F', title: 'Table F. Heuristic problems by severity (SE4; Nielsen, 1994, on the D1 scale): ChangeLens beside the D1 tools',
    head: ['Severity'].concat(tools), rows: sevRows,
    extra: [
      { title: 'Table F (continued). Problems by primary heuristic', head: ['Heuristic'].concat(tools), rows: hRows },
      { title: 'Table F (continued). Tasks T1 to T7: completed Y, partly or N', head: ['Task'].concat(tTools), rows: taskTable },
    ],
    notes: ['D1\'s pass was run by an AI evaluator. Use a D1 rating only where Raphael has checked it ("checked"), and say which.',
      'One evaluator found the ChangeLens problems, and he built the tool (Nielsen & Molich, 1990; Hertzum & Jacobsen, 2001).'],
    warnings,
  };
}

// ---------- Table G. Needs log (SE2), D5 coding layout ----------
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

function prepareLog(rowsIn) {
  const warnings = csvWarnings(rowsIn).slice();
  const count = {};
  rowsIn.forEach(r => { const s = (r.segment_id || '').trim(); count[s] = (count[s] || 0) + 1; });
  const dup = Object.keys(count).filter(s => s && count[s] > 1).sort();
  if (dup.length) warnings.push(`WARNING: needs-log segment_id used on more than one row, left out until fixed: ${dup.join(', ')}. deliverable-5/recode-sample.js stops on this too.`);
  const rows = [];
  const others = new Set(), badCond = [], badCode = [];
  for (const r of rowsIn) {
    const seg = (r.segment_id || '').trim();
    if (!seg) { warnings.push(`WARNING: needs log ${lineOf(r)}: blank segment_id. Row left out.`); continue; }
    if (count[seg] > 1) continue;
    const p = (r.participant || '').trim().toUpperCase();
    if (p !== 'SELF') others.add(r.participant || '(blank)');
    const cond = normReadId(r.report_condition);
    if (!READS[cond]) badCond.push(`${seg} ("${r.report_condition || ''}")`);
    const v = { seg, cond: READS[cond] ? cond : '', p1: (r.pass1_code || '').trim().toLowerCase(), p2: (r.pass2_code || '').trim().toLowerCase(), fin: (r.final_code || '').trim().toLowerCase() };
    for (const [k, name] of [['p1', 'pass 1'], ['p2', 'pass 2'], ['fin', 'final']]) if (v[k] && !inCodebook(v[k])) badCode.push(`${seg} ${name} "${v[k]}"`);
    rows.push(v);
  }
  if (others.size) warnings.push(`WARNING: needs-log participant is not SELF: ${Array.from(others).sort().join(', ')}. The solo study has one participant code, SELF. Rows kept; fix the code.`);
  if (badCond.length) warnings.push(`WARNING: needs-log report_condition is not a read_id (RX-A1, RX-B2, RY-B1, RY-A2): ${badCond.join('; ')}. Counted in the total only.`);
  if (badCode.length) warnings.push(`WARNING: code not in the codebook (the 21 Ko et al. types, none, other, unclear): ${badCode.join('; ')}. Pass 1 / pass 2 pairs with such a code are left out of agreement until fixed.`);
  return { rows, warnings };
}

function tableG(rowsIn) {
  const P = prepareLog(rowsIn);
  const cnt = {}, byRead = {};
  let resolved = 0;
  P.rows.forEach(v => {
    const c = v.fin || v.p1;
    if (v.fin) resolved++;
    if (!c) return;
    cnt[c] = (cnt[c] || 0) + 1;
    const k = `${c}|${v.cond}`;
    byRead[k] = (byRead[k] || 0) + 1;
  });
  const codes = Object.keys(cnt).sort((p, q) => cnt[q] - cnt[p] || p.localeCompare(q));
  const rows = codes.map(c => {
    const t = KO_TYPES[c] || EXTRA_CODES[c] || ['NOT IN CODEBOOK: check the sheet', ''];
    return [c, t[0], t[1]].concat(READ_IDS.map(r => String(byRead[`${c}|${r}`] || 0)), [String(cnt[c])]);
  });
  const total = codes.reduce((a, c) => a + cnt[c], 0);
  const coded = P.rows.filter(v => v.p1);
  const recoded = coded.filter(v => v.p2);
  const both = recoded.filter(v => inCodebook(v.p1) && inCodebook(v.p2));
  const ag = agreement(both.map(v => v.p1), both.map(v => v.p2));
  const differ = both.filter(v => v.p1 !== v.p2).map(v => `${v.seg} (${v.p1} / ${v.p2})`);
  const never = Object.keys(KO_TYPES).filter(c => !cnt[c]);
  return {
    id: 'G', title: `Table G. What the page left unmet (SE2 needs log): entries by Ko et al. (2007) information type (final code after resolution, else pass 1; ${resolved} with a final code; ${total} entries)`,
    head: ['Code', 'Category', 'Information type'].concat(READ_IDS, ['Total']), rows,
    notes: [`Types never coded: ${never.length ? never.join(', ') : 'none'}.`,
      `Entries with pass 1: ${coded.length}. Re-coded blind in pass 2: ${recoded.length}. Pass 1 against pass 2: ${xofn(ag.agree, ag.n)} in agreement` +
        (recoded.length > both.length ? ` (${recoded.length - both.length} pair(s) left out for a code not in the codebook)` : '') + '. No kappa: with a handful of re-coded lines and 24 codes it would mean nothing.',
      `Entries where the passes differ: ${differ.length ? differ.join('; ') : 'none'}.`,
      'The log holds typed notes written alone after reading, not spoken think-aloud comments.'],
    warnings: P.warnings, agreement: ag, counts: cnt,
  };
}

// ---------- Scoring check (optional AI second scorer) ----------
function scoringCheck(needRows, itemRows, s2Rows) {
  const warnings = csvWarnings(s2Rows).map(w => 'Second-scorer file: ' + w);
  const N = needRows ? prepareNeeds(needRows) : { rows: [] };
  const I = itemRows ? prepareItems(itemRows) : { rows: [] };
  const res = { need: { agree: 0, n: 0 }, item: { agree: 0, n: 0 } }, differ = [], noMatch = [], scorers = new Set();
  const seen = {};
  for (const r of s2Rows) {
    const read = checkRead(r, warnings, 'second scorer');
    if (!read) continue;
    const kind = (r.kind || '').trim().toLowerCase();
    if (kind !== 'need' && kind !== 'item') { warnings.push(`WARNING: second scorer ${lineOf(r)}: kind "${r.kind}" is not need or item. Row left out.`); continue; }
    const id = kind === 'need' ? normNeedId(r.id) : String(parseInt((r.id || '').trim(), 10));
    const k = `${read}|${kind}|${id}`;
    if (seen[k]) { warnings.push(`WARNING: second scorer ${read} ${kind} ${id}: listed more than once. Second row left out.`); continue; }
    seen[k] = true;
    if ((r.scorer || '').trim()) scorers.add(r.scorer.trim());
    let mine = null, theirs = (r.score || '').trim();
    if (kind === 'need') {
      const v = N.rows.find(x => x.read === read && x.need === id);
      mine = v && v.res ? v.res : null;
      theirs = theirs.toUpperCase();
    } else {
      const v = I.rows.find(x => x.read === read && x.item === id);
      if (v) mine = id === '6' ? (v.code6 || null) : (v.score === null ? null : String(v.score));
      if (id === '6') theirs = normCode6(theirs) || theirs;
    }
    if (mine === null) { noMatch.push(`${read} ${kind} ${id}`); continue; }
    res[kind].n++;
    if (mine === theirs) res[kind].agree++; else differ.push([read, kind, id, mine, theirs]);
  }
  if (noMatch.length) warnings.push(`WARNING: second-scorer rows with no scored answer of Raphael's to compare, left out: ${noMatch.join('; ')}.`);
  return {
    id: 'S', title: 'Scoring check. AI second scorer against Raphael\'s scores (answers in agreement out of answers scored)',
    head: ['Read', 'Kind', 'Id', 'Raphael', 'Second scorer'], rows: differ,
    notes: [`Scorer: ${scorers.size ? Array.from(scorers).join(', ') : 'not named'}. Need answers in agreement: ${xofn(res.need.agree, res.need.n)}. Item answers in agreement: ${xofn(res.item.agree, res.item.n)}.`,
      'Disclose the AI second scorer in the GenAI statement. The table lists only the answers where the two differ.'],
    warnings, result: res,
  };
}

// ---------- output ----------
function render(t, fmt) {
  fmt = fmt || table;
  const out = [`\n### ${t.title}\n`];
  out.push(t.rows.length ? fmt(t.head, t.rows) : 'No rows.');
  if (t.summary) out.push(`\n**${t.summary.title}**\n`, fmt(t.summary.head, t.summary.rows));
  (t.extra || []).forEach(x => out.push(`\n**${x.title}**\n`, fmt(x.head, x.rows)));
  if (t.notes && t.notes.length) out.push('', t.notes.join('\n'));
  if (t.warnings && t.warnings.length) out.push('', t.warnings.join('\n'));
  return out.join('\n');
}

function args(argv) {
  const o = {};
  for (let i = 0; i < argv.length; i++) if (argv[i].startsWith('--')) o[argv[i].slice(2)] = argv[++i];
  return o;
}

const INPUTS = {
  se1: 'sample-se1-fidelity-handcheck.csv', reads: 'sample-se2-reads.csv', needs: 'sample-se2-need-answers.csv',
  items: 'sample-se2-item-scores.csv', log: 'sample-se2-needs-log.csv', scorer2: 'sample-se2-second-scorer.csv',
  walk: 'sample-se3-walkthrough.csv', heur: 'sample-se4-heuristic-problems.csv', tasks: 'sample-se4-task-outcomes.csv',
  d1: 'sample-d1-problems.csv', d1tasks: 'sample-d1-task-outcomes.csv',
};
// Input files from the command line, or every FAKE sample when none is given.
function inputFiles(a, dir) {
  const useSample = !Object.keys(INPUTS).some(k => a[k]);
  const f = {};
  for (const k of Object.keys(INPUTS)) f[k] = a[k] || (useSample ? path.join(dir, INPUTS[k]) : null);
  return f;
}
const isFake = f => Object.values(f).some(x => x && path.basename(x).startsWith('sample-'));

function buildAll(f) {
  const rd = k => (f[k] ? readCSV(f[k]) : null);
  const d = {};
  for (const k of Object.keys(INPUTS)) d[k] = rd(k);
  const t = [];
  if (d.se1) t.push(tableA(d.se1));
  if (d.needs) { t.push(tableB(d.needs)); t.push(tableC(d.needs)); }
  if (d.items) t.push(tableD(d.items));
  if (d.reads || d.needs) t.push(tableTime(d.reads, d.needs));
  if (d.walk) t.push(tableE(d.walk));
  if (d.heur || d.tasks) t.push(tableF(d.heur, d.tasks, d.d1, d.d1tasks));
  if (d.log) t.push(tableG(d.log));
  if (d.reads) t.push(tableH(d.reads));
  if (d.scorer2) {
    if (d.needs || d.items) t.push(scoringCheck(d.needs, d.items, d.scorer2));
    else t.push({ id: 'S', title: 'Scoring check', head: [], rows: [], notes: ['Needs --needs or --items beside --scorer2; skipped.'] });
  }
  return t;
}

const FOOTER = 'One reader, the developer. Raw counts only, no p-values. These tables show what the page holds and where it fails for this reader, not how producers would do.';

function main() {
  const a = args(process.argv.slice(2));
  const f = inputFiles(a, __dirname);
  const out = ['# ChangeLens solo evaluation analysis'];
  if (isFake(f)) out.push('\n**FAKE DATA: one or more inputs are sample-*.csv files. Nothing below is a result.**');
  out.push('\nInputs: ' + Object.entries(f).filter(([, v]) => v).map(([k, v]) => `${k}=${path.basename(v)}`).join(', '));
  buildAll(f).forEach(t => out.push(render(t)));
  out.push('\n---\n' + FOOTER);
  const text = out.join('\n') + '\n';
  if (a.out) fs.writeFileSync(a.out, text);
  process.stdout.write(text);
}

module.exports = {
  parseCSV, readCSV, agreement, cohenKappa, table, render, f2,
  READS, READ_IDS, FIRST_READS, NEED_IDS, SE1_WEEKS, KO_TYPES, EXTRA_CODES, inCodebook,
  normReadId, normNeedId, observedClass,
  prepareSE1, prepareNeeds, prepareItems, prepareReads, prepareLog,
  tableA, tableB, tableC, tableD, tableE, tableF, tableG, tableH, tableTime, timeConfidence, scoringCheck,
  INPUTS, inputFiles, isFake, buildAll, FOOTER,
};
if (require.main === module) main();
