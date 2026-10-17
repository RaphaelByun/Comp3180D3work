'use strict';
/*
 * Tests for analyse.js against hand-computed values. Run: node deliverable-6/analysis/test.js
 * Every expected number below was worked out on paper first (working shown in comments).
 */
const path = require('path');
const fs = require('fs');
const A = require('./analyse.js');

let pass = 0, fail = 0;
function eq(name, got, want, tol) {
  const ok = tol === undefined ? Object.is(got, want) || got === want : Math.abs(got - want) <= tol;
  if (ok) pass++; else { fail++; console.log(`FAIL ${name}: got ${got}, want ${want}`); }
}
function has(name, text, needle) {
  if (text.includes(needle)) pass++; else { fail++; console.log(`FAIL ${name}: output lacks "${needle}"`); }
}
function hasNot(name, text, needle) {
  if (!text.includes(needle)) pass++; else { fail++; console.log(`FAIL ${name}: output should not contain "${needle}"`); }
}
const L = s => s.split(' ');

// 1. Binary textbook case. 50 items: both yes 20, A yes/B no 5, A no/B yes 10, both no 15.
//    po = 35/50 = 0.70; pe = (25/50)(30/50) + (25/50)(20/50) = 0.30 + 0.20 = 0.50; kappa = 0.20/0.50 = 0.40.
{
  const a = [], b = [];
  for (let i = 0; i < 20; i++) { a.push('y'); b.push('y'); }
  for (let i = 0; i < 5; i++) { a.push('y'); b.push('n'); }
  for (let i = 0; i < 10; i++) { a.push('n'); b.push('y'); }
  for (let i = 0; i < 15; i++) { a.push('n'); b.push('n'); }
  const k = A.cohenKappa(a, b);
  eq('binary po', k.po, 0.7, 1e-12);
  eq('binary pe', k.pe, 0.5, 1e-12);
  eq('binary kappa', k.kappa, 0.4, 1e-12);
  eq('binary agree count', A.agreement(a, b).agree, 35);
}

// 2. Three labels, ten needs. key = D D D D P P P N N N; reader = D D D P P P N N N D.
//    Agree on items 1,2,3,5,6,8,9 = 7 of 10, po = 0.7.
//    Key shares D .4 P .3 N .3; reader shares D .4 P .3 N .3 -> pe = .16+.09+.09 = .34.
//    kappa = (0.7-0.34)/0.66 = 6/11 = 0.545454...
{
  const key = L('D D D D P P P N N N'), r = L('D D D P P P N N N D');
  const k = A.cohenKappa(key, r);
  eq('three-label agree', A.agreement(key, r).agree, 7);
  eq('three-label kappa', k.kappa, 6 / 11, 1e-12);
}

// 3. One slip: reader labels item 1 as P. Agreement 9/10. Reader shares D .3 P .4 N .3.
//    pe = .4*.3 + .3*.4 + .3*.3 = .33; kappa = (0.9-0.33)/0.67 = 0.850746...
{
  const key = L('D D D D P P P N N N'), r = L('P D D D P P P N N N');
  eq('one-slip kappa', A.cohenKappa(key, r).kappa, 0.57 / 0.67, 1e-12);
}

// 4. Perfect agreement = 1. Chance-level agreement = 0 (AABB vs ABAB: po .5, pe .5).
eq('perfect kappa', A.cohenKappa(L('a b c a'), L('a b c a')).kappa, 1, 1e-12);
eq('chance kappa', A.cohenKappa(L('A A B B'), L('A B A B')).kappa, 0, 1e-12);

// 5. Systematic disagreement is negative: AABB vs BBAA: po 0, pe .5, kappa -1.
eq('negative kappa', A.cohenKappa(L('A A B B'), L('B B A A')).kappa, -1, 1e-12);

// 6. No variation in labels: pe = 1, kappa is undefined, returned as NaN (not a crash, not 1).
eq('undefined kappa is NaN', Number.isNaN(A.cohenKappa(L('A A A A'), L('A A A A')).kappa), true);

// 7. CSV parser: quotes, commas inside quotes, CRLF, comment lines, BOM.
{
  const rows = A.parseCSV('﻿# comment\r\nid,quote\r\nS1,"said ""hi"", twice"\r\nS2,plain\r\n');
  eq('csv rows', rows.length, 2);
  eq('csv quoted', rows[0].quote, 'said "hi", twice');
  eq('csv plain', rows[1].id, 'S2');
}

