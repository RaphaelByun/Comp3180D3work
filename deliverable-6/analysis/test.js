'use strict';
/*
 * Tests for the solo evaluation tools (analyse.js and figures.js) against hand-computed values.
 * Run: node deliverable-6/analysis/test.js
 * Every expected number below was worked out by hand from the FAKE sample files first (working in comments).
 */
const path = require('path');
const fs = require('fs');
const os = require('os');
const A = require('./analyse.js');
const F = require('./figures.js');

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
const dir = __dirname;
const sample = k => A.readCSV(path.join(dir, A.INPUTS[k]));
const csv = (head, lines) => A.parseCSV([head].concat(lines).join('\r\n') + '\r\n');
const HEAD = {};
for (const f of fs.readdirSync(path.join(dir, 'templates'))) {
  const lines = fs.readFileSync(path.join(dir, 'templates', f), 'utf8').split(/\r?\n/).filter(l => l && !l.startsWith('#'));
  HEAD[f.replace(/\.csv$/, '')] = lines[0];
}

// 1. Cohen's kappa, binary textbook case. 50 items: both yes 20, A yes/B no 5, A no/B yes 10, both no 15.
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
// 2. Three labels over ten needs. key = D D D D P P P N N N; other = D D D P P P N N N D: 7 of 10 agree.
//    pe = .4*.4 + .3*.3 + .3*.3 = .34; kappa = (0.7 - 0.34)/0.66 = 6/11.
{
  const key = L('D D D D P P P N N N'), r = L('D D D P P P N N N D');
  eq('three-label agree', A.agreement(key, r).agree, 7);
  eq('three-label kappa', A.cohenKappa(key, r).kappa, 6 / 11, 1e-12);
}
// 3. Perfect = 1, chance = 0 (AABB vs ABAB), systematic disagreement = -1, no variation = NaN (undefined, not 1).
eq('perfect kappa', A.cohenKappa(L('a b c a'), L('a b c a')).kappa, 1, 1e-12);
eq('chance kappa', A.cohenKappa(L('A A B B'), L('A B A B')).kappa, 0, 1e-12);
eq('negative kappa', A.cohenKappa(L('A A B B'), L('B B A A')).kappa, -1, 1e-12);
eq('undefined kappa is NaN', Number.isNaN(A.cohenKappa(L('A A A A'), L('A A A A')).kappa), true);

// 4. CSV parser (RFC 4180): quotes, commas inside quotes, CRLF, comment lines, BOM, line numbers.
{
  const rows = A.parseCSV('﻿# comment\r\nid,quote\r\nS1,"said ""hi"", twice"\r\nS2,plain\r\n');
  eq('csv rows', rows.length, 2);
  eq('csv quoted', rows[0].quote, 'said "hi", twice');
  eq('csv plain', rows[1].id, 'S2');
  eq('csv line number', rows[1]._line, 4);
  const r = A.parseCSV('id,q\r\nS1,reads the title then says "who did #588\r\nS2,x\r\n');
  eq('stray quote: kept literal', r[0].q, 'reads the title then says "who did #588');
  eq('stray quote: next row intact', r[1].id, 'S2');
  eq('mid quote: kept', A.parseCSV('id,q\nS1,said "is this the art one" twice\n')[0].q, 'said "is this the art one" twice');
  eq('mid quote comma: warning', A.parseCSV('id,q\nS1,said "is this, the art one" twice\n').warnings[0],
    'WARNING: line 2 has 3 cells but the header has 2; the extra cells are ignored. An unquoted comma in a note does this: put the note in double quotes.');
  eq('quoted note: no warning', A.parseCSV('id,q\nS1,"said ""is this, the art one"" twice"\n').warnings.length, 0);
  has('unclosed quote: warning', A.parseCSV('id,q\nS1,"who did it\nS2,x\n').warnings[0], 'the file ends inside a quoted field opened on line 2');
  eq('excel blank rows dropped', A.parseCSV('a,b\n1,2\n,,\n,\n').length, 1);
}

