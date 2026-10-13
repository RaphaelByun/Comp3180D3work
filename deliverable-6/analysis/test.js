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
  has('coding differences', co, '| S06     | a3     | d1     |');
  hasNot('coding ignores single-pass segments', co, '| S09     |');
}

// 8b. Validation. A score of 3 on an item 1-5 row is flagged; a numeric item 6 is flagged;
//     item 6 words are accepted in any case/spelling; a file with no specific or records columns still works.
{
  const csv = ['participant,role,condition,week,order,item,score',
    'X1,proxy,A,W1,1,1,3', 'X1,proxy,A,W1,1,2,2', 'X1,proxy,A,W1,1,6,1', 'X1,proxy,B,W2,2,6,over claim', 'X1,proxy,B,W2,2,1,2'].join('\n');
  const v = A.analyseScores(A.parseCSV(csv));
  has('flags score 3', v, 'WARNING: 1 row(s) for items 1-5 with a score that is not 0, 1 or 2.');
  has('flags numeric item 6', v, 'WARNING: 1 row(s) for item 6 not coded Pass, Hedged or Over-claim.');
  has('item 6 spelling', v, '| Over-claim | 0/1      | 1/1       |');
  hasNot('no specificity section without column', v, 'Specificity tick');
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

console.log(`${pass} checks passed, ${fail} failed`);
process.exit(fail ? 1 : 0);