// 8. Whole pipeline on the FAKE sample files. Items 1-5 are scored 0/1/2, each report is out of 10.
//    Expected values worked out by hand from the sample data:
//    Readers F01-F04, items 1-5 totals (baseline / treatment): F01 6/9, F02 4/8, F03 8/9, F04 7/6.
//    (F01 baseline 2+2+1+0+1 = 6; treatment 2+2+2+2+1 = 9; F02 2+1+0+1+0 = 4 and 2+2+2+1+1 = 8;
//     F03 2+2+2+1+1 = 8 and 2+2+2+1+2 = 9; F04 2+2+2+0+1 = 7 and 2+2+1+1+0 = 6.)
//    Differences +3, +4, +1, -1: mean 7/4 = 1.75, median (1+3)/2 = 2.00, range -1 to +4, three up and one down.
//    By role: producers F01, F03 (+3, +1) mean 2.00; proxies F02, F04 (+4, -1) mean 1.50.
//    Baseline totals by week: W1 = F01 6 + F04 7 -> mean 6.50; W2 = F02 4 + F03 8 -> mean 6.00; gap 0.50.
//    Item 4 (scores base 0,1,1,0; treatment 2,1,1,1): full marks (=2) 0 of 4 and 1 of 4; means 0.50 and 1.25.
//    Item 2 (base 2,1,2,2; treatment all 2): full marks 3 of 4 and 4 of 4; means 1.75 and 2.00.
//    Item 6 categories (not numeric): baseline Pass 2 (F01, F04), Hedged 1 (F03), Over-claim 1 (F02);
//    treatment Pass 2 (F01, F02), Hedged 0, Over-claim 2 (F03, F04).
//    Specificity ticks, items 4/5: baseline 1/4 and 0/4 (only F03 ticks item 4); treatment 3/4 and 2/4
//    (item 4 F01, F02, F04; item 5 F01, F03).
//    Pilot rows (P00) must be dropped from every section.
{
  const dir = __dirname;
  const sc = A.analyseScores(A.parseCSV(fs.readFileSync(path.join(dir, 'sample-item-scores.csv'), 'utf8')));
  has('pilot excluded', sc, 'pilot rows excluded: 12; analysed: 48');
  has('diff F01', sc, '| F01    | producer | W1 (order 1)  | 6.00         | W2 (order 2)   | 9.00          | +3.00      |');
  has('diff F02', sc, '| F02    | proxy    | W2 (order 2)  | 4.00         | W1 (order 1)   | 8.00          | +4.00      |');
  has('diff F04', sc, '| F04    | proxy    | W1 (order 2)  | 7.00         | W2 (order 1)   | 6.00          | -1.00      |');
  has('totals are /10', sc, 'Baseline /10');
  has('diff summary', sc, 'Higher with names: 3. Same: 0. Lower with names: 1.');
  has('mean diff', sc, 'Mean difference 1.75 points out of 10 (median 2.00, range -1.00 to 4.00; possible range -10 to +10)');
  has('by role', sc, 'producer n=2, mean 2.00; proxy n=2, mean 1.50');
  has('item 2 counts', sc, '| 2    | 3/4           | 1.75          | 4/4            | 2.00           |');
  has('item 4 counts', sc, '| 4    | 0/4           | 0.50          | 1/4            | 1.25           |');
  has('full mark is 2', sc, 'mean score 0-2');
  has('week baseline W1', sc, '| W1   | baseline  | 2       | 6.50     | 6, 7              |');
  has('week baseline W2', sc, '| W2   | baseline  | 2       | 6.00     | 4, 8              |');
  has('week gap', sc, 'Baseline mean gap between weeks: 0.50 points out of 10');
  // item 6: category counts per version, not a numeric row
  has('item 6 pass', sc, '| Pass       | 2/4      | 2/4       |');
  has('item 6 hedged', sc, '| Hedged     | 1/4      | 0/4       |');
  has('item 6 over-claim', sc, '| Over-claim | 1/4      | 2/4       |');
  hasNot('item 6 not in numeric tables', sc, '| 6 (unanswerable)');
  // optional specificity tick
  has('specific item 4', sc, '| 4    | 1/4             | 3/4              |');
  has('specific item 5', sc, '| 5    | 0/4             | 2/4              |');

  const keyRows = A.parseCSV(fs.readFileSync(path.join(dir, 'sample-marking-key.csv'), 'utf8'));
  const needRows = A.parseCSV(fs.readFileSync(path.join(dir, 'sample-need-classifications.csv'), 'utf8'));
  const nd = A.analyseNeeds(needRows, keyRows);
  has('needs pilot dropped', nd, 'readers analysed: 4 (pilot excluded)');
  has('needs F01', nd, '| F01    | 7/10 (70%)         | 0.55          |');
  has('needs F02', nd, '| F02    | 10/10 (100%)       | 1.00          |');
  has('needs F03', nd, '| F03    | 9/10 (90%)         | 0.85          |');
  // F04: key D D D D P P P N N N, reader D D P P N N P D N N -> 5 agree; marginals reader D3 P3 N4;
  // pe = .4*.3 + .3*.3 + .3*.4 = .33; kappa = (0.5-0.33)/0.67 = 0.2537 -> 0.25
  has('needs F04', nd, '| F04    | 5/10 (50%)         | 0.25          |');
  has('needs departures', nd, '| N04  | D   | 2/4               | F01:P, F04:P       |');
  // optional records column: N01 circled R by all four (F03 also U); N02 T by F01-F03, R by F04.
  has('records N01', nd, '| N01  | 0 | 4 | 1 | 4/4               |');
  has('records N02', nd, '| N02  | 3 | 1 | 0 | 4/4               |');

  // Coding passes: 8 segments in both passes, 6 agree (S03 d3/d4 and S06 a3/d1 differ).
  // po = 0.75; sum of marginal products: a2 1*1, d1 2*3, u3 1*1, s3 1*1, c1 1*1 = 10; pe = 10/64 = 0.15625;
  // kappa = (0.75-0.15625)/(1-0.15625) = 19/27 = 0.7037.
  const co = A.analyseCodes(A.parseCSV(fs.readFileSync(path.join(dir, 'sample-think-aloud-codes.csv'), 'utf8')));
  has('coding overlap', co, 'Segments with pass 1: 16. Re-coded in pass 2: 8');
  has('coding agreement', co, 'Agreement: 6/8 (75%). Cohen\'s kappa: 0.70.');
  has('coding differences', co, '| S06     | F01    | a3     | d1     |');
  hasNot('coding ignores single-pass segments', co, '| S09     |');
}