// 5. Templates: one per plan section 3 file (nine) plus the two optional D1 files, header only, columns exact.
{
  const want = {
    'se1-fidelity-handcheck': 'week,version,row,raphael_verdict,ai_scorer1_verdict,ai_scorer2_verdict,ai_rescore_verdict,agree_with_ai,minutes,note',
    'se2-reads': 'read_id,date,week,version,read_order,seen_before,start_time,end_time,minutes_items,minutes_needs,minutes_standup,ease_1to5,useful_1to5,would_send_1to5,rating_why,standup_S,standup_C,standup_U,interruptions,note',
    'se2-item-scores': 'read_id,week,version,read_order,item,level,confidence_1to5,seconds,changed_on_second_read,score,specific,scored_date',
    'se2-need-answers': 'read_id,week,version,read_order,need_id,page_gave_fpn,confidence_1to5,seconds,changed_on_second_read,gitlog_result,error_cause,only_in_b,key_ru_class,record_could_answer,scored_date,note',
    'se2-needs-log': 'segment_id,participant,timestamp,report_condition,quote_note,pass1_code,pass1_date,pass2_code,pass2_date,final_code,resolution_rule',
    'se2-second-scorer': 'read_id,kind,id,score,scorer,scored_date',
    'se3-walkthrough': 'task_id,step_no,correct_action,q1_right_effect,q2_notice_action,q3_associate_action,q4_see_progress,failure_story,severity_0to4,heuristic_link,fix_idea',
    'se4-heuristic-problems': 'id,heuristic,task_location,problem,severity_0to4,screenshot_file,cross_check_yn,se3_link',
    'se4-task-outcomes': 'task,completed,seconds,looked_first,note',
    'd1-problems': 'tool,id,heuristic,severity_0to4,raphael_checked_yn',
    'd1-task-outcomes': 'tool,task,completed',
  };
  eq('templates: count', Object.keys(HEAD).length, 11);
  for (const k of Object.keys(want)) {
    eq(`template ${k}: header`, HEAD[k], want[k]);
    eq(`template ${k}: no data rows`, A.parseCSV(fs.readFileSync(path.join(dir, 'templates', k + '.csv'), 'utf8')).length, 0);
    // every sample file has the template's header
    const s = fs.readFileSync(path.join(dir, 'sample-' + k + '.csv'), 'utf8').split(/\r?\n/).filter(l => l && !l.startsWith('#'))[0];
    eq(`sample ${k}: header`, s, want[k]);
  }
  // the needs log keeps the D5 coding layout, so deliverable-5/recode-sample.js reads it unchanged
  eq('needs log = D5 layout', HEAD['se2-needs-log'], 'segment_id,participant,timestamp,report_condition,quote_note,pass1_code,pass1_date,pass2_code,pass2_date,final_code,resolution_rule');
}

// 6. Table A on the FAKE sample.
//    W1 B: rows 1, 2, 3, 19 all hand-checked: S S C S -> S 3, C 1, U 0; a C, so the A2 rule is not met.
//      Scorer 1 S S S C against S S C S: rows 1, 2 agree -> 2 of 4. Scorer 2 S S C C: rows 1, 2, 3 -> 3 of 4.
//      Re-score row 19 S = S -> 1 of 1. Minutes 1 + 1 + 2 + 2 = 6.
//    W2 A: row 2 has no hand verdict -> listed 2, checked 1 (S); 1 of 1 is 100% S and no C -> met; scorer 1 1 of 1.
//    W2 B: S and U -> no C, but 1 of 2 S is under 90% -> not met; scorer 1 S S against S U -> 1 of 2.
{
  const t = A.tableA(sample('se1'));
  const md = A.render(t);
  has('A: W1 B', md, '| W1-2021-02-08 | B       | 4           | 4            | 3 | 1 | 0 | not met               | 2 of 4         | 3 of 4         | 1 of 1         | 6       |');
  has('A: W2 A', md, '| W2-2021-07-19 | A       | 2           | 1            | 1 | 0 | 0 | met                   | 1 of 1         | –              | –              | 1       |');
  has('A: W2 B', md, '| W2-2021-07-19 | B       | 2           | 2            | 1 | 0 | 1 | not met               | 1 of 2         | –              | –              | 2       |');
  eq('A: three groups', t.groups.length, 3);
  eq('A: no warnings', t.warnings.length, 0);
  // the 90% line: 9 S of 10 is met, 8 S and 2 U of 10 is not
  const rows = n => Array.from({ length: 10 }, (_, i) => `W1-2021-02-08,B,${i + 1},${i < n ? 'S' : 'U'},,,,,,`);
  eq('A: 9 of 10 met', A.tableA(csv(HEAD['se1-fidelity-handcheck'], rows(9))).groups[0].rule, 'met');
  eq('A: 8 of 10 not met', A.tableA(csv(HEAD['se1-fidelity-handcheck'], rows(8))).groups[0].rule, 'not met');
  // checks: an unknown week, a duplicate row, a verdict typo, and agree_with_ai typed against the verdicts
  const bad = A.tableA(csv(HEAD['se1-fidelity-handcheck'], [
    'W3-2021-01-01,B,1,S,,,,,,', 'W1-2021-02-08,B,5,S,S,,,y,,', 'W1-2021-02-08,B,5,S,S,,,y,,',
    'w1-2021-02-08,b,6,x,S,,,,,', 'W1-2021-02-08,B,7,S,C,,,y,,']));
  const bw = bad.warnings.join('\n');
  has('A: bad week', bw, 'week "W3-2021-01-01" is not');
  has('A: duplicate', bw, 'SE1 row listed more than once, left out until fixed: W1-2021-02-08 B 5.');
  has('A: verdict typo', bw, 'raphael_verdict "x" is not S, C or U. Read as blank.');
  has('A: agree typed wrong', bw, 'W1-2021-02-08 B row 7 (typed y, verdicts give n)');
  eq('A: lower-case week and version read', bad.groups[0].listed, 2);
}

