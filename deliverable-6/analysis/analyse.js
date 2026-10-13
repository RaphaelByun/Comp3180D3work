#!/usr/bin/env node
'use strict';
/*
 * ChangeLens evaluation analysis (COMP3180 A3, Deliverable 6).
 * Plain Node.js, no dependencies.
 *
 * Usage:
 *   node analyse.js                       (runs on the FAKE sample-*.csv files beside this script)
 *   node analyse.js --scores item-scores.csv --needs need-classifications.csv \
 *                   --key marking-key.csv --codes think-aloud-codes.csv [--out results.md]
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
 */

const fs = require('fs');
const path = require('path');

// ---------- CSV ----------
function parseCSV(text) {
  text = text.replace(/^﻿/, '');
  const rows = [];
  let row = [], cell = '', inQ = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (inQ) {
      if (c === '"') {
        if (text[i + 1] === '"') { cell += '"'; i++; } else inQ = false;
      } else cell += c;
    } else if (c === '"') inQ = true;
    else if (c === ',') { row.push(cell); cell = ''; }
    else if (c === '\n' || c === '\r') {
      if (c === '\r' && text[i + 1] === '\n') i++;
      row.push(cell); cell = '';
      rows.push(row); row = [];
    } else cell += c;
  }
  if (cell !== '' || row.length) { row.push(cell); rows.push(row); }
  const clean = rows.filter(r => !(r.length === 1 && r[0].trim() === '') && !(r[0] || '').trim().startsWith('#'));
  if (!clean.length) return [];
  const head = clean[0].map(h => h.trim().toLowerCase());
  return clean.slice(1).map(r => {
    const o = {};
    head.forEach((h, i) => { o[h] = (r[i] === undefined ? '' : r[i]).trim(); });
    return o;
  });
}

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