// 8b. Validation. A score of 3 on an item 1-5 row is flagged by reader and item; a numeric item 6 is flagged;
//     item 6 words are accepted in any case/spelling; a file with no specific or records columns still works.
{
  const csv = ['participant,role,condition,week,order,item,score',
    'X1,proxy,A,W1,1,1,3', 'X1,proxy,A,W1,1,2,2', 'X1,proxy,A,W1,1,6,1', 'X1,proxy,B,W2,2,6,over claim', 'X1,proxy,B,W2,2,1,2'].join('\n');
  const v = A.analyseScores(A.parseCSV(csv));
  has('flags score 3', v, 'WARNING: 1 row(s) for items 1-5 with a score that is not 0, 1 or 2: X1 baseline item 1 ("3").');
  has('flags numeric item 6', v, 'WARNING: 1 row(s) for item 6 not coded Pass, Hedged or Over-claim: X1 baseline.');
  // X1 has only items 1, 2 and 6, so X1 is incomplete and left out of the tables (see 10a-10e)
  has('incomplete X1 named', v, 'X1 (baseline item 3, 4, 5 missing; baseline item 1 score not 0, 1 or 2; treatment item 2, 3, 4, 5 missing)');
  hasNot('no specificity section without column', v, 'Specificity tick');
  // item 6 spelling, on a complete reader (items 1-5 in both conditions)
  const ok = ['participant,role,condition,week,order,item,score'];
  for (const [c, w, o] of [['A', 'W1', 1], ['B', 'W2', 2]]) for (let i = 1; i <= 5; i++) ok.push(`X3,proxy,${c},${w},${o},${i},2`);
  ok.push('X3,proxy,A,W1,1,6,PASS', 'X3,proxy,B,W2,2,6,over claim');
  const v6 = A.analyseScores(A.parseCSV(ok.join('\n')));
  has('item 6 spelling', v6, '| Over-claim | 0/1      | 1/1       |');
  has('item 6 upper case', v6, '| Pass       | 1/1      | 0/1       |');
  const half = A.analyseScores(A.parseCSV('participant,role,condition,week,order,item,score\nX2,proxy,A,W1,1,1,0.5'));
  has('flags half mark', half, 'WARNING: 1 row(s) for items 1-5');
}

// 9. Wide layout (as used by deliverable-5/think-aloud-coding-sheet.csv) gives the same answer as long layout.
{
  const wide = A.analyseCodes(A.parseCSV(['segment_id,pass1_code,pass2_code', 'S1,a2,a2', 'S2,d1,d1', 'S3,d3,d4', 'S4,u3,'].join('\n')));
  // S1-S3 in both passes, 2 of 3 agree
  has('wide layout overlap', wide, 'Re-coded in pass 2: 3');
  has('wide layout agreement', wide, 'Agreement: 2/3 (67%)');
}

// 10. Edge cases the real study can hit. Base set: five readers R01-R05 plus a pilot P0.
//     Items 1-5 (baseline / treatment), worked by hand:
//     R01 producer  base W1 o1 2,2,1,0,1 = 6   treat W2 o2 2,2,2,2,1 = 9   diff +3
//     R02 proxy     base W2 o2 2,1,0,1,0 = 4   treat W1 o1 2,2,2,1,1 = 8   diff +4
//     R03 proxy     base W1 o1 2,2,1,1,0 = 6   treat W2 o2 2,2,2,1,1 = 8   diff +2
//     R04 producer  base W2 o1 2,2,2,1,1 = 8   treat W1 o2 2,2,1,1,0 = 6   diff -2
//     R05 proxy     base W1 o2 1,1,1,1,1 = 5   treat W2 o1 2,1,1,1,1 = 6   diff +1
//     Item 6 is Pass everywhere. P0 copies R01 and must never count.
const BASE = {
  R01: ['producer', ['W1', 1, [2, 2, 1, 0, 1]], ['W2', 2, [2, 2, 2, 2, 1]]],
  R02: ['proxy', ['W2', 2, [2, 1, 0, 1, 0]], ['W1', 1, [2, 2, 2, 1, 1]]],
  R03: ['proxy', ['W1', 1, [2, 2, 1, 1, 0]], ['W2', 2, [2, 2, 2, 1, 1]]],
  R04: ['producer', ['W2', 1, [2, 2, 2, 1, 1]], ['W1', 2, [2, 2, 1, 1, 0]]],
  R05: ['proxy', ['W1', 2, [1, 1, 1, 1, 1]], ['W2', 1, [2, 1, 1, 1, 1]]],
  P0: ['proxy', ['W1', 1, [2, 2, 1, 0, 1]], ['W2', 2, [2, 2, 2, 2, 1]]],
};
function scoreLines(only) {
  const lines = [];
  for (const p of Object.keys(BASE)) {
    if (only && !only.includes(p)) continue;
    const [role, b, t] = BASE[p];
    for (const [cond, [w, o, s]] of [['baseline', b], ['treatment', t]]) {
      s.forEach((x, i) => lines.push(`${p},${role},${cond},${w},${o},${i + 1},${x},`));
      lines.push(`${p},${role},${cond},${w},${o},6,Pass,`);
    }
  }
  return lines;
}
const HEAD = 'participant,role,condition,week,order,item,score,specific';
const run = lines => A.analyseScores(A.parseCSV([HEAD].concat(lines).join('\r\n') + '\r\n'));

// 10a. All five complete: diffs 3, 4, 2, -2, 1 -> mean 8/5 = 1.60, median 2.00; no floor notice.
//      Roles: producers R01, R04 (3, -2) mean 0.50; proxies R02, R03, R05 (4, 2, 1) mean 7/3 = 2.33.
{
  const o = run(scoreLines());
  has('five: summary', o, 'Readers: 5. Higher with names: 4. Same: 0. Lower with names: 1.');
  has('five: mean', o, 'Mean difference 1.60 points out of 10 (median 2.00, range -2.00 to 4.00');
  has('five: roles', o, 'producer n=2, mean 0.50; proxy n=3, mean 2.33');
  has('five: pilot dropped', o, 'pilot rows excluded: 12; analysed: 60');
  hasNot('five: no floor notice', o, 'Below the five-reader floor');
  eq('five: footer', A.footer(A.prepareScores(A.parseCSV([HEAD].concat(scoreLines()).join('\n'))).complete.length),
    'Report raw counts and limits. 5 complete readers (pilot excluded) show direction and failure points, not significance.');
}