// 7. Table B on the FAKE sample. Key (R/U) N01 D, N03 P, N07 N, N08 N, N09 P, N12 D, N17 N, N19 D, N25 P, N26 N.
//    RX-A1 results C PC C C W C C C PC NA -> C 6 of 10, PC 2, W 1 (overclaim, N09), NA 1.
//    RX-B2 rows N01 C, N09 C, N12 C (only_in_b y) -> 3 of 3, needed B 1.
//    RY-B1 results C C C W PC C C PC PC C -> C 6 of 10, PC 3, W 1 (misread, N08); only_in_b y on N03 and N12 -> 2.
//    RY-A2 rows N12 C, N03 PC -> 1 of 2.
{
  const t = A.tableB(sample('needs'));
  const md = A.render(t);
  has('B: N01 row', md, '| N01  | D         | C     | C     | D                   | C     | –     | D                   |');
  has('B: N09 row', md, '| N09  | P         | W     | C     | P                   | PC    | –     | P                   |');
  has('B: N26 row', md, '| N26  | N         | NA    | –     | N                   | C     | –     | N                   |');
  has('B: RX-A1 sums', md, '| RX-A1 | 6 of 10     | 2  | 1 | 1  | 0          | 0                    | 0          | 1            | 0             | 0           |');
  has('B: RX-B2 sums', md, '| RX-B2 | 3 of 3      | 0  | 0 | 0  | 0          | 1                    | 0          | 0            | 0             | 0           |');
  has('B: RY-B1 sums', md, '| RY-B1 | 6 of 10     | 3  | 1 | 0  | 0          | 2                    | 1          | 0            | 0             | 0           |');
  has('B: RY-A2 sums', md, '| RY-A2 | 1 of 2      | 1  | 0 | 0  | 0          | 0                    | 0          | 0            | 0             | 0           |');
  has('B: first reads only', md, 'Compare RX-A1 with RY-B1 only');
  eq('B: no warnings', t.warnings.length, 0);
}

// 8. Observed class rule (plan section 6, Table C), every combination of page gave and git-log result.
{
  const want = { 'F|C': 'D', 'F|PC': 'P', 'F|W': 'N', 'F|NA': 'N', 'P|C': 'P', 'P|PC': 'P', 'P|W': 'N', 'P|NA': 'N',
    'N|C': 'N', 'N|PC': 'N', 'N|W': 'N', 'N|NA': 'N', '|C': '', 'F|': '' };
  for (const k of Object.keys(want)) { const [p, r] = k.split('|'); eq(`observed ${k}`, A.observedClass(p, r), want[k]); }
}