function analyseScores(rowsAll) {
  const out = [];
  const pilotRows = rowsAll.filter(isPilot);
  const rows = rowsAll.filter(r => !isPilot(r)).map(r => {
    const item = String(parseInt(r.item, 10));
    return {
      participant: r.participant, role: r.role || '', cond: normCond(r.condition),
      week: r.week, order: r.order, item,
      // items 1-5: number 0, 1 or 2. item 6: a category word, never a number.
      score: item === '6' ? null : (r.score === '' ? NaN : Number(r.score)),
      code6: item === '6' ? normCode6(r.score) : null,
      specific: (r.specific || '').trim(),
    };
  });
  out.push(`Rows read: ${rowsAll.length}; pilot rows excluded: ${pilotRows.length}; analysed: ${rows.length}.`);
  const bad = rows.filter(r => r.item !== '6' && (Number.isNaN(r.score) || ![0, 1, 2].includes(r.score)));
  if (bad.length) out.push(`WARNING: ${bad.length} row(s) for items 1-5 with a score that is not 0, 1 or 2.`);
  const bad6 = rows.filter(r => r.item === '6' && !r.code6);
  if (bad6.length) out.push(`WARNING: ${bad6.length} row(s) for item 6 not coded Pass, Hedged or Over-claim.`);

  const SCORED = ['1', '2', '3', '4', '5'];
  const conds = ['baseline', 'treatment'];
  const weeks = Array.from(new Set(rows.map(r => r.week))).sort();
  const people = Array.from(new Set(rows.map(r => r.participant))).sort();
  const sel = f => rows.filter(f);

  function cellStats(list) {
    // list: score rows for one scored item -> n, full marks (2), mean score 0-2
    const n = list.length, full = list.filter(r => r.score === 2).length;
    return { n, full, mean: mean(list.map(r => r.score)) };
  }

  // 1a. per condition, per item (items 1-5)
  out.push('\n### Item scores by condition (full-mark count / readers, mean score 0-2)\n');
  const t1 = [];
  for (const it of SCORED) {
    const row = [it];
    for (const c of conds) {
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
    for (const w of weeks) for (const c of conds) {
      const s = cellStats(sel(r => r.week === w && r.cond === c && r.item === it));
      row.push(`${s.full}/${s.n}`);
    }
    t2.push(row);
  }
  const head2 = ['Item'];
  for (const w of weeks) for (const c of conds) head2.push(`${w} ${c}`);
  out.push(table(head2, t2));

  // 1c. item 6: category counts per version, never a number
  out.push('\n### Item 6 (unanswerable): category counts per version\n');
  const t6 = CODES6.map(code => [code].concat(conds.map(c => {
    const all = sel(r => r.cond === c && r.item === '6');
    return `${all.filter(r => r.code6 === code).length}/${all.length}`;
  })));
  out.push(table(['Code', 'Baseline', 'Treatment'], t6));
  out.push('\nItem 6 is answerable only by saying the report does not tell you. Over-claim is the count that matters; Hedged is shown beside it, not merged. It is not part of the /10 total.');

  // 1d. optional specificity tick (items 4 and 5): descriptive only
  const specRows = rows.filter(r => (r.item === '4' || r.item === '5') && r.specific !== '');
  if (specRows.length) {
    out.push('\n### Specificity tick on items 4 and 5 (answer used a name only Version B shows; descriptive, not scored)\n');
    const ts = ['4', '5'].map(it => [it].concat(conds.map(c => {
      const all = specRows.filter(r => r.cond === c && r.item === it);
      return `${all.filter(r => isTick(r.specific)).length}/${all.length}`;
    })));
    out.push(table(['Item', 'Baseline ticked', 'Treatment ticked'], ts));
  }

  // per participant x condition totals (items 1-5, out of 10)
  const tot = {}; // tot[p][cond] = {sum, items, week, order, role}
  for (const r of rows) {
    if (!SCORED.includes(r.item)) continue;
    tot[r.participant] = tot[r.participant] || {};
    const t = tot[r.participant][r.cond] = tot[r.participant][r.cond] || { sum: 0, items: 0, week: r.week, order: r.order, role: r.role };
    t.sum += r.score; t.items++;
  }

  // 2. paired differences
  out.push('\n### Paired difference per reader (treatment minus baseline, summed over items 1-5; each report is out of 10, so the difference runs from -10 to +10)\n');
  const diffs = [], t3 = [];
  const incomplete = [];
  for (const p of people) {
    const b = tot[p] && tot[p].baseline, t = tot[p] && tot[p].treatment;
    if (!b || !t) { incomplete.push(p); continue; }
    if (b.items !== 5 || t.items !== 5) incomplete.push(`${p} (items scored: baseline ${b.items}, treatment ${t.items})`);
    const d = t.sum - b.sum;
    diffs.push({ p, d, role: b.role || t.role });
    t3.push([p, b.role || t.role || '', `${b.week} (order ${b.order})`, f2(b.sum), `${t.week} (order ${t.order})`, f2(t.sum), (d > 0 ? '+' : '') + f2(d)]);
  }
  out.push(table(['Reader', 'Role', 'Baseline week', 'Baseline /10', 'Treatment week', 'Treatment /10', 'Difference'], t3));
  if (incomplete.length) out.push(`\nWARNING: incomplete or odd readers: ${incomplete.join('; ')}`);
  const ds = diffs.map(x => x.d);
  if (ds.length) {
    const up = ds.filter(x => x > 0).length, dn = ds.filter(x => x < 0).length, z = ds.length - up - dn;
    out.push(`\nReaders: ${ds.length}. Higher with names: ${up}. Same: ${z}. Lower with names: ${dn}.`);
    out.push(`Mean difference ${f2(mean(ds))} points out of 10 (median ${f2(median(ds))}, range ${f2(Math.min(...ds))} to ${f2(Math.max(...ds))}; possible range -10 to +10).`);
    const roles = Array.from(new Set(diffs.map(x => x.role))).sort();
    if (roles.length > 1) {
      out.push('By role: ' + roles.map(r => {
        const x = diffs.filter(d => d.role === r).map(d => d.d);
        return `${r || '(none)'} n=${x.length}, mean ${f2(mean(x))}`;
      }).join('; ') + '. Proxies stand in for producers, so their difference is an upper bound.');
    }
    out.push('With this few readers the figures show direction and where it fails, not significance.');
  }

  // 3. per-week baseline
  out.push('\n### Per-week baseline scores (rival explanation: some weeks are harder)\n');
  const t4 = [];
  for (const w of weeks) {
    for (const c of conds) {
      const sums = [];
      for (const p of people) {
        const t = tot[p] && tot[p][c];
        if (t && t.week === w) sums.push(t.sum);
      }
      t4.push([w, c, String(sums.length), sums.length ? f2(mean(sums)) : 'n/a', sums.join(', ')]);
    }
  }
  out.push(table(['Week', 'Condition', 'Readers', 'Mean /10', 'Individual totals'], t4));
  const bw = weeks.map(w => {
    const s = []; for (const p of people) { const t = tot[p] && tot[p].baseline; if (t && t.week === w) s.push(t.sum); }
    return s;
  });
  if (bw.length === 2 && bw[0].length && bw[1].length) {
    out.push(`\nBaseline mean gap between weeks: ${f2(Math.abs(mean(bw[0]) - mean(bw[1])))} points out of 10. Compare this with the treatment effect before crediting the names.`);
  }

  // order check
  const byOrder = {};
  for (const p of people) for (const c of conds) {
    const t = tot[p] && tot[p][c]; if (!t) continue;
    const k = `order ${t.order}`; (byOrder[k] = byOrder[k] || []).push(t.sum);
  }
  const ok = Object.keys(byOrder).sort();
  if (ok.length) out.push('\nMean total /10 by reading order (first report vs second): ' + ok.map(k => `${k}: ${f2(mean(byOrder[k]))} (n=${byOrder[k].length})`).join('; ') + '.');
  return out.join('\n');
}

// ---------- 4. ten-need sheet ----------
function analyseNeeds(needRows, keyRows) {
  const out = [];
  const key = {};
  keyRows.forEach(r => { key[r.need_id] = r.class.toUpperCase(); });
  const needIds = Object.keys(key);
  const rows = needRows.filter(r => !isPilot(r));
  const people = Array.from(new Set(rows.map(r => r.participant))).sort();
  out.push(`Key has ${needIds.length} needs; readers analysed: ${people.length} (pilot excluded).`);
  const t = [], miss = {};
  const per = [];
  for (const p of people) {
    const mine = {};
    rows.filter(r => r.participant === p).forEach(r => { mine[r.need_id] = r.class.toUpperCase(); });
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
    out.push(`\nAgreement ranged ${Math.min(...per.map(x => x.ag.agree))}-${Math.max(...per.map(x => x.ag.agree))} of ${needIds.length} needs across ${per.length} readers; kappa ${ks.length ? f2(Math.min(...ks)) + ' to ' + f2(Math.max(...ks)) : 'n/a'}.`);
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
  out.push('\n### Needs where readers departed from the key (each is a finding about what the artefacts cannot say)\n');
  const dis = needIds.filter(id => miss[id]).map(id => [id, key[id], `${miss[id].length}/${people.length}`, miss[id].join(', ')]);
  out.push(dis.length ? table(['Need', 'Key', 'Readers differing', 'Reader:their label'], dis) : 'None: every reader matched the key on every need.');
  return out.join('\n');
}

// ---------- 5. think-aloud coding ----------
function analyseCodes(codeRows) {
  const out = [];
  const by = {};
  // Two accepted layouts: long (segment_id, pass, code) or wide (segment_id, pass1_code, pass2_code).
  codeRows.forEach(r => {
    const seg = (by[r.segment_id] = by[r.segment_id] || {});
    if (r.pass !== undefined && r.code !== undefined) {
      if (r.code) seg[String(parseInt(r.pass, 10))] = r.code.toLowerCase();
    } else {
      if (r.pass1_code) seg['1'] = r.pass1_code.toLowerCase();
      if (r.pass2_code) seg['2'] = r.pass2_code.toLowerCase();
    }
  });
  const ids = Object.keys(by);
  const first = ids.filter(id => by[id]['1']);
  const both = ids.filter(id => by[id]['1'] && by[id]['2']).sort();
  out.push(`Segments with pass 1: ${first.length}. Re-coded in pass 2: ${both.length} (${first.length ? Math.round(100 * both.length / first.length) : 0}% of pass 1; A2 plans about a quarter).`);
  if (!both.length) return out.join('\n');
  const a = both.map(id => by[id]['1']), b = both.map(id => by[id]['2']);
  const ag = agreement(a, b), k = cohenKappa(a, b);
  out.push(`Agreement: ${pct(ag.agree, ag.n)}. Cohen's kappa: ${kfmt(k.kappa)}.`);
  const d = both.filter(id => by[id]['1'] !== by[id]['2']).map(id => [id, by[id]['1'], by[id]['2']]);
  out.push('\n### Segments where the passes differ (settle by reading the quote, then record the rule you applied)\n');
  out.push(d.length ? table(['Segment', 'Pass 1', 'Pass 2'], d) : 'None.');
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

function main() {
  const a = args(process.argv.slice(2));
  const dir = __dirname;
  const useSample = !a.scores && !a.needs && !a.key && !a.codes;
  const f = {
    scores: a.scores || (useSample ? path.join(dir, 'sample-item-scores.csv') : null),
    needs: a.needs || (useSample ? path.join(dir, 'sample-need-classifications.csv') : null),
    key: a.key || (useSample ? path.join(dir, 'sample-marking-key.csv') : null),
    codes: a.codes || (useSample ? path.join(dir, 'sample-think-aloud-codes.csv') : null),
  };
  const out = [];
  const fake = Object.values(f).some(x => x && path.basename(x).startsWith('sample-'));
  out.push('# ChangeLens evaluation analysis');
  if (fake) out.push('\n**FAKE DATA: one or more inputs are sample-*.csv files. Nothing below is a result.**');
  out.push('\nInputs: ' + Object.entries(f).filter(([, v]) => v).map(([k, v]) => `${k}=${path.basename(v)}`).join(', '));
  if (f.scores) { out.push('\n## 1. Item scores'); out.push(analyseScores(readCSV(f.scores))); }
  if (f.needs && f.key) { out.push('\n## 2. Ten-need sheet'); out.push(analyseNeeds(readCSV(f.needs), readCSV(f.key))); }
  else if (f.needs || f.key) out.push('\n## 2. Ten-need sheet\nNeeds both --needs and --key; skipped.');
  if (f.codes) { out.push('\n## 3. Think-aloud coding agreement'); out.push(analyseCodes(readCSV(f.codes))); }
  out.push('\n---\nReport raw counts and limits. Eight readers show direction and failure points, not significance.');
  const text = out.join('\n') + '\n';
  if (a.out) fs.writeFileSync(a.out, text);
  process.stdout.write(text);
}

module.exports = { parseCSV, agreement, cohenKappa, analyseScores, analyseNeeds, analyseCodes, mean, median };
if (require.main === module) main();