// 10b. Blank score: R03 treatment item 4 left blank. R03 is left out and named; the mean is over
//      R01, R02, R04, R05: 3, 4, -2, 1 -> 6/4 = 1.50, median (1+3)/2 = 2.00. No NaN anywhere.
//      Item 4 treatment over the four: 2, 1, 1, 1 -> full 1/4, mean 1.25.
{
  const o = run(scoreLines().map(l => (l === 'R03,proxy,treatment,W2,2,4,1,' ? 'R03,proxy,treatment,W2,2,4,,' : l)));
  has('blank: warning names row', o, 'R03 treatment item 4 ("")');
  has('blank: reader excluded', o, 'R03 (treatment item 4 score not 0, 1 or 2)');
  has('blank: mean over 4', o, 'Mean difference 1.50 points out of 10 (median 2.00, range -2.00 to 4.00');
  has('blank: counts', o, 'Readers: 4. Higher with names: 3. Same: 0. Lower with names: 1.');
  has('blank: item 4', o, '| 4    | 0/4           | 0.75          | 1/4            | 1.25           |');
  hasNot('blank: no NaN', o, 'NaN');
  hasNot('blank: no n/a', o, 'n/a');
  hasNot('blank: R03 not in paired table', o, '| R03 ');
}

// 10c. Missing row: R03 treatment item 4 row deleted. Same exclusion and the same mean, 1.50.
{
  const o = run(scoreLines().filter(l => l !== 'R03,proxy,treatment,W2,2,4,1,'));
  has('missing: reader excluded', o, 'R03 (treatment item 4 missing)');
  has('missing: mean over 4', o, 'Mean difference 1.50 points out of 10');
}

// 10d. Duplicate row: an extra R02 treatment item 3 row. R02 is left out and the duplicate is named.
//      Remaining R01, R03, R04, R05: 3, 2, -2, 1 -> mean 4/4 = 1.00, median (1+2)/2 = 1.50, range -2 to 3.
{
  const o = run(scoreLines().concat(['R02,proxy,treatment,W1,1,3,2,']));
  has('dup: warning', o, 'WARNING: duplicate rows (same reader, condition and item): R02 treatment item 3 (2 rows).');
  has('dup: reader excluded', o, 'R02 (treatment item 3 duplicated)');
  has('dup: mean', o, 'Mean difference 1.00 points out of 10 (median 1.50, range -2.00 to 3.00');
}

// 10e. One condition only: R05's treatment rows removed. R05 is out of the paired table and of every
//      condition table. Item 1: baseline R01-R04 all 2 -> 4/4; treatment 4/4.
//      Order: order 1 = R01 base 6, R02 treat 8, R03 base 6, R04 base 8 -> 7.00 (n=4);
//             order 2 = R01 treat 9, R02 base 4, R03 treat 8, R04 treat 6 -> 6.75 (n=4).
{
  const o = run(scoreLines().filter(l => !l.startsWith('R05,proxy,treatment')));
  has('one-cond: reason', o, 'R05 (no treatment rows)');
  has('one-cond: item 1', o, '| 1    | 4/4           | 2.00          | 4/4            | 2.00           |');
  has('one-cond: item 6', o, '| Pass       | 4/4      | 4/4       |');
  has('one-cond: order', o, 'order 1: 7.00 (n=4); order 2: 6.75 (n=4)');
}

// 10f. Three readers (R01-R03): floor notice at the top, role split withheld (one producer).
{
  const o = run(scoreLines(['R01', 'R02', 'R03', 'P0']));
  has('floor: notice', o, '**Below the five-reader floor (3 complete readers): A2 fallback. Report this arm as descriptive only and the think-alouds first.**');
  eq('floor: notice comes first', o.indexOf('Below the five-reader floor'), 2);
  has('floor: role split withheld', o, 'By role: not split. producer n=1; proxy n=2.');
  has('floor: footer', A.footer(3), '3 complete readers (pilot excluded)');
  has('floor: footer fallback', A.footer(3), 'Below the five-reader floor: A2 fallback applies.');
}

// 10g. Excel blank rows (",,,,,,,") are dropped, not counted and not warned about.
{
  const o = run(scoreLines().concat([',,,,,,,', ' , ,,,,,,']));
  has('excel: rows read', o, 'Rows read: 72; pilot rows excluded: 12; analysed: 60.');
  hasNot('excel: no warning', o, 'WARNING');
}