// 9. Table C on the FAKE sample (first reads only).
//    RX observed: N01 D (F/C), N03 P (P/PC), N07 N, N08 N, N09 N (F/W), N12 P (P/C), N17 N, N19 D, N25 P, N26 N (N/NA).
//    Key D P N N P D N D P N; differs on N09 and N12 -> 8 of 10. Key shares D .3 P .3 N .4; observed D .2 P .3 N .5;
//    pe = .06 + .09 + .20 = .35; kappa = (.8 - .35)/.65 = 0.6923 -> 0.69. The log column equals the key -> 10 of 10, kappa 1.
//    RY observed: N01 D, N03 D (F/C), N07 N, N08 N (P/W), N09 P, N12 D, N17 N, N19 P (F/PC), N25 P, N26 N.
//    Differs on N03 and N19 -> 8 of 10; observed D .3 P .3 N .4 -> pe = .09 + .09 + .16 = .34; kappa = .46/.66 = 0.6970 -> 0.70.
//    Over-claim (page F, answer W): RX-A1 N09 only (RY-B1 N08 was page P).
{
  const t = A.tableC(sample('needs'));
  const md = A.render(t);
  has('C: N09 row', md, '| N09  | P         | P      | N (F/W)     | P      | P (P/PC)    |');
  has('C: N03 row', md, '| N03  | P         | P      | P (P/PC)    | P      | D (F/C)     |');
  has('C: RX agreement', md, '| RX (RX-A1) | 8 of 10 (kappa 0.69) | 10 of 10 (kappa 1.00) | 8 of 10 (kappa 0.69)                                       |');
  has('C: RY agreement', md, '| RY (RY-B1) | 8 of 10 (kappa 0.70) | 10 of 10 (kappa 1.00) | 8 of 10 (kappa 0.70)                                       |');
  eq('C: RX kappa exact', t.pairs.RX.keyObs.k.kappa, 0.45 / 0.65, 1e-12);
  eq('C: RY kappa exact', t.pairs.RY.keyObs.k.kappa, 0.46 / 0.66, 1e-12);
  has('C: over-claims', md, 'Over-claims (page gave F, answer W): RX-A1 N09.');
  hasNot('C: second reads not used', md, 'RX-B2');
  // an unscored need is left out of agreement, so the denominator drops to 9
  const lines = fs.readFileSync(path.join(dir, A.INPUTS.needs), 'utf8').split(/\r?\n/).filter(l => l && !l.startsWith('#'));
  const unscored = A.tableC(A.parseCSV(lines.map(l => (l.startsWith('RX-A1,RX,A,1,N12,') ? l.replace(',C,,n,D,D,', ',,,n,D,D,') : l)).join('\n')));
  eq('C: unscored left out', unscored.pairs.RX.keyObs.ag.n, 9);
  eq('C: unscored agreement', unscored.pairs.RX.keyObs.ag.agree, 8);
}

// 10. Need-answer checks (RX-A1 keeps N01 C, N03 PC, N08 W, N09 C: 2 of 4 correct, 1 PC, 1 W with no cause): read_id typed by hand, week and version that do not match, unknown need,
//     duplicate, W with no cause, a cause on a non-W answer, a key that differs between rows, a record class
//     that differs between the two reads of a week, a change code on a first read.
{
  const H = HEAD['se2-need-answers'];
  const t = A.tableB(csv(H, [
    'rx a1,RX,A,1,n1,F,4,30,,C,,n,D,D,,',
    'RX-A1,RY,B,1,N03,P,3,30,,PC,,n,P,P,,',
    'RX-A1,RX,A,1,N99,P,3,30,,PC,,n,P,P,,',
    'RX-A1,RX,A,1,N07,N,3,30,,C,,n,N,N,,', 'RX-A1,RX,A,1,N07,N,3,30,,C,,n,N,N,,',
    'RX-A1,RX,A,1,N08,F,3,30,,W,,n,N,N,,',
    'RX-A1,RX,A,1,N09,F,3,30,,C,misread,n,P,P,,',
    'RX-B2,RX,B,2,N01,F,4,30,same,C,,n,P,P,,',
    'RY-B1,RY,B,1,N12,F,4,30,new,C,,n,D,D,,',
    'RQ-A1,RX,A,1,N12,F,4,30,,C,,n,D,D,,']));
  const w = t.warnings.join('\n');
  eq('need: rx a1 and n1 read', t.prepared.rows.some(v => v.read === 'RX-A1' && v.need === 'N01'), true);
  has('need: week/version mismatch', w, 'week "RY", version "B" does not match read_id RX-A1');
  has('need: unknown need', w, 'need_id "N99" is not one of the ten');
  has('need: duplicate', w, 'need answer listed more than once for one read, left out until fixed: RX-A1 N07.');
  has('need: W with no cause', w, 'RX-A1 N08: scored W with no error_cause.');
  has('need: cause on non-W', w, 'RX-A1 N09: error_cause "misread" on an answer not scored W.');
  has('need: key differs', w, 'N01: key_ru_class differs between rows (D, P)');
  has('need: record differs', w, 'N01 week RX: record_could_answer differs between the two reads (D, P)');
  has('need: change on first read', w, 'RY-B1 N12: changed_on_second_read is filled on a first read.');
  has('need: bad read_id', w, 'read_id "RQ-A1" is not RX-A1, RX-B2, RY-B1 or RY-A2. Row left out.');
  has('need: W no cause counted', A.render(t), '| RX-A1 | 2 of 4      | 1  | 1 | 0  | 0          | 0                    | 0          | 0            | 0             | 1           |');
  eq('normReadId: RXA1', A.normReadId('RXA1'), 'RX-A1');
  eq('normReadId: ry_b1', A.normReadId(' ry_b1 '), 'RY-B1');
  eq('normNeedId: n01', A.normNeedId('n01'), 'N01');
}

