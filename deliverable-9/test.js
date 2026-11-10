#!/usr/bin/env node
'use strict';
// Tests for variance-table.js. Run: node deliverable-9/test.js
const assert = require('assert');
const { build } = require('./variance-table');

const head = 'deliverable,name,a2_hours,a2_in_prac,actual_hours,actual_in_prac,variance_why';
const total = s => s.trim().split('\n').find(l => l.startsWith('| | **Total**'));

// Nothing logged: no empty bold markers in the Total row.
const none = build([head, '7,A,10,2,,,', '8,B,4,1,,,'].join('\n'));
assert.ok(!total(none).includes('****'), total(none));
assert.strictEqual(total(none), '| | **Total** | **14** | **3** |  |  | **incomplete** | |');

// All logged: totals and variance are bold.
const all = build([head, '7,A,10,2,12,3,', '8,B,4,1,4,1,'].join('\n'));
assert.strictEqual(total(all), '| | **Total** | **14** | **3** | **16** | **4** | **+2** | |');
assert.ok(!all.includes('†'), 'no plan-change notes when no changed row is present');

// Rows 3, 5 and 6 changed method: dagger in the name, a note under the table that only points to the
// report's Evaluation Method, the Why cell left empty, and the totals unchanged.
const solo = build([head, '3,Evaluation protocol and instruments,4,1,,,', '5,Sessions run and coded,18,4,,,', '6,Evaluation report,6,1,,,'].join('\n'));
const lines = solo.trim().split('\n');
assert.ok(lines.includes('| 5 | Sessions run and coded † | 18 | 4 |  |  | not logged yet |  |'), solo);
assert.ok(lines.includes('| | **Total** | **28** | **6** |  |  | **incomplete** | |'), solo);
for (const d of ['D3', 'D5', 'D6']) assert.ok(lines.some(l => l.startsWith(`- ${d} (`)), `${d} note missing`);
for (const d of ['D3', 'D5', 'D6']) assert.ok(lines.find(l => l.startsWith(`- ${d} (`)).endsWith('See Evaluation Method.'), `${d} note must point to Evaluation Method`);
assert.ok(lines.includes('- D5 (Sessions run and coded): A2 planned 18 h: nine 45-minute sessions incl. pilot (7 h), recruiting and briefing 4 h, coding 7 h. See Evaluation Method.'), solo);
for (const bad of ['17 Oct', 'self-evaluation-plan', 'SE1', 'solo', 'best way for me', 'participant', 'reader']) assert.ok(!solo.includes(bad), `evaluation notes must not describe the method or give a reason: ${bad}`);
// Row 1 changed method too: a factual dagger note with commit refs and no reason.
const d1 = build([head, '1,Production-tool UX study and design spec,10,2,,,'].join('\n'));
const d1note = d1.trim().split('\n').find(l => l.startsWith('- D1 ('));
assert.ok(d1.includes('| 1 | Production-tool UX study and design spec † |'), d1);
assert.ok(d1note && d1note.includes('six coded published producer sources') && d1note.includes('run by AI') && d1note.includes('e078ebd'), d1);
for (const bad of ['because', 'time', 'ethics', 'Evaluation Method']) assert.ok(!d1note.includes(bad), `D1 note must give no reason: ${bad}`);
// Float sums are rounded to one decimal in the Total row.
const fl = build([head, '7,A,0.1,0.1,0.1,0.1,', '8,B,0.2,0.2,0.2,0.2,', '9,C,0.4,0,0.7,0,'].join('\n'));
assert.strictEqual(total(fl), '| | **Total** | **0.7** | **0.3** | **1** | **0.3** | **+0.3** | |');
// A logged why is passed through unchanged; the script never writes one.
const why = build([head, '5,Sessions run and coded,18,4,6,0,my own reason'].join('\n'));
assert.ok(why.includes('| 6 | 0 | -12 (explain) | my own reason |'), why);

console.log('variance-table tests passed');