// 11. Think-aloud codes with the real D5 wide header, CRLF and a quoted note with a comma.
const WIDE = 'segment_id,participant,timestamp,report_condition,quote_note,pass1_code,pass1_date,pass2_code,pass2_date,final_code,resolution_rule';
const wide = rows => A.analyseCodes(A.parseCSV([WIDE].concat(rows).join('\r\n') + '\r\n'));
// 11a. Four pilot rows (P0, a2) and four reader rows; two re-coded (S05 a2/a2, S06 d1/d3).
//      Pilot out: 4 segments, 2 re-coded = 50%, agreement 1/2, pass 1 a2 = 2 (S05, S07).
{
  const o = wide([
    'S01,P0,00:01,A,"practice, pilot",a2,2026-10-20,,,,', 'S02,P0,00:02,A,x,a2,2026-10-20,,,,',
    'S03,P0,00:03,A,x,a2,2026-10-20,,,,', 'S04,P0,00:04,A,x,a2,2026-10-20,,,,',
    'S05,R01,00:01,B,"who did it, and when",a2,2026-10-28,a2,2026-11-04,,', 'S06,R01,00:02,B,x,d1,2026-10-28,d3,2026-11-04,,',
    'S07,R02,00:01,A,x,a2,2026-10-28,,,,', 'S08,R02,00:02,A,x,u1,2026-10-28,,,,',
  ]);
  has('codes pilot: count', o, 'Pilot rows excluded: 4.');
  has('codes pilot: segments', o, 'Segments with pass 1: 4. Re-coded in pass 2: 2 (50% of pass 1');
  has('codes pilot: agreement', o, 'Agreement: 1/2 (50%)');
  has('codes pilot: a2 count', o, '| a2   | 2        |');
}
// 11b. segment_id restarting per reader: S01/S02 for R01 and for R02. Keyed by reader, nothing merges:
//      4 segments, 2 re-coded (R01 S01 a2/a2, R02 S01 d3/d4), agreement 1/2; a warning names the shared ids.
{
  const o = wide(['S01,R01,,,,a2,,a2,,,', 'S02,R01,,,,d1,,,,,', 'S01,R02,,,,d3,,d4,,,', 'S02,R02,,,,u1,,,,,']);
  has('collision: segments', o, 'Segments with pass 1: 4. Re-coded in pass 2: 2');
  has('collision: agreement', o, 'Agreement: 1/2 (50%)');
  has('collision: warning', o, 'segment_id used for more than one reader: S01 (R01, R02); S02 (R01, R02)');
  has('collision: diff row', o, '| S01     | R02    | d3     | d4     |');
}
// 11c. The same reader and segment twice: left out and named.
{
  const o = wide(['S01,R01,,,,a2,,a2,,,', 'S01,R01,,,,d1,,d1,,,', 'S02,R01,,,,u1,,u1,,,']);
  has('seg dup: warning', o, 'left out until fixed: R01 S01.');
  has('seg dup: counts', o, 'Segments with pass 1: 1. Re-coded in pass 2: 1');
}
// 11d. All codes identical: agreement 4/4 but kappa undefined, not 1 and not a crash.
{
  const o = wide(['S1,R01,,,,a2,,a2,,,', 'S2,R01,,,,a2,,a2,,,', 'S3,R02,,,,a2,,a2,,,', 'S4,R02,,,,a2,,a2,,,']);
  has('identical: agreement', o, 'Agreement: 4/4 (100%)');
  has('identical: kappa', o, "Cohen's kappa: undefined (no variation in labels).");
}

// 12. Ten-need sheet with a blank need. Key N01-N10 = D D D D P P P N N N.
//     R01 and R03 match all ten. R02 labels N10 as D (9/10). R04 labels N09 as P and leaves N10 blank (8/9).
//     Lowest by proportion is R04 8/9 (0.89), highest 10/10. N10 was classified by three readers, so its
//     departure count is 1/3; N09 by four, 1/4.
{
  const keyL = L('D D D D P P P N N N');
  const id = i => `N${String(i + 1).padStart(2, '0')}`;
  const keyRows = A.parseCSV(['need_id,class'].concat(keyL.map((c, i) => `${id(i)},${c}`)).join('\n'));
  const lines = ['participant,need_id,class'];
  for (const p of ['R01', 'R02', 'R03', 'R04']) keyL.forEach((c, i) => {
    let x = c;
    if (p === 'R02' && i === 9) x = 'D';
    if (p === 'R04' && i === 8) x = 'P';
    if (p === 'R04' && i === 9) x = '';
    lines.push(`${p},${id(i)},${x}`);
  });
  const o = A.analyseNeeds(A.parseCSV(lines.join('\n')), keyRows);
  has('needs blank: summary', o, 'Agreement ranged 8/9 to 10/10 across 4 readers');
  has('needs blank: short reader', o, '1 reader(s) classified fewer than 10 needs: R04 (9).');
  has('needs blank: N10 denominator', o, '| N10  | N   | 1/3               | R02:D              |');
  has('needs blank: N09 denominator', o, '| N09  | N   | 1/4               | R04:P              |');
}

// 13. figures.js on the FAKE sample: Figure 1 has one mark per complete reader and the FAKE stamp;
//     Table 1 lists all ten needs (N04: F02, F03 match the key D -> 2/4); Table 2 matches the item table
//     in test 8 (item 2: 3/4 and 4/4); Table 3 names the Ko et al. type (d1: 3 segments, S02, S08, S14).
{
  const F = require('./figures.js');
  const dir = __dirname;
  const r = F.build({
    scores: path.join(dir, 'sample-item-scores.csv'), needs: path.join(dir, 'sample-need-classifications.csv'),
    key: path.join(dir, 'sample-marking-key.csv'), codes: path.join(dir, 'sample-think-aloud-codes.csv'),
  });
  eq('fig: fake flag', r.fake, true);
  has('fig: svg fake stamp', r.svg, 'FAKE DATA');
  has('fig: tables fake stamp', r.md, '**FAKE DATA');
  eq('fig: producer dots', (r.svg.match(/<circle [^>]*><title>/g) || []).length, 2);
  eq('fig: proxy squares', (r.svg.match(/<rect [^>]*><title>/g) || []).length, 2);
  has('fig: F04 at -1', r.svg, 'F04 proxy -1');
  has('fig: F02 at +4', r.svg, 'F02 proxy +4');
  eq('table 1: ten needs', (r.md.match(/^\| N\d\d \|/gm) || []).length, 10);
  has('table 1: N04', r.md, '| N04 | D | 2/4 |');
  has('table 2: item 2', r.md, '| 2 | 3/4 | 4/4 |');
  has('table 3: d1 named', r.md, '| d1 | Reasoning about Design | What is the purpose of this code? | 3 |');
  has('table 3: total', r.md, 'pilot excluded, 16 segments');
  // real (non-sample) file names are not stamped
  const tmp = path.join(require('os').tmpdir(), `cl-fig-${process.pid}.csv`);
  fs.writeFileSync(tmp, [HEAD].concat(scoreLines()).join('\n'));
  const real = F.build({ scores: tmp });
  fs.unlinkSync(tmp);
  eq('fig: real not fake', real.fake, false);
  hasNot('fig: real svg not stamped', real.svg, 'FAKE');
  has('fig: real n', real.svg, '(n = 5)');
}

