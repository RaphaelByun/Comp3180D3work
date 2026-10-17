#!/usr/bin/env node
'use strict';
// Tests for variance-table.js. Run: node deliverable-9/test.js
const assert = require('assert');
const { build } = require('./variance-table');

const head = 'deliverable,name,a2_hours,a2_in_prac,actual_hours,actual_in_prac,variance_why';
const total = s => s.trim().split('\n').pop();

// Nothing logged: no empty bold markers in the Total row.
const none = build([head, '1,A,10,2,,,', '2,B,4,1,,,'].join('\n'));
assert.ok(!total(none).includes('****'), total(none));
assert.strictEqual(total(none), '| | **Total** | **14** | **3** |  |  | **incomplete** | |');

// All logged: totals and variance are bold.
const all = build([head, '1,A,10,2,12,3,', '2,B,4,1,4,1,'].join('\n'));
assert.strictEqual(total(all), '| | **Total** | **14** | **3** | **16** | **4** | **+2** | |');
assert.ok(!all.includes('†'), 'no plan-change notes when no changed row is present');

// Rows 3, 5 and 6 changed method on 17 Oct 2026: dagger in the name, a sourced note under the table,
// the Why cell left empty, and the totals unchanged.
const solo = build([head, '3,Evaluation protocol and instruments,4,1,,,', '5,Sessions run and coded,18,4,,,', '6,Evaluation report,6,1,,,'].join('\n'));
const lines = solo.trim().split('\n');
assert.ok(lines.includes('| 5 | Sessions run and coded † | 18 | 4 |  |  | not logged yet |  |'), solo);
assert.ok(lines.includes('| | **Total** | **28** | **6** |  |  | **incomplete** | |'), solo);
for (const d of ['D3', 'D5', 'D6']) assert.ok(lines.some(l => l.startsWith(`- ${d} (`)), `${d} note missing`);
assert.ok(solo.includes('17 Oct 2026') && solo.includes('self-evaluation-plan.md'), 'notes must cite the dated decision and the plan');
assert.ok(solo.includes('"the best way for me to explain it myself to others if they are using it, and I am able to learn it as well."'), 'his words quoted exactly');
// A logged why is passed through unchanged; the script never writes one.
const why = build([head, '5,Sessions run and coded,18,4,6,0,my own reason'].join('\n'));
assert.ok(why.includes('| 6 | 0 | -12 (explain) | my own reason |'), why);

console.log('variance-table tests passed');