// 11. Table D on the FAKE sample.
//     RX-A1 items 2 2 1 0 1 -> 6 of 10; item 6 Hedged; specific on items 4-5: n n -> 0 of 2.
//     RX-B2 rows for items 4 (2) and 5 (1) only -> 2 of 5 scored; specific y y -> 2 of 2.
//     RY-B1 items 2 1 2 2 1 -> 8 of 10; item 6 Over-claim; specific y n -> 1 of 2.
//     RY-A2 item 4 (1) only -> 1 of 5 scored; specific n -> 0 of 1.
{
  const md = A.render(A.tableD(sample('items')));
  has('D: item 4', md, '| 4    | L2           | 0       | 2             | 2          | 1             |');
  has('D: item 6', md, '| 6    | U            | Hedged  | –             | Over-claim | –             |');
  has('D: totals', md, '| 1-5  | total        | 6 of 10 | 2 of 5 scored | 8 of 10    | 1 of 5 scored |');
  has('D: specific', md, '| 4-5  | specific (y) | 0 of 2  | 2 of 2        | 1 of 2     | 0 of 1        |');
  const bad = A.tableD(csv(HEAD['se2-item-scores'], ['RX-A1,RX,A,1,1,L1,,,,3,,', 'RX-A1,RX,A,1,6,U,,,,2,,', 'RX-A1,RX,A,1,Q1,L1,,,,1,,', 'RX-A1,RX,A,1,2,L4,,,,1,,']));
  const w = bad.warnings.join('\n');
  has('D: score 3', w, 'RX-A1 item 1: score "3" is not 0, 1 or 2.');
  has('D: numeric item 6', w, 'RX-A1 item 6: "2" is not Pass, Hedged or Over-claim.');
  has('D: item Q1', w, 'item "Q1" is not 1 to 6. Row left out.');
  has('D: level', w, 'level "L4" is not L1, L2, L3 or U.');
}

// 12. Reads, Table H and the figure data on the FAKE sample.
//     Minutes: RX-A1 12 + 15 + 3 = 30; RX-B2 4 + 6 = 10; RY-B1 has no minute columns, so 10:00 to 10:28 = 28;
//     RY-A2 3 + 5 = 8.
//     Confidence by result over all 25 need answers (10 + 3 + 10 + 2):
//       C  at 2: RX-A1 N08 = 1; at 3: RX-A1 N07, N12, RY-B1 N07, N17, RX-B2 N09, RY-A2 N12 = 6;
//          at 4: RX-A1 N01, N17, RY-B1 N03, N26, RX-B2 N01 = 5; at 5: RX-A1 N19, RY-B1 N01, N12, RX-B2 N12 = 4.
//       PC at 2: RX-A1 N25, RY-B1 N25 = 2; at 3: RX-A1 N03, RY-B1 N09, N19, RY-A2 N03 = 4.
//       W  at 4: RY-B1 N08; at 5: RX-A1 N09 -> two wrong at confidence 4 or 5.  NA at 1: RX-A1 N26.
{
  const T = A.timeConfidence(sample('reads'), sample('needs'));
  eq('time: minutes', T.reads.map(r => r.minutes).join(','), '30,10,28,8');
  eq('time: C row', T.grid.C.join(','), '0,1,6,5,4');
  eq('time: PC row', T.grid.PC.join(','), '0,2,4,0,0');
  eq('time: W row', T.grid.W.join(','), '0,0,0,1,1');
  eq('time: NA row', T.grid.NA.join(','), '1,0,0,0,0');
  eq('time: n', T.n, 25);
  eq('time: high-confidence wrong', T.highWrong, 2);
  const md = A.render(A.tableH(sample('reads')));
  has('H: RX-A1', md, '| RX-A1 | 2000-01-01 | n           | 30      | 3    | 3      | 2          | FAKE                | 4          | 0          | 1          |');
  has('H: quoted why', md, '| RY-A2 | 2000-01-02 | unsure      | 8       | 2    | 2      | 1          | FAKE, a quoted note |');
  // an end time past midnight, a rating of 6, a stand-up on a second read
  const H = HEAD['se2-reads'];
  const P = A.prepareReads(csv(H, ['RX-A1,,RX,A,1,n,23:50,00:20,,,,6,3,3,,,,,,', 'RX-B2,,RX,B,2,maybe,,,,,,,,,,1,,,,']));
  eq('reads: past midnight', P.rows[0].minutes, 30);
  const w = P.warnings.join('\n');
  has('reads: rating 6', w, 'RX-A1: ease_1to5 "6" is not 1 to 5.');
  has('reads: seen_before', w, 'RX-B2: seen_before "maybe" is not y, n or unsure.');
  has('reads: stand-up on second read', w, 'RX-B2: stand-up columns are filled on a second read.');
}