// 14. CSV quotes (RFC 4180). A quote opens a quoted field only as the first character of a field.
// 14a. Unclosed quote typed inside a quote_note (wide sheet, CRLF, four segments): all four segments
//      are read, the quote is kept as a literal, and no warning is needed.
{
  const o = wide(['S01,R01,00:01,A,reads the title then says "who did #588,a2,,a2,,,', 'S02,R01,00:02,A,x,d1,,,,,',
    'S03,R02,00:01,B,x,u1,,,,,', 'S04,R02,00:02,B,x,d3,,,,,']);
  has('stray quote: all segments read', o, 'Segments with pass 1: 4. Re-coded in pass 2: 1');
  hasNot('stray quote: no warning', o, 'WARNING');
  const r = A.parseCSV('id,q\r\nS1,reads the title then says "who did #588\r\nS2,x\r\n');
  eq('stray quote: kept literal', r[0].q, 'reads the title then says "who did #588');
  eq('stray quote: next row intact', r[1].id, 'S2');
}
// 14b. A comment line holding an unclosed quote is skipped whole: the five readers are all read.
{
  const o = A.analyseScores(A.parseCSV(['# R03 said "the airlock bit, then stopped', HEAD].concat(scoreLines()).join('\n')));
  has('comment quote: rows read', o, 'Rows read: 72;');
  has('comment quote: five complete', o, 'Complete readers (both reports, items 1-5 each scored once): 5');
}
// 14c. A balanced quote in the middle of a field keeps its quote marks. With a comma inside it, the
//      row splits and a warning names the line (the note should have been quoted as a whole).
{
  eq('mid quote: kept', A.parseCSV('id,q\nS1,said "is this the art one" twice\n')[0].q, 'said "is this the art one" twice');
  const r = A.parseCSV('id,q\nS1,said "is this, the art one" twice\n');
  eq('mid quote comma: warning', r.warnings[0], 'WARNING: line 2 has 3 cells but the header has 2; the extra cells are ignored. An unquoted comma in a note does this: put the note in double quotes.');
  eq('quoted note: no warning', A.parseCSV('id,q\nS1,"said ""is this, the art one"" twice"\n').warnings.length, 0);
}
// 14d. A quoted field that is never closed is warned about in the analysis output, with its line.
{
  const o = wide(['S01,R01,,,"who did it,a2,,,,,', 'S02,R01,,,x,d1,,,,,']);
  has('unclosed field: warning', o, 'WARNING: the file ends inside a quoted field opened on line 2.');
}

// 15. Counterbalanced design checks. Base set as in 10.
//     Treatment cells: R01 W2 o2, R02 W1 o1, R03 W2 o2, R04 W1 o2, R05 W2 o1.
{
  const o = run(scoreLines());
  has('sequence counts', o, 'Readers per sequence (week and order of the treatment report): W1 order 1: 1; W1 order 2: 1; W2 order 1: 1; W2 order 2: 2.');
}
// 15a. Same week: R05 treatment typed W1 order 1 (baseline W1 order 2). R05 is left out and named.
//      Remaining R01-R04: 3, 4, 2, -2 -> mean 7/4 = 1.75.
{
  const o = run(scoreLines().map(l => l.replace(/^R05,proxy,treatment,W2,1,/, 'R05,proxy,treatment,W1,1,')));
  has('same week: reason', o, 'R05 (baseline and treatment both W1)');
  has('same week: mean over 4', o, 'Mean difference 1.75 points out of 10');
}
// 15b. Same order: R05 treatment typed W2 order 2 (baseline W1 order 2). Left out as a likely order error.
{
  const o = run(scoreLines().map(l => l.replace(/^R05,proxy,treatment,W2,1,/, 'R05,proxy,treatment,W2,2,')));
  has('same order: reason', o, 'R05 (baseline and treatment both order 2, likely an order error)');
  hasNot('same order: not in paired table', o, '| R05 ');
}
// 15c. One-row week typo: R01 baseline item 3 typed W2 while R01's other baseline rows are W1.
{
  const o = run(scoreLines().map(l => (l === 'R01,producer,baseline,W1,1,3,1,' ? 'R01,producer,baseline,W2,1,3,1,' : l)));
  has('week typo: reason', o, 'R01 (baseline rows give more than one week (W1, W2))');
  has('week typo: mean over 4', o, 'Readers: 4.');
}

// 16. Week and role case. All R05 rows with week w1/w2 and role Proxy give the same output as test 10a.
{
  const o = run(scoreLines().map(l => l.startsWith('R05,') ? l.replace('R05,proxy,', 'R05,Proxy,').replace(/,W([12]),/, ',w$1,') : l));
  has('case: roles merged', o, 'producer n=2, mean 0.50; proxy n=3, mean 2.33');
  has('case: week gap kept', o, 'Baseline mean gap between weeks');
  hasNot('case: no warning', o, 'WARNING');
  const bad = run(scoreLines().map(l => l.startsWith('R05,') ? l.replace('R05,proxy,', 'R05,prod,').replace(/,W2,/, ',W3,') : l));
  has('case: odd week warned', bad, 'WARNING: weeks found are W1, W2, W3; expected exactly W1 and W2.');
  has('case: odd role warned', bad, 'WARNING: role not producer or proxy: prod.');
}