// 13. Table E on the FAKE sample.
//     CW1: 3 steps; step 1 N on Q2 (sev 3), step 2 N on Q3 and Q4 (sev 2) -> 2 failing, sev 2 = 1, sev 3 = 1.
//     CW2: 1 step, none failing. CW3, CW4: no rows. CW5: 1 step, N on Q3, sev 2.
//     All: 5 steps; Q2 1, Q3 2, Q4 1; 3 failing; sev 2 = 2, sev 3 = 1.
{
  const t = A.tableE(sample('walk'));
  const md = A.render(t);
  has('E: CW1', md, '| CW1  | 3     | 0    | 1    | 1    | 1    | 2             | 0     | 0     | 1     | 1     | 0     |');
  has('E: CW3 empty', md, '| CW3  | 0     | 0    | 0    | 0    | 0    | 0             | 0     | 0     | 0     | 0     | 0     |');
  has('E: all', md, '| All  | 5     | 0    | 1    | 2    | 1    | 3             | 0     | 0     | 2     | 1     | 0     |');
  eq('E: no warnings', t.warnings.length, 0);
  const bad = A.tableE(csv(HEAD['se3-walkthrough'], ['CW1,1,x,Y,N,Y,Y,,,,', 'CW6,1,x,Y,Y,Y,Y,,,,', 'CW1,1,x,Y,Y,Y,Y,,,,', 'CW2,1,x,Y,maybe,Y,Y,,,,']));
  const w = bad.warnings.join('\n');
  has('E: N with no story', w, 'SE3 CW1 step 1: an N answer with no failure story.');
  has('E: N with no severity', w, 'SE3 CW1 step 1: an N answer with no severity 0 to 4.');
  has('E: CW6', w, 'task_id "CW6" is not CW1 to CW5.');
  has('E: duplicate step', w, 'SE3 CW1 step 1: listed more than once.');
  has('E: not Y or N', w, 'q2_notice_action "maybe" is not Y or N.');
}

// 14. Table F on the FAKE sample. ChangeLens CL-01 H6 sev 3, CL-02 H9 sev 2, CL-03 H4 sev 1, CL-04 H6 sev 2:
//     sev 1 1, sev 2 2, sev 3 1, total 4; H6 2. FAKE D1: FakeToolA FA-01 H1 sev 3 checked, FA-02 H1 sev 2;
//     FakeToolB FB-01 H5 sev 4 -> FakeToolA total "2 (1 checked)". Tasks: ChangeLens T1 Y in 40 s; FakeToolA T1 partly.
{
  const t = A.tableF(sample('heur'), sample('tasks'), sample('d1'), sample('d1tasks'));
  const md = A.render(t);
  has('F: severity 2', md, '| Severity 2 | 2          | 1 (0 checked) | 0 (0 checked) |');
  has('F: total', md, '| Total      | 4          | 2 (1 checked) | 1 (0 checked) |');
  has('F: H6', md, '| H6        | 2          | 0 (0 checked) | 0 (0 checked) |');
  has('F: T1', md, '| T1   | Y (40 s)       | partly    | N         |');
  has('F: T3', md, '| T3   | partly (300 s) | –         | –         |');
  has('F: AI evaluator note', md, 'D1\'s pass was run by an AI evaluator.');
  // without D1 files: ChangeLens alone
  const solo = A.render(A.tableF(sample('heur'), null, null, null));
  has('F: ChangeLens only', solo, '| Total      | 4          |');
  const bad = A.tableF(csv(HEAD['se4-heuristic-problems'], ['CL-01,H11,,,5,,,', 'CL-01,H1,,,2,,,']), csv(HEAD['se4-task-outcomes'], ['T8,Y,,,', 'T1,done,,,']), null, null);
  const w = bad.warnings.join('\n');
  has('F: H11', w, 'heuristic "H11" is not H1 to H10.');
  has('F: severity 5', w, 'severity "5" is not 0 to 4.');
  has('F: duplicate id', w, 'SE4 ChangeLens CL-01: id listed more than once.');
  has('F: T8', w, 'task "T8" is not T1 to T7.');
  has('F: completed typo', w, 'completed "done" is not Y, partly or N');
}