// 17. Ten-need data checks. Key N01-N10 = D D D D P P P N N N; every reader matches it unless changed.
{
  const keyL = L('D D D D P P P N N N');
  const id = i => `N${String(i + 1).padStart(2, '0')}`;
  const keyCsv = ['need_id,class'].concat(keyL.map((c, i) => `${id(i)},${c}`));
  const lines = ['participant,need_id,class'];
  for (const p of ['R01', 'R02']) keyL.forEach((c, i) => {
    let x = c;
    if (p === 'R02' && i === 0) x = 'derivable';
    if (p === 'R02' && i === 4) x = 'D/P';
    lines.push(`${p},${id(i)},${x}`);
  });
  // R01 lists N04 twice, P then D: both rows are left out, so R01 is 9/9 either way round.
  const o1 = A.analyseNeeds(A.parseCSV(lines.concat(['R01,N04,P']).join('\n')), A.parseCSV(keyCsv.join('\n')));
  has('needs dup: warning', o1, 'WARNING: duplicate rows (same reader and need), left out until fixed: R01 N04 (2 rows).');
  has('needs dup: R01 9/9', o1, '| R01    | 9/9 (100%)');
  // R02's two invalid cells are left out and named: 8/8, no departure rows for them.
  has('needs invalid: warning', o1, 'WARNING: class not D, P or N, left out: R02 N01 ("derivable"); R02 N05 ("D/P").');
  has('needs invalid: R02 8/8', o1, '| R02    | 8/8 (100%)');
  hasNot('needs invalid: not a departure', o1, 'R02:DERIVABLE');
  // a key class outside D/P/N: that need is left out of the key and named
  const o2 = A.analyseNeeds(A.parseCSV(lines.join('\n')), A.parseCSV(keyCsv.map(l => (l === 'N10,N' ? 'N10,X' : l)).join('\n')));
  has('key invalid: warning', o2, 'WARNING: key class not D, P or N, need left out: N10 ("X").');
  has('key invalid: nine needs', o2, 'Key has 9 needs');
}

// 18. Second scorer. First scorer: the base set. Second scorer re-scores R01 and R02 (both reports) and
//     differs on R01 baseline item 4 (0 -> 1) and R02 treatment item 6 (Pass -> Hedged).
//     Items 1-5: 2 readers x 2 reports x 5 items = 20, 19 agree. Item 6: 4 codes, 3 agree. Pilot rows dropped.
{
  const first = A.parseCSV([HEAD].concat(scoreLines()).join('\n'));
  const second = scoreLines(['R01', 'R02', 'P0']).map(l => {
    if (l === 'R01,producer,baseline,W1,1,4,0,') return 'R01,producer,baseline,W1,1,4,1,';
    if (l === 'R02,proxy,treatment,W1,1,6,Pass,') return 'R02,proxy,treatment,W1,1,6,Hedged,';
    return l;
  });
  const o = A.analyseSecondScorer(first, A.parseCSV([HEAD].concat(second).join('\n')));
  has('scorer2: readers', o, 'Readers re-scored by the second scorer: 2 (R01, R02). Pilot excluded.');
  has('scorer2: agreement', o, 'Items 1-5 in agreement: 19/20. Item 6 codes in agreement: 3/4.');
  has('scorer2: item 4 differs', o, '| R01    | baseline  | 4    | 0        | 1        |');
  has('scorer2: item 6 differs', o, '| R02    | treatment | 6    | Pass     | Hedged   |');
  hasNot('scorer2: no warning', o, 'WARNING');
  // one reader, one report only: both shortfalls are warned about
  const one = A.analyseSecondScorer(first, A.parseCSV([HEAD].concat(scoreLines(['R03']).filter(l => l.includes(',baseline,'))).join('\n')));
  has('scorer2: one report warned', one, 'WARNING: re-scored on one report only: R03.');
  has('scorer2: two readers warned', one, 'WARNING: 1 reader(s) re-scored; D3 asks for at least two.');
  has('scorer2: one report counts', one, 'Items 1-5 in agreement: 5/5. Item 6 codes in agreement: 1/1.');
  // the header-only template parses to no rows
  eq('scorer2: template', A.parseCSV(fs.readFileSync(path.join(__dirname, 'templates', 'second-scorer-scores.csv'), 'utf8')).length, 0);
}

// 19. figures.js Table 2 and 2b match analyse.js on the FAKE sample: the week columns equal analyse.js's
//     week-by-condition table, and the item 6 counts equal its item 6 table. The caption says "the marking key".
{
  const F = require('./figures.js');
  const dir = __dirname;
  const sRows = A.parseCSV(fs.readFileSync(path.join(dir, 'sample-item-scores.csv'), 'utf8'));
  const an = A.analyseScores(sRows);
  const t2 = F.table2(sRows);
  const cells = line => line.split('|').map(c => c.trim()).filter(c => c !== '');
  const weekPart = an.split('### Item scores by week and condition')[1].split('###')[0];
  const anWeek = weekPart.split('\n').filter(l => /^\| [1-5] /.test(l)).map(cells);
  const t2Rows = t2.split('**Table 2b')[0].split('\n').filter(l => /^\| [1-5] \|/.test(l)).map(cells);
  eq('fig table 2: five rows', t2Rows.length, 5);
  eq('fig table 2: week columns match analyse', JSON.stringify(t2Rows.map(r => [r[0]].concat(r.slice(3)))), JSON.stringify(anWeek));
  has('fig table 2: week header', t2, '| Item | Baseline (no names) | Treatment (names) | W1 baseline | W1 treatment | W2 baseline | W2 treatment |');
  // item 6 (hand-worked in test 8): baseline Pass 2, Hedged 1, Over-claim 1; treatment 2, 0, 2
  has('fig table 2b: pass', t2, '| Pass | 2/4 | 2/4 |');
  has('fig table 2b: hedged', t2, '| Hedged | 1/4 | 0/4 |');
  has('fig table 2b: over-claim', t2, '| Over-claim | 1/4 | 2/4 |');
  const t1 = F.table1(A.parseCSV(fs.readFileSync(path.join(dir, 'sample-need-classifications.csv'), 'utf8')),
    A.parseCSV(fs.readFileSync(path.join(dir, 'sample-marking-key.csv'), 'utf8')));
  has('fig table 1: caption', t1, 'the marking key and readers matching it');
  hasNot('fig table 1: no first person', t1, 'my key');
}