// 15. Table G on the FAKE sample (D5 layout, participant SELF, one comma-quoted note).
//     Code = final_code, else pass 1: L01 a2, L02 d3, L03 d3 (final), L04 a2, L05 d3, L06 a1, L07 none.
//     d3 3 (RX-A1 2, RY-B1 1), a2 2 (RX-A1 1, RX-B2 1), a1 1, none 1; 7 entries, 1 with a final code.
//     Re-coded: L01 a2/a2, L03 d4/d3, L06 a1/a1 -> 2 of 3; differ L03.
{
  const t = A.tableG(sample('log'));
  const md = A.render(t);
  has('G: d3', md, '| d3   | Reasoning about Design                              | Why was this code implemented this way? | 2     | 0     | 1     | 0     | 3     |');
  has('G: a2', md, '| a2   | Maintaining Awareness                               | What have my coworkers been doing?      | 1     | 1     | 0     | 0     | 2     |');
  has('G: title counts', md, '1 with a final code; 7 entries');
  has('G: agreement', md, 'Entries with pass 1: 7. Re-coded blind in pass 2: 3. Pass 1 against pass 2: 2 of 3 in agreement.');
  has('G: differ', md, 'Entries where the passes differ: L03 (d4 / d3).');
  hasNot('G: no kappa figure', md, 'kappa 0');
  eq('G: no warnings', t.warnings.length, 0);
  const H = HEAD['se2-needs-log'];
  const bad = A.tableG(csv(H, ['S1,R01,,RX-A1,x,a2,,dl,,,', 'S2,SELF,,RX-C1,x,d1,,,,,', 'S3,SELF,,RX-A1,x,d1,,,,,', 'S3,SELF,,RX-A1,x,d3,,,,,']));
  const w = bad.warnings.join('\n');
  has('G: not SELF', w, 'needs-log participant is not SELF: R01.');
  has('G: bad condition', w, 'report_condition is not a read_id (RX-A1, RX-B2, RY-B1, RY-A2): S2 ("RX-C1")');
  has('G: code typo', w, 'S1 pass 2 "dl"');
  has('G: duplicate segment', w, 'needs-log segment_id used on more than one row, left out until fixed: S3.');
  has('G: typo pair left out', A.render(bad), '(1 pair(s) left out for a code not in the codebook)');
}

// 16. Scoring check on the FAKE sample.
//     Needs: RX-A1 N01 C=C, N09 W=W, N03 PC vs C (differ), RY-B1 N19 PC=PC -> 3 of 4.
//     Items: RX-A1 item 1 2=2, item 6 Hedged = "hedged", RY-B1 item 6 Over-claim vs Pass (differ) -> 2 of 3.
{
  const t = A.scoringCheck(sample('needs'), sample('items'), sample('scorer2'));
  eq('S: needs', `${t.result.need.agree}/${t.result.need.n}`, '3/4');
  eq('S: items', `${t.result.item.agree}/${t.result.item.n}`, '2/3');
  const md = A.render(t);
  has('S: differ need', md, '| RX-A1 | need | N03 | PC         | C             |');
  has('S: differ item', md, '| RY-B1 | item | 6   | Over-claim | Pass          |');
  has('S: scorer named', md, 'Scorer: FAKE-model.');
  const bad = A.scoringCheck(sample('needs'), null, csv(HEAD['se2-second-scorer'], ['RX-B2,need,N26,C,m,', 'RX-A1,thing,1,C,m,']));
  const w = bad.warnings.join('\n');
  has('S: no match', w, 'no scored answer of Raphael\'s to compare, left out: RX-B2 need N26.');
  has('S: bad kind', w, 'kind "thing" is not need or item.');
}

// 17. Whole run on the FAKE samples: every table, the FAKE banner, the solo footer, and no reader-study leftovers.
{
  const f = A.inputFiles({}, dir);
  eq('main: fake', A.isFake(f), true);
  const ts = A.buildAll(f);
  eq('main: tables in order', ts.map(t => t.id).join(''), 'ABCDTEFGHS');
  const all = ts.map(t => A.render(t)).join('\n');
  for (const word of ['paired difference', 'floor', 'counterbalanc', 'R01', 'pilot', 'participants']) hasNot(`main: no "${word}"`, all.toLowerCase(), word.toLowerCase());
  has('main: footer', A.FOOTER, 'One reader, the developer.');
  hasNot('main: no p-values', all, 'p =');
  // only some inputs given: only their tables
  const some = A.buildAll(A.inputFiles({ walk: path.join(dir, A.INPUTS.walk) }, dir));
  eq('main: one input, one table', some.map(t => t.id).join(''), 'E');
  eq('main: real file not fake', A.isFake({ walk: path.join(dir, 'se3-walkthrough.csv') }), false);
}