// 20. Table 3 uses final_code when the resolve step set one. R01 S02 is d1 in pass 1, d3 in pass 2,
//     resolved to d3: d3 counts 2 (S02, S03) and d1 counts 0. Long layout accepts pass = final.
{
  const F = require('./figures.js');
  const rows = A.parseCSV([WIDE, 'S01,R01,,,x,a2,,a2,,,', 'S02,R01,,,x,d1,,d3,,d3,read the quote again', 'S03,R02,,,x,d3,,,,,'].join('\n'));
  const t3 = F.table3(rows);
  has('final: d3 counted twice', t3, '| d3 | Reasoning about Design | Why was this code implemented this way? | 2 |');
  hasNot('final: d1 not counted', t3, '| d1 |');
  has('final: caption', t3, 'final code after resolution, else pass 1 code; 1 segment(s) with a final code');
  const lng = F.table3(A.parseCSV(['segment_id,participant,timestamp,pass,code', 'S01,R01,,1,d1', 'S01,R01,,2,d3', 'S01,R01,,final,d3'].join('\n')));
  has('final long: d3', lng, '| d3 | Reasoning about Design | Why was this code implemented this way? | 1 |');
  // agreement still uses pass 1 and pass 2 only
  has('final: agreement unchanged', A.analyseCodes(rows), 'Agreement: 1/2 (50%)');
}

// 21. need_id typed wrong. The real key (deliverable-3/ten-need-sheet.md section B) has ids N01, N03, N07,
//     N08, N09, N12, N17, N19, N25, N26 on printed rows 1-10; classes below are test values, not the key.
//     Every reader gives the key's class on every printed row, so a correct reading is 10/10 for each.
{
  const ids = L('N01 N03 N07 N08 N09 N12 N17 N19 N25 N26'), cls = L('D D P P P D P P P P');
  const keyNoRow = A.parseCSV(['need_id,class'].concat(ids.map((id, i) => `${id},${cls[i]}`)).join('\n'));
  const keyRow = A.parseCSV(['row,need_id,class'].concat(ids.map((id, i) => `${i + 1},${id},${cls[i]}`)).join('\n'));
  const sheet = (p, idOf) => cls.map((c, i) => `${p},${idOf(i)},${c}`);
  const pad = i => `N${String(i + 1).padStart(2, '0')}`;
  // 21a. R01 typed by printed row as N01-N10, R02 typed 1-10, R03 correct. R01 and R02 are named and left
  //      out (their N01, N03 and N07 rows would otherwise match by chance); only R03 is analysed, 10/10.
  const lines = ['participant,need_id,class'].concat(sheet('R01', pad), sheet('R02', i => String(i + 1)), sheet('R03', i => ids[i]));
  const o = A.analyseNeeds(A.parseCSV(lines.join('\n')), keyNoRow);
  has('need id: R01 named', o, 'R01 rows N02, N04, N05, N06, N10 not in the key');
  has('need id: R02 named', o, 'R02 rows 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 not in the key');
  has('need id: readers', o, 'readers analysed: 1 (pilot excluded; 2 left out for need_ids not in the key)');
  has('need id: R03 10/10', o, '| R03    | 10/10 (100%)');
  hasNot('need id: R01 not in table', o, '| R01 ');
  hasNot('need id: no false departure', o, 'R01:');
  has('need id: no departures', o, 'None: every reader matched the key on every need.');
  // figures.js Table 1 uses the same check: N03 is 1/1 (R03 only), not 2/2 with R01's row 2
  const t1 = require('./figures.js').table1(A.parseCSV(lines.join('\n')), keyNoRow);
  has('need id: table 1 N03', t1, '| N03 | D | 1/1 |');
  // 21b. lower case and unpadded ids are read as the key's ids: 10/10 each, no warning
  const o2 = A.analyseNeeds(A.parseCSV(['participant,need_id,class'].concat(
    sheet('R04', i => ids[i].toLowerCase()), sheet('R05', i => 'N' + parseInt(ids[i].slice(1), 10)), sheet('R06', i => ' n' + parseInt(ids[i].slice(1), 10))).join('\n')), keyNoRow);
  has('need id: lower case', o2, '| R04    | 10/10 (100%)');
  has('need id: unpadded', o2, '| R05    | 10/10 (100%)');
  has('need id: lower unpadded', o2, '| R06    | 10/10 (100%)');
  hasNot('need id: case no warning', o2, 'WARNING');
  eq('need id: norm', A.normNeedId(' n7 '), 'N07');
  // 21c. A key with a row column maps printed row numbers: R02 typed 1-10 is 10/10. R01 typed N01-N10 is
  //      still named, since N02 etc. are ids, not row numbers.
  const o3 = A.analyseNeeds(A.parseCSV(lines.join('\n')), keyRow);
  has('need id: row map', o3, '| R02    | 10/10 (100%)');
  has('need id: row map R01 still named', o3, 'R01 rows N02, N04, N05, N06, N10 not in the key');
  // the templates carry the row column and the warning about printed row numbers
  const tk = fs.readFileSync(path.join(__dirname, 'templates', 'marking-key.csv'), 'utf8');
  eq('need id: key template parses empty', A.parseCSV(tk).length, 0);
  has('need id: key template row column', tk, 'row,need_id,class');
  has('need id: sheet template note', fs.readFileSync(path.join(__dirname, 'templates', 'need-classifications.csv'), 'utf8'), 'not the printed row number');
}

console.log(`${pass} checks passed, ${fail} failed`);
process.exit(fail ? 1 : 0);