// 18. figures.js on the FAKE samples: one bar per read (first reads filled, second hollow), one dot per non-empty
//     confidence cell (C 4 + PC 2 + W 2 + NA 1 = 9), the high-confidence wrong boxes, the FAKE stamp, the number.
{
  const f = A.inputFiles({}, dir);
  const r = F.build(f);
  eq('fig: fake flag', r.fake, true);
  has('fig: svg fake stamp', r.svg, 'FAKE DATA');
  has('fig: tables fake stamp', r.md, '**FAKE DATA');
  eq('fig: four bars', (r.svg.match(/class="bar"/g) || []).length, 4);
  eq('fig: two filled bars', (r.svg.match(/class="bar"[^>]*fill="#1F3A5F"/g) || []).length, 2);
  eq('fig: nine dots', (r.svg.match(/class="dot"/g) || []).length, 9);
  eq('fig: two high-wrong boxes', (r.svg.match(/class="highwrong"/g) || []).length, 2);
  has('fig: RY-B1 bar', r.svg, '<title>RY-B1 28 minutes</title>');
  has('fig: C at 3', r.svg, '<title>C at confidence 3: 6</title>');
  has('fig: n', r.svg, '(n = 25)');
  has('fig: default number', r.svg, '<title id="t">Figure 1: time and confidence, one reader</title>');
  has('fig: tables B C F G', r.md, 'Table B. Ten needs by read');
  has('fig: table C', r.md, 'Table C. Key against observed');
  has('fig: table F', r.md, 'Table F. Heuristic problems by severity');
  has('fig: table G', r.md, 'Table G. What the page left unmet');
  has('fig: md table form', r.md, '| N01 | D | C | C | D | C | – | D |');
  hasNot('fig: no table A in report subset', r.md, 'Table A.');
  const r5 = F.build(f, { number: 5 });
  has('fig: number 5 title', r5.svg, '<title id="t">Figure 5: time and confidence, one reader</title>');
  has('fig: number 5 heading', r5.md, '# ChangeLens solo evaluation: Figure 5 and Tables B, C, F and G');
  hasNot('fig: number 5 no Figure 1', r5.svg + r5.md, 'Figure 1');
  // a read with no time is labelled, not drawn
  const tmp = path.join(os.tmpdir(), `cl-reads-${process.pid}.csv`);
  fs.writeFileSync(tmp, HEAD['se2-reads'] + '\r\nRX-A1,,RX,A,1,n,,,,,,,,,,,,,,\r\n');
  const real = F.build({ reads: tmp });
  fs.unlinkSync(tmp);
  eq('fig: real not fake', real.fake, false);
  hasNot('fig: real not stamped', real.svg, 'FAKE');
  eq('fig: no time, no bar', (real.svg.match(/class="bar"/g) || []).length, 0);
  has('fig: no time label', real.svg, 'no time recorded');
}

// 19. PNG copy of the figure for the Word builder (build-docx-v2.js embeds .png/.jpg only).
//     pngSize reads the IHDR chunk; findChrome honours CHROME_PATH; svgToPng runs when a browser is installed.
{
  const hdr = Buffer.alloc(24);
  Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]).copy(hdr, 0);
  hdr.writeUInt32BE(1280, 16); hdr.writeUInt32BE(496, 20);
  eq('png: size width', F.pngSize(hdr).width, 1280);
  eq('png: size height', F.pngSize(hdr).height, 496);
  eq('png: not a png', F.pngSize(Buffer.from('<svg xmlns="http://www.w3.org/2000/svg"/>')), null);
  eq('png: CHROME_PATH wins', F.findChrome({ CHROME_PATH: __filename }), __filename);
  eq('png: nothing found', F.findChrome({ CHROME_PATH: path.join(__dirname, 'no-such-browser.exe') }) === path.join(__dirname, 'no-such-browser.exe'), false);
  const chrome = F.findChrome();
  if (!chrome) console.log('SKIP png render: no Chrome or Edge found (set CHROME_PATH to run it)');
  else {
    const tmpd = fs.mkdtempSync(path.join(os.tmpdir(), 'cl-png-'));
    const svg = F.build(A.inputFiles({}, dir)).svg;
    const h = Number(/<svg[^>]*\sheight="(\d+)"/.exec(svg)[1]);
    fs.writeFileSync(path.join(tmpd, 'f.svg'), svg);
    const s = F.svgToPng(path.join(tmpd, 'f.svg'), path.join(tmpd, 'f.png'), chrome);
    const back = F.pngSize(fs.readFileSync(path.join(tmpd, 'f.png')));
    eq('png render: width is twice the SVG', back.width, 1280);
    eq('png render: height is twice the SVG', back.height, 2 * h);
    eq('png render: return value', s.width, back.width);
    fs.rmSync(tmpd, { recursive: true, force: true });
  }
}

console.log(`${pass} checks passed, ${fail} failed`);
process.exit(fail ? 1 : 0);
